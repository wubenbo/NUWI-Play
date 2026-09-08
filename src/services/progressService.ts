import { db, auth } from '../lib/firebase';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

export async function getTotalScore(): Promise<number> {
  if (!auth.currentUser) return 0;
  try {
    const q = query(collection(db, 'progressLogs'), where('patientId', '==', auth.currentUser.uid));
    const snap = await getDocs(q);
    let total = 0;
    snap.forEach(d => {
      const data = d.data();
      if (data.score) total += data.score;
    });
    return total;
  } catch (err) {
    console.error("Error fetching score", err);
    return 0;
  }
}

export async function saveActivityProgress(activityId: string, durationSeconds: number, score: number) {
  if (!auth.currentUser) {
    console.warn("User not authenticated. Skipping save.");
    return false;
  }

  try {
    const logId = crypto.randomUUID();
    const data = {
      patientId: auth.currentUser.uid,
      assignmentId: crypto.randomUUID(), // Mocking assignment ID for now
      activityId,
      durationSeconds,
      score,
      completedAt: Date.now()
    };
    
    await setDoc(doc(db, 'progressLogs', logId), data);
    console.log("Progress saved to Firestore!", data);
    return true;
  } catch (error) {
    console.error("Error saving progress:", error);
    return false;
  }
}
