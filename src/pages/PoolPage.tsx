import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, MapPin, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { apiService } from '../services/api';
import Sidebar from '../components/Sidebar';

function calcAge(dob: string): number {
  const year = parseInt(dob.split('/').pop() || '0');
  return new Date().getFullYear() - year;
}

export default function PoolPage() {
  const [pool, setPool] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');

  useEffect(() => {
    const loadPool = async () => {
      try {
        const data = await apiService.getPoolProfiles();
        setPool(data);
      } catch (err) {
        console.error("Failed to fetch pool", err);
      } finally {
        setLoading(false);
      }
    };
    loadPool();
  }, []);

  const cities = useMemo(() => ['All', ...Array.from(new Set(pool.map(p => p.personal.city))).sort()], [pool]);

  const filtered = useMemo(() => {
    return pool.filter(p => {
      const name = `${p.personal.firstName} ${p.personal.lastName}`.toLowerCase();
      if (search && !name.includes(search.toLowerCase()) && !p.professional.company.toLowerCase().includes(search.toLowerCase())) return false;
      if (genderFilter !== 'All' && p.personal.gender.toLowerCase() !== genderFilter.toLowerCase()) return false;
      if (cityFilter !== 'All' && p.personal.city !== cityFilter) return false;
      return true;
    });
  }, [search, genderFilter, cityFilter, pool]);

  if (loading) return <div className="flex h-screen items-center justify-center bg-slate-50">Loading Pool...</div>;

  return (
    <div className="flex h-screen bg-slate-50 flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 overflow-auto w-full">
        {/* Responsive padding: px-4 for mobile, px-6 for tablet, px-8 for desktop */}
        <div className="p-4 sm:p-6 md:p-8 animate-fadeIn max-w-[1400px] mx-auto">
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-[-0.02em]">Matchmaking Pool</h2>
            <p className="text-sm text-slate-400 mt-0.5">Browse {filtered.length} available profiles in the system</p>
          </div>

          {/* Premium Filters Section */}
          <div className="tdc-card p-4 sm:p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Filters</span>
            </div>
            
            {/* Filter Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="relative lg:col-span-2 sm:col-span-2 lg:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or company..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200/60 rounded-lg outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition-all"
                />
              </div>
              <select 
                value={genderFilter} 
                onChange={e => setGenderFilter(e.target.value)} 
                className="w-full text-sm border border-slate-200/60 bg-slate-50 rounded-lg px-3 py-2.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="All">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select 
                value={cityFilter} 
                onChange={e => setCityFilter(e.target.value)} 
                className="w-full text-sm border border-slate-200/60 bg-slate-50 rounded-lg px-3 py-2.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              >
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Profile Grid: 1 col mobile, 2 col tablet, 3-4 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(profile => (
              <div key={profile.id} className="tdc-card p-4 sm:p-5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 flex flex-col h-full">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200/50 flex-shrink-0">
                    {profile.personal.firstName[0]}{profile.personal.lastName[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-slate-800 truncate">{profile.personal.firstName} {profile.personal.lastName}</p>
                    <p className="text-[11px] text-slate-400 truncate">{profile.personal.age} yrs &bull; <span className="capitalize">{profile.personal.gender}</span></p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{profile.personal.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Briefcase className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{profile.professional.designation || 'Professional'}, {profile.professional.company}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                  <span className="text-xs font-semibold text-slate-700">₹{profile.professional.annualIncomeLPA}L</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium capitalize truncate max-w-[100px] text-right">
                    {profile.cultural.religion}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <Heart className="w-8 h-8 text-slate-200 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No profiles match your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}