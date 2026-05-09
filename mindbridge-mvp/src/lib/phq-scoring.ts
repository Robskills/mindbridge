export function calculatePHQ2Score(q1: number, q2: number): {
  total: number;
  riskLevel: 'low' | 'moderate' | 'high';
  followUpNeeded: boolean;
} {
  const total = q1 + q2;
  
  let riskLevel: 'low' | 'moderate' | 'high' = 'low';
  let followUpNeeded = false;
  
  if (total >= 3) {
    riskLevel = 'high';
    followUpNeeded = true;
  } else if (total >= 2) {
    riskLevel = 'moderate';
    followUpNeeded = true;
  }
  
  return {
    total,
    riskLevel,
    followUpNeeded,
  };
}

export function calculatePHQ9Score(scores: number[]): {
  total: number;
  severity: 'minimal' | 'mild' | 'moderate' | 'moderately_severe' | 'severe';
  recommendedAction: string;
} {
  const total = scores.reduce((sum, score) => sum + score, 0);
  
  let severity: 'minimal' | 'mild' | 'moderate' | 'moderately_severe' | 'severe' = 'minimal';
  let recommendedAction = 'Continue monitoring mood. Practice self-care.';
  
  if (total >= 20) {
    severity = 'severe';
    recommendedAction = 'Strongly recommend professional evaluation. Consider immediate support.';
  } else if (total >= 15) {
    severity = 'moderately_severe';
    recommendedAction = 'Recommend consultation with health scholar or counselor.';
  } else if (total >= 10) {
    severity = 'moderate';
    recommendedAction = 'Consider speaking with a peer listener or counselor.';
  } else if (total >= 5) {
    severity = 'mild';
    recommendedAction = 'Monitor mood changes. Practice stress management techniques.';
  }
  
  // Special consideration for question 9 (suicidal thoughts)
  if (scores[8] > 0) {
    recommendedAction = 'Important: Please consider reaching out to crisis support. You\'re not alone.';
  }
  
  return {
    total,
    severity,
    recommendedAction,
  };
}

export function interpretMoodScore(score: number): {
  label: string;
  emoji: string;
  suggestion: string;
} {
  if (score <= 3) {
    return {
      label: 'Feeling down',
      emoji: '😔',
      suggestion: 'It\'s okay to have tough days. Consider reaching out to someone you trust.',
    };
  } else if (score <= 6) {
    return {
      label: 'Managing okay',
      emoji: '😐',
      suggestion: 'You\'re doing your best. Keep practicing self-care.',
    };
  } else {
    return {
      label: 'Feeling good!',
      emoji: '😊',
      suggestion: 'Great to hear! Remember to stay connected with your support network.',
    };
  }
}

export function getMoodTrend(entries: { date: string; mood: number }[]): string {
  if (entries.length < 2) return 'insufficient_data';
  
  const recent = entries.slice(0, 3);
  const older = entries.slice(-3);
  
  const recentAvg = recent.reduce((sum, e) => sum + e.mood, 0) / recent.length;
  const olderAvg = older.reduce((sum, e) => sum + e.mood, 0) / older.length;
  
  const diff = recentAvg - olderAvg;
  
  if (diff > 1) return 'improving';
  if (diff < -1) return 'declining';
  return 'stable';
}
