import { CrisisLevel, EscalationProtocol } from '../types';

export const escalationProtocols: Record<CrisisLevel, EscalationProtocol> = {
  none: {
    level: 'none',
    responseTime: 'N/A',
    actions: [],
    requiredRole: 'ai',
    autoAssign: false,
  },
  mild: {
    level: 'mild',
    responseTime: '24 hours',
    actions: [
      {
        type: 'resource',
        message: 'Consider exploring our self-help resources',
        isMandatory: false,
      },
      {
        type: 'document',
        isMandatory: true,
      },
    ],
    requiredRole: 'peer_listener',
    autoAssign: false,
  },
  moderate: {
    level: 'moderate',
    responseTime: '12 hours',
    actions: [
      {
        type: 'notify',
        target: 'peer_listener_queue',
        message: 'Student needs peer support - moderate concern',
        isMandatory: true,
      },
      {
        type: 'resource',
        resourceIds: ['grounding-exercises', 'breathing-techniques'],
        isMandatory: false,
      },
      {
        type: 'document',
        isMandatory: true,
      },
    ],
    requiredRole: 'peer_listener',
    autoAssign: true,
  },
  severe: {
    level: 'severe',
    responseTime: '2 hours',
    actions: [
      {
        type: 'notify',
        target: 'health_scholar_queue',
        message: 'URGENT: Student requires health scholar review',
        isMandatory: true,
      },
      {
        type: 'assign',
        target: 'available_health_scholar',
        isMandatory: true,
      },
      {
        type: 'resource',
        resourceIds: ['crisis-coping', 'emergency-contacts'],
        isMandatory: true,
      },
      {
        type: 'document',
        isMandatory: true,
      },
    ],
    requiredRole: 'health_scholar',
    autoAssign: true,
  },
  critical: {
    level: 'critical',
    responseTime: 'Immediate',
    actions: [
      {
        type: 'notify',
        target: 'counsellor_on_call',
        message: 'CRITICAL: Immediate intervention required',
        isMandatory: true,
      },
      {
        type: 'contact',
        message: 'Display emergency contacts and crisis hotlines',
        isMandatory: true,
      },
      {
        type: 'assign',
        target: 'on_call_counsellor',
        isMandatory: true,
      },
      {
        type: 'document',
        isMandatory: true,
      },
    ],
    requiredRole: 'counsellor',
    autoAssign: true,
  },
};

export const crisisKeywords: Record<string, string[]> = {
  'suicide-ideation': [
    'kill myself',
    'end it all',
    'want to die',
    'better off dead',
    'suicide',
    'take my life',
    'no reason to live',
    'wish i was dead',
  ],
  'self-harm': [
    'cut myself',
    'hurt myself',
    'self harm',
    'self-injury',
    'burn myself',
    'hit myself',
  ],
  'severe-depression': [
    'cant go on',
    'give up',
    'hopeless',
    'worthless',
    'burden',
    'empty inside',
    'numb',
  ],
  'panic-attack': [
    'cant breathe',
    'heart racing',
    'having a panic attack',
    'hyperventilating',
    'chest tight',
    'going to faint',
  ],
  'trauma': [
    'assaulted',
    'raped',
    'abused',
    'violated',
    'traumatic',
    'flashback',
  ],
};

export const protectiveFactors = [
  'family support',
  'friend network',
  'faith/spirituality',
  'academic goals',
  'future plans',
  'pet ownership',
  'creative outlets',
  'sports/fitness',
  'previous coping success',
  'help-seeking behavior',
];

export const groundingResources = [
  {
    id: 'breathing-478',
    name: '4-7-8 Breathing',
    description: 'Inhale for 4, hold for 7, exhale for 8',
    type: 'immediate',
  },
  {
    id: '54321-grounding',
    name: '5-4-3-2-1 Technique',
    description: 'Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste',
    type: 'immediate',
  },
  {
    id: 'safe-place-visualization',
    name: 'Safe Place Visualization',
    description: 'Imagine a place where you feel completely safe and calm',
    type: 'short',
  },
];
