import { Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Group } from '@/types/community';

interface GroupCardProps {
  group: Group;
  onClick: () => void;
}

export function GroupCard({ group, onClick }: GroupCardProps) {
  return (
    <Card 
      className="p-4 cursor-pointer hover:bg-white/90 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">{group.name}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{group.description}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{group.category}</span>
            <span className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {group.member_count}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
