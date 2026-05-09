import { MoodLevel } from './index';

export interface MoodEntry {
  id: string;
  userId: string;
  moodLevel: MoodLevel;
  score?: number; // PHQ-9 score if completed
  timestamp: Date;
  notes?: string;
  tags: string[];
  phq2Score?: number;
  phq9Score?: number;
  isComplete: boolean;
}

export interface PHQ2Question {
  id: number;
  text: string;
  swahiliText: string;
}

export interface PHQ9Question {
  id: number;
  text: string;
  swahiliText: string;
  category: PHQ9Category;
}

export type PHQ9Category = 
  | 'interest' 
  | 'depressed' 
  | 'sleep' 
  | 'energy' 
  | 'appetite' 
  | 'failure' 
  | 'concentration' 
  | 'movement' 
  | 'suicide';

export interface MoodTrend {
  date: Date;
  averageMood: number;
  entryCount: number;
  phq9Average?: number;
}

export interface MoodAssessment {
  level: MoodLevel;
  riskLevel: 'low' | 'moderate' | 'high';
  recommendations: string[];
  shouldEscalate: boolean;
  trend: 'improving' | 'stable' | 'declining';
}
