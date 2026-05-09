import { CrisisLevel } from './index';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'user' | 'ai' | 'peer' | 'system';
  content: string;
  timestamp: Date;
  isEdited: boolean;
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  crisisLevel?: CrisisLevel;
  escalationTriggered?: boolean;
  suggestedResources?: string[];
  moodDetected?: string;
  language?: 'en' | 'sw';
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt?: Date;
  messageCount: number;
  crisisLevel: CrisisLevel;
  isEscalated: boolean;
  escalatedTo?: string;
}

export interface ChatStreamResponse {
  messageId: string;
  content: string;
  isComplete: boolean;
  crisisAssessment?: CrisisAssessment;
}

export interface CrisisAssessment {
  level: CrisisLevel;
  keywords: string[];
  recommendedAction: string;
  requiresEscalation: boolean;
}
