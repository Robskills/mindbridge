// Application constants

export const APP_NAME = 'MindBridge';
export const APP_VERSION = '1.0.0';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
] as const;

export const DEFAULT_LANGUAGE = 'en';

export const CRISIS_HOTLINE = '+254-700-000-000';
export const CRISIS_EMAIL = 'crisis@mindbridge.africa';

export const MOOD_SCALE = {
  min: 1,
  max: 10,
  labels: {
    1: 'Very Low',
    5: 'Neutral',
    10: 'Very High',
  },
} as const;

export const PHQ2_THRESHOLD = 3; // Score above which PHQ-9 is recommended
export const PHQ9_SEVERE_THRESHOLD = 20; // Score indicating severe depression

export const MAX_MESSAGE_LENGTH = 1000;
export const MAX_POST_LENGTH = 500;

export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
} as const;

export const CACHE_DURATION = {
  short: 5 * 60, // 5 minutes
  medium: 30 * 60, // 30 minutes
  long: 24 * 60 * 60, // 24 hours
} as const;
