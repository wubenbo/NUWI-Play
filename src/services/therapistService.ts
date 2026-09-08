import { db, auth } from '../lib/firebase';
import { collection, query, where, getDocs, getDoc, doc, setDoc, addDoc, updateDoc } from 'firebase/firestore';

export interface Patient {
  id: string;
  therapistId: string;
  name: string;
  age: number;
  primaryDiagnosis: string;
  progress?: number;
  clinicalNotes?: string;
  alias?: string;
  accessCode?: string;
  linkedUid?: string;
  stars?: number;
  batteryLevel?: number;
}

export interface Assignment {
  id: string;
  patientId: string;
  therapistId: string;
  activityId: string;
  status: 'pending' | 'completed';
  dueDate: number;
  createdAt?: number;
  updatedAt?: number;
}

export async function getPatients() {
  if (!auth.currentUser) return [];
  const q = query(collection(db, 'patients'), where('therapistId', '==', auth.currentUser.uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Patient));
}

export async function addPatient(data: Omit<Patient, 'id' | 'therapistId' | 'alias' | 'accessCode'>) {
  if (!auth.currentUser) throw new Error("Not authenticated");
  
  const baseAlias = data.name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  const alias = `${baseAlias}${Math.floor(100 + Math.random() * 900)}`;
  const accessCode = Math.floor(1000 + Math.random() * 9000).toString();

  const docRef = doc(collection(db, 'patients'));
  await setDoc(docRef, {
    ...data,
    alias,
    accessCode,
    therapistId: auth.currentUser.uid,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  // Create public alias registry
  await setDoc(doc(db, 'aliases', alias), {
    patientId: docRef.id,
    accessCode,
    therapistId: auth.currentUser.uid
  });

  return docRef.id;
}

export async function updatePatient(id: string, data: Partial<Patient>) {
  if (!auth.currentUser) throw new Error("Not authenticated");
  const docRef = doc(db, 'patients', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Date.now()
  });
}

export async function getPatientProfile(): Promise<Patient | null> {
  const localSession = localStorage.getItem('patientSession');
  if (localSession) {
    const snap = await getDoc(doc(db, 'patients', localSession));
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Patient;
    }
  }

  if (!auth.currentUser) return null;
  const q = query(collection(db, 'patients'), where('linkedUid', '==', auth.currentUser.uid));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as Patient;
}

export async function getPatientPortalAssignments(patientId: string): Promise<Assignment[]> {
  const localSession = localStorage.getItem('patientSession');
  if (!auth.currentUser && !localSession) return [];
  const q = query(collection(db, 'assignments'), where('patientId', '==', patientId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Assignment));
}

export async function completeAssignment(assignmentId: string, patientId: string) {
  const localSession = localStorage.getItem('patientSession');
  if (!auth.currentUser && !localSession) throw new Error("Not authenticated");
  
  const assignmentRef = doc(db, 'assignments', assignmentId);
  await updateDoc(assignmentRef, {
    status: 'completed',
    updatedAt: Date.now()
  });

  // Log to activity_progress
  const progressRef = collection(db, 'activity_progress');
  await addDoc(progressRef, {
    patientId,
    assignmentId,
    starsEarned: 10,
    completedAt: new Date()
  });

  // Increment stars
  const patientRef = doc(db, 'patients', patientId);
  const snap = await getDoc(patientRef);
  if (snap.exists()) {
     const currentStars = snap.data().stars || 0;
     await updateDoc(patientRef, {
       stars: currentStars + 10,
       updatedAt: Date.now()
     });
  }
}

export async function getAssignments(patientId: string) {
  if (!auth.currentUser) return [];
  // Firestore rules require standard assignments lists to query securely by therapistId
  const q = query(collection(db, 'assignments'), where('therapistId', '==', auth.currentUser.uid));
  const snap = await getDocs(q);
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() } as Assignment))
    .filter(a => a.patientId === patientId);
}

export async function getAllAssignments() {
  if (!auth.currentUser) return [];
  const q = query(collection(db, 'assignments'), where('therapistId', '==', auth.currentUser.uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Assignment));
}

export async function addAssignment(patientId: string, activityId: string) {
  if (!auth.currentUser) throw new Error("Not authenticated");
  const docRef = doc(collection(db, 'assignments'));
  await setDoc(docRef, {
    patientId: patientId,
    therapistId: auth.currentUser.uid,
    activityId: activityId,
    status: 'pending',
    dueDate: Date.now() + 86400000 * 7, // due in 7 days
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  return docRef.id;
}
