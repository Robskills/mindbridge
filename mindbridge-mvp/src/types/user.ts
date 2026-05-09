import { UserRole } from './index';

export interface User {
  id: string;
  email?: string;
  anonymousId: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  university?: string;
  yearOfStudy?: number;
  course?: string;
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt?: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: 'en' | 'sw';
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
  dataSaverMode: boolean;
}

export interface AnonymousAuthResult {
  userId: string;
  anonymousId: string;
  token: string;
  expiresAt: Date;
}
