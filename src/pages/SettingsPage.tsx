import { useState } from 'react';
import { User, Bell, Shield, Save, Check } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';

export default function SettingsPage() {
  const { matchmakerName, matchmakerAvatar } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: matchmakerName,
    email: 'priya.sharma@thedatecrew.com',
    phone: '+91 98765 43210',
    timezone: 'Asia/Kolkata',
  });

  const [notifications, setNotifications] = useState({
    emailNewMatch: true,
    emailClientUpdate: true,
    emailWeeklyDigest: false,
    pushNewMatch: true,
    pushClientNote: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile' as const, icon: User, label: 'Profile' },
    { id: 'notifications' as const, icon: Bell, label: 'Notifications' },
    { id: 'security' as const, icon: Shield, label: 'Security' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 overflow-auto w-full">
        <div className="p-4 sm:p-6 md:p-8 max-w-[800px] mx-auto md:mx-0 animate-fadeIn">
          
          {/* Header */}
          <div className="mb-6 md:mb-7">
            <h2 className="text-xl font-bold text-slate-900 tracking-[-0.02em]">Settings</h2>
            <p className="text-sm text-slate-400 mt-0.5">Manage your account and preferences</p>
          </div>

          {/* Tabs - Responsive wrapping and stretching for mobile */}
          <div className="flex flex-wrap sm:flex-nowrap gap-1 p-1 bg-white border border-slate-200/80 rounded-xl mb-6 w-full sm:w-fit overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-[13px] font-medium transition-all duration-150 ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="tdc-card p-4 sm:p-6">
              <div className="flex items-center gap-4 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-slate-100">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-lg sm:text-xl font-bold text-slate-600 shadow-md flex-shrink-0">
                  {matchmakerAvatar}
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-slate-800 truncate">{profile.name}</p>
                  <p className="text-xs text-slate-400">Senior Matchmaker</p>
                </div>
              </div>

              {/* Grid: 1 col on mobile, 2 col on tablet/desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="tdc-section-label">Full Name</label>
                  <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="tdc-input w-full" />
                </div>
                <div>
                  <label className="tdc-section-label">Email</label>
                  <input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className="tdc-input w-full" />
                </div>
                <div>
                  <label className="tdc-section-label">Phone</label>
                  <input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} className="tdc-input w-full" />
                </div>
                <div>
                  <label className="tdc-section-label">Timezone</label>
                  <select value={profile.timezone} onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))} className="tdc-input w-full">
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="tdc-card p-4 sm:p-6">
              <h3 className="text-[15px] font-semibold text-slate-800 mb-4 sm:mb-5">Notification Preferences</h3>
              <div className="space-y-1">
                <p className="tdc-section-label mb-2 sm:mb-3">Email</p>
                <ToggleRow label="New match sent" desc="When a match introduction is sent to a client" checked={notifications.emailNewMatch} onChange={v => setNotifications(n => ({ ...n, emailNewMatch: v }))} />
                <ToggleRow label="Client update" desc="When a client changes their journey status" checked={notifications.emailClientUpdate} onChange={v => setNotifications(n => ({ ...n, emailClientUpdate: v }))} />
                <ToggleRow label="Weekly digest" desc="Summary of your weekly matchmaking activity" checked={notifications.emailWeeklyDigest} onChange={v => setNotifications(n => ({ ...n, emailWeeklyDigest: v }))} />

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <p className="tdc-section-label mb-2 sm:mb-3">Push</p>
                  <ToggleRow label="New match" desc="Instant push notification for new matches" checked={notifications.pushNewMatch} onChange={v => setNotifications(n => ({ ...n, pushNewMatch: v }))} />
                  <ToggleRow label="Client note" desc="When a note is added to your client profile" checked={notifications.pushClientNote} onChange={v => setNotifications(n => ({ ...n, pushClientNote: v }))} />
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="tdc-card p-4 sm:p-6">
              <h3 className="text-[15px] font-semibold text-slate-800 mb-4 sm:mb-5">Security</h3>
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="tdc-section-label">Current Password</label>
                  <input type="password" placeholder="Enter current password" className="tdc-input w-full" />
                </div>
                <div>
                  <label className="tdc-section-label">New Password</label>
                  <input type="password" placeholder="Enter new password" className="tdc-input w-full" />
                </div>
                <div>
                  <label className="tdc-section-label">Confirm Password</label>
                  <input type="password" placeholder="Confirm new password" className="tdc-input w-full" />
                </div>
              </div>
            </div>
          )}

          {/* Save Action - Stacks on mobile */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-5">
            <button className="tdc-btn-ghost w-full sm:w-auto">Cancel</button>
            <button onClick={handleSave} className="tdc-btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
              {saved ? <><Check className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-2.5 gap-4">
      <div className="flex-1 pr-2">
        <p className="text-[13px] font-medium text-slate-700">{label}</p>
        <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? 'bg-slate-900' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-[3px] left-[3px] w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? 'translate-x-[18px]' : ''}`} />
      </button>
    </div>
  );
}