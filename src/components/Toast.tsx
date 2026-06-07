import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface Props {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-lg transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <CheckCircle className="w-4 h-4 text-emerald-400" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
