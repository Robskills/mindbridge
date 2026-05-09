import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CrisisBannerProps {
  isVisible: boolean;
  onEmergencyContact: () => void;
}

export function CrisisBanner({ isVisible, onEmergencyContact }: CrisisBannerProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white z-50 p-4 shadow-lg">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium text-sm">Emergency Support Available</span>
        </div>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={onEmergencyContact}
          className="bg-white text-red-600 hover:bg-red-50 text-xs px-3 py-1 h-auto"
        >
          Contact Now
        </Button>
      </div>
    </div>
  );
}
