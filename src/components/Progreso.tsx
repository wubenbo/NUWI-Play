import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { Loader2 } from 'lucide-react';

interface ProgresoProps {
  patientId: string;
}

const PIE_COLORS = ['#823CEB', '#38bdf8', '#34d399', '#fbbf24', '#f43f5e', '#a78bfa'];

export default function Progreso({ patientId }: ProgresoProps) {
  const [data, setData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      if (!patientId) return;
      setLoading(true);
      try {
        const q = query(
          collection(db, 'activity_progress'),
          where('patientId', '==', patientId),
          orderBy('completedAt', 'asc'),
          limit(50)
        );
        const snap = await getDocs(q);
        const fetched = snap.docs.map(doc => {
          const d = doc.data() as any;
          const date = d.completedAt?.toDate();
          return {
            id: doc.id,
            ...d,
            dateLabel: date ? `${date.getDate()}/${date.getMonth() + 1}` : 'N/A'
          };
        });
        
        // Group by date to show stars earned and activities count per day
        const grouped: Record<string, { dateLabel: string, stars: number, actividades: number }> = {};
        const activityCount: Record<string, number> = {};

        fetched.forEach(item => {
          const label = item.dateLabel;
          if (!grouped[label]) {
            grouped[label] = { dateLabel: label, stars: 0, actividades: 0 };
          }
          grouped[label].stars += (item.starsEarned || 0);
          grouped[label].actividades += 1;

          // For pie chart
          const actName = item.activityId || 'General';
          activityCount[actName] = (activityCount[actName] || 0) + 1;
        });
        
        setData(Object.values(grouped));

        // Format pie data
        const formattedPie = Object.keys(activityCount).map(key => ({
          name: key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          value: activityCount[key]
        }));
        setPieData(formattedPie);

      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, [patientId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 w-full min-w-[200px] min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#823CEB]" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-48 w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 min-w-[200px] min-h-[200px]">
        <p className="text-slate-500 font-medium">Aún no hay datos de progreso.</p>
        <p className="text-xs text-slate-400 mt-1">Las actividades completadas aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Gráfico de Barras: Actividades Completadas */}
        <div className="w-full h-64 bg-white/50 p-4 rounded-3xl min-w-[300px]">
          <h3 className="text-sm font-bold text-[#823CEB] mb-4">Actividades Completadas (Últimos días)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="dateLabel" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                cursor={{ fill: 'rgba(130, 60, 235, 0.1)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="actividades" name="Actividades" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico Circular: Distribución de Actividades */}
        <div className="w-full h-64 bg-white/50 p-4 rounded-3xl min-w-[300px]">
          <h3 className="text-sm font-bold text-[#823CEB] mb-2">Distribución de Actividades</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Área: Chispas Obtenidas */}
      <div className="w-full h-64 bg-white/50 p-4 rounded-3xl min-w-[300px]">
        <h3 className="text-sm font-bold text-[#823CEB] mb-4">Progresión de Chispas Ganadas</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorStars" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#823CEB" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#823CEB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="dateLabel" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
              labelStyle={{ color: '#823CEB', fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="stars" name="Chispas" stroke="#823CEB" strokeWidth={3} fillOpacity={1} fill="url(#colorStars)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
