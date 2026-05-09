'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { JournalEditor } from '@/components/journal/JournalEditor';
import { JournalEntry } from '@/components/journal/JournalEntry';
import { MoodTagSelector } from '@/components/journal/MoodTagSelector';

export default function JournalPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [entries, setEntries] = useState([
    { id: '1', content: 'Today was challenging with finals approaching...', date: new Date().toISOString() },
    { id: '2', content: 'Had a great study session with friends', date: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', content: 'Feeling overwhelmed but trying to stay positive', date: new Date(Date.now() - 172800000).toISOString() },
  ]);

  const handleSave = (content: string) => {
    const newEntry = {
      id: `entry_${Date.now()}`,
      content,
      date: new Date().toISOString(),
    };
    setEntries([newEntry, ...entries]);
    setIsEditing(false);
    setSelectedTags([]);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/journal-bg.jpg')" }}
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
            <BookOpen className="w-6 h-6 mr-2 text-purple-400" />
            Private Journal
          </h1>
          <p className="text-emerald-100">Your safe space to reflect</p>
        </motion.div>

        {!isEditing ? (
          <>
            <Button 
              onClick={() => setIsEditing(true)}
              className="w-full mb-6 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              New Entry
            </Button>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Entries</h3>
              {entries.map((entry) => (
                <JournalEntry
                  key={entry.id}
                  content={entry.content}
                  date={entry.date}
                  onClick={() => {}}
                />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm p-4 mb-4">
              <JournalEditor 
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
              />
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-3">How are you feeling?</h3>
              <MoodTagSelector 
                selectedTags={selectedTags}
                onTagSelect={handleTagSelect}
              />
            </Card>
          </motion.div>
        )}
      </MobileContainer>
    </div>
  );
}
