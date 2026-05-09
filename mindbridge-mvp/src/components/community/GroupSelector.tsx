import { Group } from '@/types/community';
import { Button } from '@/components/ui/Button';

interface GroupSelectorProps {
  groups: Group[];
  selectedGroupId: string;
  onSelect: (groupId: string) => void;
}

export function GroupSelector({ groups, selectedGroupId, onSelect }: GroupSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {groups.map((group) => (
        <Button
          key={group.id}
          variant={selectedGroupId === group.id ? "default" : "outline"}
          className={`${
            selectedGroupId === group.id 
              ? 'bg-emerald-600 text-white' 
              : 'bg-white/80 text-gray-800'
          } backdrop-blur-sm`}
          onClick={() => onSelect(group.id)}
        >
          <span className="truncate text-xs">{group.name}</span>
          <span className="ml-1 text-xs opacity-75">({group.member_count})</span>
        </Button>
      ))}
    </div>
  );
}
