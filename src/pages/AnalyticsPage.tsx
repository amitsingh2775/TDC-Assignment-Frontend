import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Users, Heart, Clock, ArrowDownRight, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import Sidebar from '../components/Sidebar';

export default function AnalyticsPage() {
  const { clients } = useApp();
  const [pool, setPool] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await apiService.getPoolProfiles();
        // Backend se aaye data ko array mein set karein
        setPool(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch pool", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const stats = useMemo(() => {
    const totalPool = pool.length;
    
    // Gender fix: toLowerCase() use karke case mismatch hataya
    const malePool = pool.filter(p => p.personal?.gender?.toLowerCase() === 'male').length;
    const femalePool = pool.filter(p => p.personal?.gender?.toLowerCase() === 'female').length;
    
    // Income fix: professional.annualIncomeLPA ka use
    const avgIncome = pool.length > 0 
      ? Math.round(pool.reduce((s, p) => s + (Number(p.professional?.annualIncomeLPA) || 0), 0) / pool.length) 
      : 0;
    
    return { totalPool, malePool, femalePool, avgIncome };
  }, [pool]);

  if (loading) return <div className="flex h-screen items-center justify-center bg-slate-50">Loading Analytics...</div>;

  return (
    <div className="flex h-screen bg-slate-50 flex-col md:flex-row">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="px-4 sm:px-6 md:px-8 py-6 md:py-7 max-w-[1100px] w-full mx-auto md:mx-0">
          <div className="mb-6 md:mb-7">
            <h2 className="text-xl font-bold text-slate-900 tracking-[-0.02em]">Analytics</h2>
            <p className="text-sm text-slate-400 mt-0.5">Overview of your matchmaking pipeline and pool demographics</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            <SummaryCard icon={Users} label="Pool Size" value={stats.totalPool} sub={`${stats.malePool}M / ${stats.femalePool}F`} color="blue" />
            <SummaryCard icon={Heart} label="Active Clients" value={clients.length} sub="Assigned to you" color="purple" />
            <SummaryCard icon={TrendingUp} label="Avg Income" value={`${stats.avgIncome}L`} sub="Pool average CTC" color="mint" />
            <SummaryCard icon={Clock} label="Conversion" value="34%" sub="Match to completion" color="peach" />
          </div>

          <div className="tdc-card p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-4 h-4 text-slate-400" />
              <h3 className="text-[15px] font-semibold text-slate-800">Client Pipeline</h3>
            </div>
            <div className="space-y-4">
              {(['Onboarding', 'Searching', 'Match Sent', 'Completed'] as const).map(status => {
                const count = clients.filter(c => c.journeyStatus === status).length;
                const pct = clients.length > 0 ? (count / clients.length) * 100 : 0;
                const barColor = status === 'Onboarding' ? 'bg-blue-500' : status === 'Searching' ? 'bg-orange-500' : status === 'Match Sent' ? 'bg-purple-500' : 'bg-emerald-500';
                
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-slate-600">{status}</span>
                      <span className="text-xs text-slate-400">{count} client{count !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${Math.max(pct, 4)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, sub, color }: any) {
  const bgMap: Record<string, string> = { blue: 'bg-blue-50', purple: 'bg-purple-50', mint: 'bg-emerald-50', peach: 'bg-orange-50' };
  const iconMap: Record<string, string> = { blue: 'text-blue-600', purple: 'text-purple-600', mint: 'text-emerald-600', peach: 'text-orange-600' };
  
  return (
    <div className="tdc-card p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-xl ${bgMap[color]} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${iconMap[color]}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900 tracking-[-0.03em]">{value}</p>
          <p className="text-[11px] text-slate-400">{label}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-auto">
        <ArrowDownRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
        <span className="text-[11px] text-slate-400 truncate">{sub}</span>
      </div>
    </div>
  );
}