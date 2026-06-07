import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, MessageSquare, Send, Sparkles, ChevronRight, Loader2, Globe, Heart, Home } from 'lucide-react';
import { apiService } from '../services/api';
import type { Client, MatchSuggestion } from '../types';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import SendMatchModal from '../components/SendMatchModal'; 

export default function ClientDetailPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  
  const [client, setClient] = useState<Client | null>(null);
  const [matches, setMatches] = useState<MatchSuggestion[]>([]);
  const [noteText, setNoteText] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchSuggestion | null>(null);
  
  const [loadingClient, setLoadingClient] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    apiService.getClientById(clientId)
      .then(setClient)
      .catch(console.error)
      .finally(() => setLoadingClient(false));

    apiService.getMatches(clientId)
      .then(setMatches)
      .catch(console.error)
      .finally(() => setLoadingMatches(false));
  }, [clientId]);

  const handleAddNote = async () => {
    if (!noteText.trim() || !client) return;
    try {
      const newNote = await apiService.addNote(client.id, noteText.trim());
      setClient({ ...client, notes: [newNote, ...client.notes] });
      setNoteText('');
    } catch (err) { console.error(err); }
  };

  const handleModalSuccess = (candidateName: string) => {
    setSelectedMatch(null);
    setToast(`Introduction email successfully sent to ${candidateName}!`);
  };

  if (loadingClient) return <div className="flex h-screen items-center justify-center bg-slate-50"><Loader2 className="w-6 h-6 animate-spin text-purple-600" /></div>;
  if (!client) return <div className="flex h-screen items-center justify-center">Client Not Found</div>;

  return (
    <div className="flex h-screen bg-slate-50 flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 animate-fadeIn w-full">
        <div className="max-w-[1200px] mx-auto md:mx-0">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-7">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/dashboard')} className="p-2 bg-white rounded-md border shadow-sm hover:bg-slate-50 transition flex-shrink-0">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-1">{client.personal.firstName} {client.personal.lastName}</h2>
                <p className="text-xs sm:text-sm text-slate-500 capitalize">{client.personal.age} yrs • {client.personal.gender} • {client.personal.city}, {client.personal.country || 'India'}</p>
              </div>
            </div>
            <span className="sm:ml-auto self-start sm:self-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-bold uppercase whitespace-nowrap">
              {client.status}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
               
               {/* 1. Personal Details */}
               <div className="bg-white p-5 rounded-xl border shadow-sm">
                  <h3 className="flex items-center gap-2 font-bold mb-4 text-slate-800 border-b pb-2"><User className="w-4 h-4 text-purple-600"/> Personal Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 text-sm">
                    <p><span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Date of Birth</span> {client.personal.dateOfBirth || 'N/A'}</p>
                    <p><span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Height</span> {client.personal.heightCm ? `${client.personal.heightCm} cm` : 'N/A'}</p>
                    <p><span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Marital Status</span> <span className="capitalize">{client.personal.maritalStatus || 'Never Married'}</span></p>
                    <p><span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Email</span> {client.personal.email || 'N/A'}</p>
                    <p><span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Phone</span> {client.personal.phone || 'N/A'}</p>
                    <p><span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Languages Known</span> {client.personal.languages?.join(', ') || 'English, Hindi'}</p>
                  </div>
               </div>

               {/* 2. Professional & Education */}
               <div className="bg-white p-5 rounded-xl border shadow-sm">
                  <h3 className="flex items-center gap-2 font-bold mb-4 text-slate-800 border-b pb-2"><Briefcase className="w-4 h-4 text-blue-600"/> Professional & Education</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 text-sm">
                    <p><span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Occupation/Designation</span> {client.professional.occupation}</p>
                    <p><span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Current Company</span> {client.professional.company}</p>
                    <p><span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Annual Income</span> ₹{client.professional.annualIncomeLPA}L</p>
                    <p><span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Undergrad College</span> {client.professional.ugCollege || 'N/A'}</p>
                    <p><span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Degree</span> {client.professional.ugDegree || 'N/A'}</p>
                  </div>
               </div>

               {/* 3. Cultural & Preferences Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-5 rounded-xl border shadow-sm">
                    <h3 className="flex items-center gap-2 font-bold mb-4 text-slate-800 border-b pb-2"><Globe className="w-4 h-4 text-emerald-600"/> Cultural Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-slate-500">Religion & Caste</span> <span className="font-medium text-slate-800 capitalize">{client.cultural.religion} - {client.cultural.caste}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Diet</span> <span className="font-medium text-slate-800 capitalize">{client.cultural.diet}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Manglik Status</span> <span className="font-medium text-slate-800 capitalize">{client.cultural.manglik}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Mother Tongue</span> <span className="font-medium text-slate-800">{client.cultural.motherTongue || 'N/A'}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Siblings</span> <span className="font-medium text-slate-800">{client.cultural.siblings ?? '0'}</span></div>
                    </div>
                 </div>

                 <div className="bg-white p-5 rounded-xl border shadow-sm">
                    <h3 className="flex items-center gap-2 font-bold mb-4 text-slate-800 border-b pb-2"><Home className="w-4 h-4 text-orange-600"/> Match Preferences</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-slate-500">Want Kids?</span> <span className="font-medium text-slate-800">{client.preferences?.wantKids ? 'Yes' : 'No'}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Open to Relocate?</span> <span className="font-medium text-slate-800">{client.preferences?.openToRelocation ? 'Yes' : 'No'}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Open to Pets?</span> <span className="font-medium text-slate-800">{client.preferences?.openToPets ? 'Yes' : 'No'}</span></div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Matchmaker Notes */}
            <div className="bg-white border rounded-xl flex flex-col h-[500px] lg:h-auto shadow-sm">
               <div className="p-4 border-b flex items-center gap-2 font-bold text-slate-800 shrink-0">
                 <MessageSquare className="w-4 h-4 text-slate-400"/> Matchmaker Notes
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-3">
                 {client.notes.map(note => (
                   <div key={note.id} className="bg-slate-50 p-3 rounded-md text-sm border">
                     <p className="text-slate-700 whitespace-pre-wrap">{note.text}</p>
                     <span className="text-[10px] text-slate-400 block mt-1">{new Date(note.createdAt).toLocaleDateString()}</span>
                   </div>
                 ))}
               </div>
               <div className="p-4 border-t shrink-0">
                  <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add note..." className="w-full text-sm p-2 border rounded-md mb-2 h-16 resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/10"/>
                  <button onClick={handleAddNote} className="w-full bg-slate-900 text-white p-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition">
                    <Send className="w-3 h-3"/> Save Note
                  </button>
               </div>
            </div>
          </div>

          {/* AI Matches */}
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600"/> Smart Matches
            </h3>
            
            {loadingMatches ? (
              <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-slate-300 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500 mb-4" />
                <p className="text-slate-500 font-medium">Evaluating profiles...</p>
              </div>
            ) : matches.length === 0 ? (
              <p className="text-slate-500 text-sm">No matches found for this profile yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {matches.map((match) => (
                  <div key={match.candidateId} className="bg-white p-5 rounded-xl border shadow-sm relative hover:shadow-md transition flex flex-col h-full">
                    <div className="absolute top-4 right-4 bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded text-xs">
                      {match.scores.aiScore.score}% Match
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1 pr-16 truncate">{match.candidateName}</h4>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-1">{match.candidateSummary.age} yrs • {match.candidateSummary.occupation} • ₹{match.candidateSummary.incomeLPA}L</p>
                    
                    <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 italic mb-4 border flex-grow">
                      "{match.scores.aiScore.rationale}"
                    </div>

                    <button 
                      onClick={() => setSelectedMatch(match)}
                      className="w-full mt-auto bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition"
                    >
                      Review & Send <ChevronRight className="w-4 h-4"/>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {selectedMatch && (
        <SendMatchModal 
          clientId={client.id}
          clientName={`${client.personal.firstName} ${client.personal.lastName}`}
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onSuccess={handleModalSuccess}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}