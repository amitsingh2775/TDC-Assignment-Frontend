import { X, Mail, CheckCircle, Loader2 } from 'lucide-react';
import type { MatchSuggestion } from '../types';
import { useState } from 'react';
import { apiService } from '../services/api';

interface Props {
  clientId: string;
  clientName: string;
  match: MatchSuggestion;
  onClose: () => void;
  onSuccess: (candidateName: string) => void;
}

export default function SendMatchModal({ clientId, clientName, match, onClose, onSuccess }: Props) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMatch = async () => {
    setIsSending(true);
    setError(null);
    
    try {
      await apiService.sendMatch(clientId, match.candidateId);
      onSuccess(match.candidateName); // Modal close karega aur parent me toast dikhayega
    } catch (err: any) {
      console.error('Error sending match:', err);
      setError(err.response?.data?.error || 'Failed to send the introduction. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full shadow-xl animate-fadeIn flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-premium-purple flex items-center justify-center">
              <Mail className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Review AI Match Introduction</h3>
          </div>
          <button onClick={onClose} disabled={isSending} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors disabled:opacity-50">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-6 overflow-y-auto">
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 mb-5">
            <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
              <Mail className="w-3 h-3" />
              <span>AI Generated Email Preview</span>
            </div>
            
            <div className="space-y-3 text-sm text-slate-600">
              <p><span className="text-slate-400 text-xs w-16 inline-block">Subject:</span> <span className="font-medium text-slate-800">{match.introEmail.subject}</span></p>
              
              <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                {match.introEmail.body}
                <br /><br />
                {match.introEmail.signOff}
              </div>
            </div>
          </div>

          {/* Profile Quick Summary for Matchmaker */}
          <div className="bg-purple-50/50 rounded-lg p-4 mb-5 text-xs text-slate-600 border border-purple-100">
            <strong className="text-purple-900 block mb-1">Sending to {clientName} regarding {match.candidateName}:</strong>
            {match.candidateSummary.age} yrs • {match.candidateSummary.occupation} at {match.candidateSummary.company} • ₹{match.candidateSummary.incomeLPA}L PA
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 shrink-0 bg-gray-50/50 rounded-b-xl">
          <button onClick={onClose} disabled={isSending} className="tdc-btn-ghost disabled:opacity-50">Cancel</button>
          <button 
            onClick={handleSendMatch} 
            disabled={isSending} 
            className="tdc-btn-primary flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending via Backend...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Approve & Send Match
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}