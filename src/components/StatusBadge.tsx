import type { JourneyStatus } from '../types';

// Hum yahan 'any' ya 'string' use karenge fallback ke liye 
// taki agar status config mein na ho, toh error na aaye.
const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  Onboarding: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  Searching: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Match Sent': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  Completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  // Add fallback for common statuses like active/paused if they appear
  active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  paused: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
};

export default function StatusBadge({ status }: { status: string }) {
  // Agar status config mein nahi mila, toh 'defaultConfig' use karein
  const defaultConfig = { bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400' };
  const config = statusConfig[status] || defaultConfig;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold ${config.bg} ${config.text} ring-1 ring-inset ${config.bg.replace('50', '200')}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}