import { Phone } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface EmergencyContactProps {
  primaryContact: string;
  secondaryContact: string;
}

export function EmergencyContact({ primaryContact, secondaryContact }: EmergencyContactProps) {
  return (
    <Card className="bg-emerald-50/90 backdrop-blur-sm border-emerald-200 p-4 mb-6">
      <h3 className="font-semibold text-emerald-800 mb-3 flex items-center">
        <Phone className="w-4 h-4 mr-2" />
        Emergency Contacts
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-emerald-700">Primary Crisis Line:</span>
          <a 
            href={`tel:${primaryContact.replace(/[^0-9+]/g, '')}`}
            className="text-sm font-medium text-emerald-900 hover:text-emerald-600"
          >
            {primaryContact}
          </a>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-emerald-700">Secondary Support:</span>
          <a 
            href={`tel:${secondaryContact.replace(/[^0-9+]/g, '')}`}
            className="text-sm font-medium text-emerald-900 hover:text-emerald-600"
          >
            {secondaryContact}
          </a>
        </div>
      </div>
      <p className="text-xs text-emerald-600 mt-3">
        Available 24/7 for immediate support
      </p>
    </Card>
  );
}
