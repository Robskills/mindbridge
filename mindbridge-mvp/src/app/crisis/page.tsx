'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Phone, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { CrisisBanner } from '@/components/crisis/CrisisBanner';
import { CrisisResources } from '@/components/crisis/CrisisResources';
import { EmergencyContact } from '@/components/crisis/EmergencyContact';

export default function CrisisPage() {
  const crisisResources = [
    {
      name: 'National Crisis Line',
      phone: '+254-700-000-000',
      description: '24/7 confidential support',
      icon: Phone,
    },
    {
      name: 'University Counseling',
      phone: '+254-111-222-333',
      description: 'On-campus counseling services',
      icon: Heart,
    },
    {
      name: 'Peer Support',
      phone: '+254-444-555-666',
      description: 'Trained peer listeners',
      icon: Users,
    },
  ];

  const handleEmergencyContact = () => {
    window.location.href = 'tel:+254700000000';
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/crisis-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      <CrisisBanner 
        isVisible={true}
        onEmergencyContact={handleEmergencyContact}
      />

      <MobileContainer className="relative z-10 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-white flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-red-400" />
            Crisis Support
          </h1>
          <p className="text-emerald-100">You are not alone. Help is available.</p>
        </motion.div>

        <Card className="bg-red-50/90 backdrop-blur-sm border-red-200 p-6 mb-6">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-800 mb-2">Immediate Help Available</h2>
            <p className="text-red-700">
              If you're experiencing thoughts of self-harm or suicide, please contact our crisis line immediately.
            </p>
            <Button 
              onClick={handleEmergencyContact}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Crisis Line Now
            </Button>
          </div>
        </Card>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Support Resources</h3>
          <CrisisResources 
            resources={crisisResources}
            onCall={(phone) => {
              window.location.href = `tel:${phone.replace(/[^0-9+]/g, '')}`;
            }}
          />
        </div>

        <EmergencyContact 
          primaryContact="+254-700-000-000"
          secondaryContact="+254-111-222-333"
        />

        <div className="bg-yellow-50/80 backdrop-blur-sm border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Remember:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Your life has value</li>
            <li>• This crisis will pass</li>
            <li>• There are people who care</li>
            <li>• Treatment works</li>
          </ul>
        </div>
      </MobileContainer>
    </div>
  );
}
