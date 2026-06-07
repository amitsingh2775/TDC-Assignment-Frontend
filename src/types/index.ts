export type Gender = 'male' | 'female' | 'non-binary';
export type MaritalStatus = 'never-married' | 'divorced' | 'widowed' | 'separated';
export type Diet = 'vegetarian' | 'non-vegetarian' | 'vegan' | 'jain' | 'eggetarian';
export type Manglik = 'yes' | 'no' | 'partial' | 'doesnt-matter';
export type ClientStatus = 'active' | 'paused' | 'matched' | 'closed' | 'onboarding';
export type NoteType = 'general' | 'feedback' | 'meeting' | 'follow-up';
export type JourneyStatus = 'Onboarding' | 'Searching' | 'Match Sent' | 'Completed';

export interface IMatcherNote {
  id: string;
  text: string;
  type: NoteType;
  createdAt: string;
  matcherId: string;
}

export interface ISentMatch {
  candidateId: string;
  sentAt: string;
  matcherId: string;
  status: string;
}

export interface Client {
  id: string;
  personal: {
    firstName: string;
    lastName: string;
    age: number;
    gender: Gender;
    dateOfBirth: string;
    country: string;
    city: string;
    heightCm: number;
    email: string;
    phone: string;
    maritalStatus: MaritalStatus;
    languages: string[];
  };
  cultural: {
    religion: string;
    caste: string;
    manglik: Manglik;
    diet: Diet;
    siblings: number;
    motherTongue: string; // Indian context field
    gotra?: string;
  };
  professional: {
    occupation: string;
    designation: string;
    company: string;
    annualIncomeLPA: number;
    ugCollege: string;
    ugDegree: string;
  };
  preferences: {
    wantKids: boolean;
    openToRelocation: boolean;
    openToPets: boolean;
  };
  status: ClientStatus;
  journeyStatus: JourneyStatus;
  assignedMatcherId: string;
  notes: IMatcherNote[];
  sentMatches: ISentMatch[];
  onboardedAt: string;
}

// AI Score aur Suggestion Interfaces
export interface AIMatchScore {
  score: number;
  label: string;
  rationale: string;
  keyHighlights: string[];
}

export interface AIIntroEmail {
  subject: string;
  body: string;
  signOff: string;
}

export interface MatchSuggestion {
  candidateId: string;
  candidateName: string;
  candidateSummary: {
    age: number;
    city: string;
    occupation: string;
    company: string;
    incomeLPA: number;
  };
  scores: {
    algorithmScore: number;
    aiScore: AIMatchScore;
  };
  introEmail: AIIntroEmail;
}