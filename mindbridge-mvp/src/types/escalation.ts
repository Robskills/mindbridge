import { CrisisLevel } from './index';

export interface EscalationCase {
  id: string;
  userId: string;
  triggeredBy: 'ai' | 'user' | 'peer' | 'system';
  crisisLevel: CrisisLevel;
  status: 'pending' | 'reviewing' | 'resolved' | 'referred';
  reason: string;
  context: EscalationContext;
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  resolution?: string;
  referredTo?: string;
}

export interface EscalationContext {
  conversationId?: string;
  messageId?: string;
  moodEntryId?: string;
  keywords: string[];
  riskFactors: RiskFactor[];
  protectiveFactors: string[];
  previousEscalations: number;
}

export type RiskFactor = 
  | 'suicide-ideation' 
  | 'self-harm' 
  | 'harm-to-others' 
  | 'severe-depression' 
  | 'panic-attack' 
  | 'psychosis' 
  | 'substance-abuse' 
  | 'trauma';

export interface EscalationProtocol {
  level: CrisisLevel;
  responseTime: string;
  actions: EscalationAction[];
  requiredRole: string;
  autoAssign: boolean;
}

export interface EscalationAction {
  type: 'notify' | 'assign' | 'resource' | 'contact' | 'document';
  target?: string;
  message?: string;
  resourceIds?: string[];
  isMandatory: boolean;
}

export interface CrisisResource {
  id: string;
  name: string;
  type: 'hotline' | 'counselling' | 'medical' | 'peer' | 'online';
  description: string;
  contactInfo: string;
  availability: string;
  isFree: boolean;
  languages: string[];
  location?: string;
  website?: string;
}
