import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, EyeOff, ArrowRight, Zap, Users, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const success = await login(username, password); 
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Panel - Premium Design (Hidden on Mobile/Tablet, visible on Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex-col justify-between p-8 xl:p-12">
        {/* Animated background grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
          {/* Gradient orbs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12 xl:mb-16">
            <div className="w-11 h-11 bg-gradient-to-br from-white to-slate-100 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-slate-900" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-white text-lg font-bold tracking-[-0.02em]">The Date Crew</h1>
              <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest mt-0.5">AI Matchmaking</p>
            </div>
          </div>

          {/* Headline */}
          <div className="max-w-[360px] xl:max-w-[400px]">
            <h2 className="text-white text-3xl xl:text-[36px] font-bold leading-[1.15] tracking-[-0.03em] mb-5">
              Matchmaking, powered by data.
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              An elite internal platform for professional matchmakers to manage clients, discover compatible pairs, and drive successful outcomes.
            </p>

            {/* Features list */}
            <div className="space-y-3.5">
              <FeatureItem icon={Zap} text="AI-powered compatibility scoring" />
              <FeatureItem icon={Users} text="Manage 100+ client profiles" />
              <FeatureItem icon={TrendingUp} text="Track success metrics in real-time" />
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="relative z-10">
          <div className="mb-6">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Now Live</p>
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {[
                  { initials: 'PS', color: 'from-purple-400 to-purple-600' },
                  { initials: 'AM', color: 'from-blue-400 to-blue-600' },
                  { initials: 'RK', color: 'from-pink-400 to-pink-600' }
                ].map((m, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}
                  >
                    {m.initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-slate-300 text-xs font-semibold">3 Matchmakers Active</p>
                <p className="text-slate-500 text-[10px] mt-0.5">Managing 150+ clients</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 xl:gap-3">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-2 xl:px-3 py-2">
              <p className="text-white text-xs font-bold">94%</p>
              <p className="text-slate-400 text-[10px] mt-1 truncate">Match Success</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-2 xl:px-3 py-2">
              <p className="text-white text-xs font-bold">2.3K</p>
              <p className="text-slate-400 text-[10px] mt-1 truncate">Pool Profiles</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-2 xl:px-3 py-2">
              <p className="text-white text-xs font-bold">18d</p>
              <p className="text-slate-400 text-[10px] mt-1 truncate">Avg Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-[340px] sm:max-w-[400px] animate-fadeIn">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center sm:justify-start gap-3 mb-10">
            <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-slate-900 text-lg font-bold tracking-[-0.02em]">The Date Crew</span>
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-[24px] font-bold text-slate-900 tracking-[-0.03em] mb-2">Welcome back</h1>
            <p className="text-sm text-slate-400 mb-8">Sign in to your matchmaker dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2 tracking-widest uppercase">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all bg-white"
                placeholder="Enter your username"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2 tracking-widest uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 sm:py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all bg-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50/70 border border-red-200/50 text-red-600 text-xs px-4 py-3 rounded-lg font-medium text-center sm:text-left">{error}</div>
            )}

            <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200 py-3 sm:py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2.5 disabled:opacity-70 mt-6 shadow-sm">
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4 opacity-70" /></>
              )}
            </button>
          </form>

          {/* Footer note space */}
          <div className="mt-8 sm:mt-6 pt-6 border-t border-slate-200">
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, text }: { icon: typeof Heart; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-slate-300" strokeWidth={2} />
      </div>
      <span className="text-slate-300 text-sm font-medium leading-tight">{text}</span>
    </div>
  );
}