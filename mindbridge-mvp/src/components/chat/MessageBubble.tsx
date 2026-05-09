import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface MessageBubbleProps {
  content: string;
  isOwn: boolean;
  senderName?: string;
  timestamp?: string;
}

export function MessageBubble({ 
  content, 
  isOwn, 
  senderName, 
  timestamp 
}: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div className={cn(
        'max-w-xs p-3 rounded-lg',
        isOwn 
          ? 'bg-emerald-600 text-white ml-4' 
          : 'bg-white/90 backdrop-blur-sm text-gray-800 mr-4'
      )}>
        {!isOwn && senderName && (
          <p className="text-xs font-medium text-emerald-600 mb-1">{senderName}</p>
        )}
        <p className="text-sm">{content}</p>
        {timestamp && (
          <p className={`text-xs mt-1 ${isOwn ? 'text-emerald-100' : 'text-gray-500'}`}>
            {timestamp}
          </p>
        )}
      </div>
    </motion.div>
  );
}
