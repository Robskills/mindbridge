import { useState, useEffect } from 'react';
import { MoodEntry, PHQ2Response, PHQ9Response } from '@/types/mood';

export function useMoodTracking(userId: string) {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [phq2Responses, setPhq2Responses] = useState<PHQ2Response[]>([]);
  const [phq9Responses, setPhq9Responses] = useState<PHQ9Response[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load mood data from localStorage
    loadMoodData();
  }, [userId]);

  const loadMoodData = () => {
    try {
      const storedEntries = localStorage.getItem(`mood_entries_${userId}`);
      const storedPhq2 = localStorage.getItem(`phq2_responses_${userId}`);
      const storedPhq9 = localStorage.getItem(`phq9_responses_${userId}`);

      if (storedEntries) setMoodEntries(JSON.parse(storedEntries));
      if (storedPhq2) setPhq2Responses(JSON.parse(storedPhq2));
      if (storedPhq9) setPhq9Responses(JSON.parse(storedPhq9));
    } catch (err) {
      setError('Failed to load mood data');
    }
  };

  const saveMoodData = () => {
    try {
      localStorage.setItem(`mood_entries_${userId}`, JSON.stringify(moodEntries));
      localStorage.setItem(`phq2_responses_${userId}`, JSON.stringify(phq2Responses));
      localStorage.setItem(`phq9_responses_${userId}`, JSON.stringify(phq9Responses));
    } catch (err) {
      setError('Failed to save mood data');
    }
  };

  const addMoodEntry = (entry: Omit<MoodEntry, 'id' | 'timestamp'>) => {
    setLoading(true);
    try {
      const newEntry: MoodEntry = {
        id: `mood_${Date.now()}`,
        ...entry,
        timestamp: new Date().toISOString(),
      };
      
      setMoodEntries(prev => [newEntry, ...prev]);
      saveMoodData();
    } catch (err) {
      setError('Failed to add mood entry');
    } finally {
      setLoading(false);
    }
  };

  const addPHQ2Response = (response: Omit<PHQ2Response, 'id' | 'timestamp'>) => {
    setLoading(true);
    try {
      const newResponse: PHQ2Response = {
        id: `phq2_${Date.now()}`,
        ...response,
        timestamp: new Date().toISOString(),
      };
      
      setPhq2Responses(prev => [newResponse, ...prev]);
      saveMoodData();
    } catch (err) {
      setError('Failed to add PHQ-2 response');
    } finally {
      setLoading(false);
    }
  };

  const addPHQ9Response = (response: Omit<PHQ9Response, 'id' | 'timestamp'>) => {
    setLoading(true);
    try {
      const newResponse: PHQ9Response = {
        id: `phq9_${Date.now()}`,
        ...response,
        timestamp: new Date().toISOString(),
      };
      
      setPhq9Responses(prev => [newResponse, ...prev]);
      saveMoodData();
    } catch (err) {
      setError('Failed to add PHQ-9 response');
    } finally {
      setLoading(false);
    }
  };

  const getMoodHistory = (days: number = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return moodEntries.filter(entry => 
      new Date(entry.timestamp) >= cutoffDate
    ).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  return {
    moodEntries,
    phq2Responses,
    phq9Responses,
    loading,
    error,
    addMoodEntry,
    addPHQ2Response,
    addPHQ9Response,
    getMoodHistory,
  };
}
