  import { useEffect } from 'react';
  import { Users, Heart, Trophy, TrendingUp, Clock } from 'lucide-react';
  import { useNavigate } from 'react-router-dom';
  import { useApp } from '../context/AppContext';
  import Sidebar from '../components/Sidebar';
  import StatusBadge from '../components/StatusBadge';

  export default function DashboardPage() {
    const { clients, fetchClients, isLoading } = useApp();
    const navigate = useNavigate();

    useEffect(() => {
      fetchClients();
    }, []);

    const totalClients = clients.length;
    const onboarding = clients.filter(c => c.status === 'onboarding').length;
    const pendingMatches = clients.filter(c => c.status === 'active').length;
    const successfulPairs = clients.filter(c => c.status === 'matched').length;

    if (isLoading) {
      return <div className="flex h-screen items-center justify-center bg-slate-50">Loading Clients...</div>;
    }

    return (
      <div className="flex h-screen bg-slate-50 flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          {/* Responsive padding aur width handle karne ke liye w-full aur mx-auto */}
          <div className="px-4 sm:px-6 md:px-8 py-6 md:py-7 max-w-[1200px] mx-auto animate-fadeIn w-full">
            
            {/* Header */}
            <div className="mb-6 md:mb-7">
              <h2 className="text-xl font-bold text-slate-900 tracking-[-0.02em]">Active Clients</h2>
              <p className="text-sm text-slate-400 mt-0.5">Manage your assigned clients and their matchmaking journey</p>
            </div>

            {/* Metrics - Mobile pe 1, Tablet pe 2, Desktop pe 4 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-7">
              <MetricCard icon={Users} label="Total Clients" value={totalClients} bg="bg-blue-50" iconColor="text-blue-600" trend="All time" />
              <MetricCard icon={Clock} label="Onboarding" value={onboarding} bg="bg-orange-50" iconColor="text-orange-600" trend="In progress" />
              <MetricCard icon={Heart} label="Active Searching" value={pendingMatches} bg="bg-purple-50" iconColor="text-purple-600" trend="Awaiting match" />
              <MetricCard icon={Trophy} label="Matched" value={successfulPairs} bg="bg-emerald-50" iconColor="text-emerald-600" trend="Successful" />
            </div>

            {/* Client Table */}
            <div className="tdc-card overflow-hidden border border-slate-200 bg-white rounded-xl shadow-sm">
              <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-slate-800">Client List</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{totalClients} total clients</p>
                </div>
              </div>
              
              {/* Table wrapper with horizontal scroll for mobile */}
              <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap md:whitespace-normal">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="text-left text-[10px] font-semibold text-slate-400 uppercase tracking-[0.08em] px-4 sm:px-6 py-3">Client</th>
                      <th className="text-left text-[10px] font-semibold text-slate-400 uppercase tracking-[0.08em] px-4 sm:px-6 py-3">Age / Gender</th>
                      <th className="text-left text-[10px] font-semibold text-slate-400 uppercase tracking-[0.08em] px-4 sm:px-6 py-3">City</th>
                      <th className="text-left text-[10px] font-semibold text-slate-400 uppercase tracking-[0.08em] px-4 sm:px-6 py-3">Journey</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, i) => (
                      <tr
                        key={client.id}
                        onClick={() => navigate(`/client/${client.id}`)}
                        className="border-b border-slate-50 hover:bg-slate-50/80 cursor-pointer transition-colors duration-150 group"
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 flex-shrink-0">
                              {client.personal.firstName[0]}
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-slate-800">{client.personal.firstName} {client.personal.lastName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-[13px] text-slate-600 capitalize">
                          {client.personal.age} yrs, {client.personal.gender}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-[13px] text-slate-600">{client.personal.city}</td>
                        <td className="px-4 sm:px-6 py-4"><StatusBadge status={client.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function MetricCard({ icon: Icon, label, value, bg, iconColor, trend }: any) {
    return (
      <div className="tdc-card p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between h-full">
        <div>
          <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3 flex-shrink-0`}>
            <Icon className={`w-[18px] h-[18px] ${iconColor}`} />
          </div>
          <p className="text-2xl font-bold text-slate-900 tracking-[-0.03em]">{value}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-slate-400 font-medium">{label}</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">{trend}</p>
        </div>
      </div>
    );
  }