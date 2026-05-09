import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ChatBoxProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatBox({ onSendMessage, isLoading }: ChatBoxProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !message.trim()}
        className="bg-emerald-600 hover:bg-emerald-700"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
