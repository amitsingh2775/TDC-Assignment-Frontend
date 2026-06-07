import { useState } from 'react';
import { Users, BarChart3, Settings, LogOut, Heart, ChevronRight, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const navItems = [
  { icon: Users, label: 'Active Clients', path: '/dashboard' },
  { icon: Heart, label: 'Pool', path: '/pool' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const { matchmakerName, matchmakerAvatar, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Helper to handle navigation and close drawer on mobile
  const handleNav = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header (Visible only on small screens) */}
      <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b border-slate-200/80 flex-shrink-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
            <Heart className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-[15px] font-bold text-slate-900 tracking-[-0.02em]">The Date Crew</h1>
        </div>
        <button 
          onClick={() => setIsOpen(true)} 
          className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Overlay (Darkens background when drawer is open) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/30 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar (Drawer on mobile, Fixed side panel on desktop) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200/80 flex flex-col flex-shrink-0 w-[260px] h-full
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        {/* Brand */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
              <Heart className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-[15px] font-bold text-slate-900 tracking-[-0.02em]">The Date Crew</h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Matchmaking Platform</p>
            </div>
          </div>
          {/* Close button for mobile drawer */}
          <button 
            onClick={() => setIsOpen(false)} 
            className="md:hidden p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pt-2 space-y-0.5 overflow-y-auto">
          <p className="px-3 pt-2 pb-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-[0.1em]">Menu</p>
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname.startsWith('/client'));
            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} strokeWidth={isActive ? 2 : 1.8} />
                  {item.label}
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/60' : 'text-slate-300'}`} />
              </button>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="px-4 pb-4">
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm flex-shrink-0">
                {matchmakerAvatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-slate-800 truncate">{matchmakerName}</p>
                <p className="text-[10px] text-slate-400 font-medium">Senior Matchmaker</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); handleNav('/login'); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-150"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}