import { useState, useEffect } from 'react';
import { User } from '@/types/user';

export function useAnonymousAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('mindbridge_user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        // If parsing fails, create a new anonymous user
        createAnonymousUser();
      }
    } else {
      createAnonymousUser();
    }
    
    setLoading(false);
  }, []);

  const createAnonymousUser = () => {
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      anonymous_id: `anon_${Math.random().toString(36).substr(2, 9)}`,
      display_name: `Student ${Math.floor(Math.random() * 900) + 100}`,
      avatar_url: '',
      created_at: new Date().toISOString(),
      preferences: {
        notifications_enabled: true,
        anonymous_mode: true,
        preferred_language: 'en',
        privacy_level: 'anonymous',
        crisis_alerts: true,
        community_visibility: 'all',
      },
    };
    
    localStorage.setItem('mindbridge_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const updateUserPreferences = (preferences: Partial<User['preferences']>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      preferences: { ...user.preferences, ...preferences }
    };
    
    localStorage.setItem('mindbridge_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return {
    user,
    loading,
    error,
    updateUserPreferences,
  };
}
