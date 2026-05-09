import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';

export function useChatStream(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Initialize with existing messages
    initializeMessages();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [conversationId]);

  const initializeMessages = async () => {
    try {
      // In a real implementation, fetch initial messages from API
      const initialMessages: Message[] = [
        {
          id: 'initial',
          content: 'Hello! I\'m here to listen. How are you feeling today?',
          sender_id: 'ai_assistant',
          sender_type: 'ai',
          timestamp: new Date().toISOString(),
          conversation_id: conversationId,
        }
      ];
      setMessages(initialMessages);
    } catch (err) {
      setError('Failed to load conversation history');
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Add user message immediately
      const userMessage: Message = {
        id: `msg_${Date.now()}`,
        content,
        sender_id: 'current_user',
        sender_type: 'user',
        timestamp: new Date().toISOString(),
        conversation_id: conversationId,
      };

      setMessages(prev => [...prev, userMessage]);

      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));

      const aiMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        content: `I hear you saying "${content}". That sounds challenging. Can you tell me more about what led you to feel this way?`,
        sender_id: 'ai_assistant',
        sender_type: 'ai',
        timestamp: new Date().toISOString(),
        conversation_id: conversationId,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const startStreaming = () => {
    // In a real implementation, establish SSE connection
    // eventSourceRef.current = new EventSource(`/api/chat/stream/${conversationId}`);
    
    // eventSourceRef.current.onmessage = (event) => {
    //   const newMessage = JSON.parse(event.data);
    //   setMessages(prev => [...prev, newMessage]);
    // };
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    startStreaming,
  };
}
