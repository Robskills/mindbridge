import { Phone, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface CrisisResource {
  name: string;
  phone: string;
  description: string;
  icon: typeof Phone;
}

interface CrisisResourcesProps {
  resources: CrisisResource[];
  onCall: (phone: string) => void;
}

export function CrisisResources({ resources, onCall }: CrisisResourcesProps) {
  return (
    <div className="space-y-3">
      {resources.map((resource, index) => (
        <Card key={index} className="p-4 flex items-center space-x-4 bg-white/90 backdrop-blur-sm">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <resource.icon className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 text-sm">{resource.name}</h3>
            <p className="text-xs text-gray-600 mb-1">{resource.description}</p>
            <p className="text-sm font-medium text-red-600">{resource.phone}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="border-red-300 text-red-700 hover:bg-red-50 flex-shrink-0 h-auto py-1 px-3 text-xs"
            onClick={() => onCall(resource.phone)}
          >
            Call
          </Button>
        </Card>
      ))}
    </div>
  );
}
