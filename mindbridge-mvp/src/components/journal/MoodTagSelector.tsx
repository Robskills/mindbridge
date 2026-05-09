import { Badge } from '@/components/ui/Badge';

interface MoodTagSelectorProps {
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const moodTags = [
  'Anxious', 'Happy', 'Sad', 'Excited', 'Tired', 
  'Stressed', 'Relaxed', 'Motivated', 'Overwhelmed', 'Hopeful'
];

export function MoodTagSelector({ selectedTags, onTagSelect }: MoodTagSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {moodTags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"}
          className={`${selectedTags.includes(tag) ? 'bg-emerald-600' : 'bg-white/80'} cursor-pointer`}
          onClick={() => onTagSelect(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
