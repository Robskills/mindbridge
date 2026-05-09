import { Card } from '@/components/ui/Card';
import { formatTime } from '@/utils/formatTime';

interface JournalEntryProps {
  content: string;
  date: string;
  onClick: () => void;
}

export function JournalEntry({ content, date, onClick }: JournalEntryProps) {
  return (
    <Card 
      className="bg-white/80 backdrop-blur-sm p-3 cursor-pointer hover:bg-white/90 transition-colors"
      onClick={onClick}
    >
      <p className="text-sm text-gray-700 truncate">{content}</p>
      <p className="text-xs text-gray-500 mt-1">{formatTime(new Date(date))}</p>
    </Card>
  );
}
