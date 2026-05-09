'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Slider } from '@/components/ui/Slider';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { PHQ2CheckIn } from '@/components/mood/PHQ2CheckIn';
import { PHQ9Flow } from '@/components/mood/PHQ9Flow';
import { MoodHistoryChart } from '@/components/mood/MoodHistoryChart';

export default function MoodPage() {
  const [moodScore, setMoodScore] = useState(5);
  const [description, setDescription] = useState('');
  const [showPHQ2, setShowPHQ2] = useState(false);
  const [showPHQ9, setShowPHQ9] = useState(false);

  const handleSave = () => {
    alert(`Mood saved: ${moodScore}/10`);
  };

  const handlePHQ2Complete = (score: number) => {
    console.log('PHQ-2 Score:', score);
    setShowPHQ2(false);
    if (score >= 3) {
      setShowPHQ9(true);
    } else {
      alert('Thanks for checking in! Your mood seems okay.');
    }
  };

  const handlePHQ9Complete = (scores: number[]) => {
    console.log('PHQ-9 Scores:', scores);
    setShowPHQ9(false);
    alert('Thank you for completing the assessment. We\'ll track your progress.');
  };

  // Mock mood history data
  const moodHistory = [
    { date: 'Mon', mood: 6 },
    { date: 'Tue', mood: 7 },
    { date: 'Wed', mood: 5 },
    { date: 'Thu', mood: 8 },
    { date: 'Fri', mood: 6 },
    { date: 'Sat', mood: 7 },
    { date: 'Sun', mood: moodScore },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/mood-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      </div>

      <MobileContainer className="relative z-10 pt-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-white flex items-center">
            <HeartPulse className="w-6 h-6 mr-2 text-pink-400" />
            How Are You Feeling?
          </h1>
          <p className="text-emerald-100">Track your emotional well-being</p>
        </motion.div>

        <Card className="bg-white/90 backdrop-blur-sm p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">
              {moodScore <= 3 && '😔'}
              {moodScore >= 4 && moodScore <= 6 && '😐'}
              {moodScore >= 7 && '😊'}
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {moodScore}/10
            </p>
            <p className="text-gray-600">
              {moodScore <= 3 && 'Feeling down'}
              {moodScore >= 4 && moodScore <= 6 && 'Managing okay'}
              {moodScore >= 7 && 'Feeling good!'}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How would you describe your mood today?
            </label>
            <Slider
              value={[moodScore]}
              onValueChange={(value) => setMoodScore(value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Very Low</span>
              <span>Neutral</span>
              <span>Very High</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's contributing to your mood? (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Exams, relationships, family, etc..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
            />
          </div>

          <Button 
            onClick={handleSave}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mb-4"
          >
            Save Mood
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPHQ2(true)}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              Quick Check-in
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPHQ9(true)}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              Full Assessment
            </Button>
          </div>
        </Card>

        {showPHQ2 && (
          <Card className="bg-white/90 backdrop-blur-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Check-in (PHQ-2)</h3>
            <PHQ2CheckIn onComplete={handlePHQ2Complete} />
            <Button
              variant="outline"
              onClick={() => setShowPHQ2(false)}
              className="w-full mt-4"
            >
              Cancel
            </Button>
          </Card>
        )}

        {showPHQ9 && (
          <Card className="bg-white/90 backdrop-blur-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Full Assessment (PHQ-9)</h3>
            <PHQ9Flow onComplete={handlePHQ9Complete} />
          </Card>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm p-4 text-center">
            <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-800">Weekly Trend</p>
            <p className="text-xs text-gray-600">+2.1 avg</p>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm p-4 text-center">
            <HeartPulse className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-800">Consistency</p>
            <p className="text-xs text-gray-600">7 days streak</p>
          </Card>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Your Mood History</h3>
          <MoodHistoryChart data={moodHistory} />
        </Card>
      </MobileContainer>
    </div>
  );
}
