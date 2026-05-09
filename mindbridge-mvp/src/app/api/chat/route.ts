import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, userId, conversationId } = await request.json();
    
    // Validate input
    if (!message || !userId) {
      return NextResponse.json(
        { error: 'Message and userId are required' },
        { status: 400 }
      );
    }

    // In a real implementation:
    // 1. Check for crisis keywords using escalation logic
    // 2. Call OpenRouter API with culturally calibrated prompts
    // 3. Stream response back to client
    
    // For demo purposes, return a mock response
    const mockResponse = {
      id: `resp_${Date.now()}`,
      content: `I understand you said: "${message}". I'm here to listen and support you. Can you tell me more about what's on your mind?`,
      sender_type: 'ai',
      timestamp: new Date().toISOString(),
      conversation_id: conversationId || `conv_${Date.now()}`,
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
