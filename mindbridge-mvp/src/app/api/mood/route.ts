import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, moodScore, description, tags } = await request.json();
    
    // Validate input
    if (!userId || !moodScore) {
      return NextResponse.json(
        { error: 'userId and moodScore are required' },
        { status: 400 }
      );
    }

    if (moodScore < 1 || moodScore > 10) {
      return NextResponse.json(
        { error: 'moodScore must be between 1 and 10' },
        { status: 400 }
      );
    }

    // In a real implementation:
    // 1. Save mood entry to database
    // 2. Check for concerning patterns (e.g., consistently low scores)
    // 3. Trigger supportive interventions if needed
    // 4. Update mood history
    
    const mockMoodEntry = {
      id: `mood_${Date.now()}`,
      user_id: userId,
      mood_score: moodScore,
      description: description || '',
      tags: tags || [],
      timestamp: new Date().toISOString(),
    };

    console.log('Mood entry saved:', mockMoodEntry);

    // Check for concerning patterns
    if (moodScore <= 3) {
      console.log('Low mood detected - consider supportive intervention');
      // Could trigger a gentle check-in message or resource suggestion
    }

    return NextResponse.json({
      success: true,
      data: mockMoodEntry,
    });
  } catch (error) {
    console.error('Mood API error:', error);
    return NextResponse.json(
      { error: 'Failed to save mood entry' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const days = searchParams.get('days') || '30';

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // In a real implementation, fetch mood history from database
    const mockHistory = {
      user_id: userId,
      days: parseInt(days),
      entries: [
        { date: '2024-01-01', mood: 6 },
        { date: '2024-01-02', mood: 7 },
        { date: '2024-01-03', mood: 5 },
        { date: '2024-01-04', mood: 8 },
        { date: '2024-01-05', mood: 6 },
      ],
      average_mood: 6.4,
      trend: 'stable',
    };

    return NextResponse.json(mockHistory);
  } catch (error) {
    console.error('Mood API GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mood history' },
      { status: 500 }
    );
  }
}
