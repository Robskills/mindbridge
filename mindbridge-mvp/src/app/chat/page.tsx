'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useChatStream } from '@/hooks/useChatStream';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { TypingIndicator } from '@/components/chat/TypingIndicator';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const { messages, isLoading, sendMessage } = useChatStream('demo_conversation');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/chat-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      </div>

      <MobileContainer className="relative z-10 pt-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Heart className="w-6 h-6 mr-2 text-red-400" />
            Safe Space to Talk
          </h1>
          <p className="text-emerald-100">No judgment, just listening</p>
        </motion.div>

        <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-2">
          {messages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              content={msg.content}
              isOwn={msg.sender_type === 'user'}
              senderName={msg.sender_type === 'ai' ? 'AI Companion' : undefined}
              timestamp={new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
          ))}
          
          {isLoading && <TypingIndicator />}
        </div>

        <form onSubmit={handleSubmit} className="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-4">
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share how you're feeling..."
              className="flex-grow bg-white/90 backdrop-blur-sm border-emerald-200"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !message.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </MobileContainer>
    </div>
  );
}
