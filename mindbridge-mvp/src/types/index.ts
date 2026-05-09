// Core type exports
export * from './user';
export * from './chat';
export * from './community';
export * from './mood';
export * from './escalation';

// Common types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export type UserRole = 'student' | 'peer_listener' | 'health_scholar' | 'counsellor' | 'admin';

export type MoodLevel = 'very-low' | 'low' | 'moderate' | 'high' | 'very-high';

export type CrisisLevel = 'none' | 'mild' | 'moderate' | 'severe' | 'critical';
