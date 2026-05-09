'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useRealtimePosts } from '@/hooks/useRealtimePosts';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { GroupSelector } from '@/components/community/GroupSelector';
import { GroupFeed } from '@/components/community/GroupFeed';

const groups = [
  { id: 'group_1', name: 'Study Stress', description: 'Support for academic pressure', memberCount: 124, category: 'Academic' },
  { id: 'group_2', name: 'Financial Help', description: 'HELB & bursary support', memberCount: 89, category: 'Financial' },
  { id: 'group_3', name: 'Addiction Recovery', description: 'Peer support for recovery', memberCount: 67, category: 'Health' },
  { id: 'group_4', name: 'Exam Anxiety', description: 'Managing test stress', memberCount: 156, category: 'Academic' },
];

export default function CommunityPage() {
  const [selectedGroup, setSelectedGroup] = useState(groups[0].id);
  const { posts, addPost, likePost, loading } = useRealtimePosts(selectedGroup);

  const selectedGroupName = groups.find(g => g.id === selectedGroup)?.name || '';

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/community-bg.jpg')" }}
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
            <Users className="w-6 h-6 mr-2 text-blue-400" />
            Community
          </h1>
          <p className="text-emerald-100">Find your support network</p>
        </motion.div>

        <GroupSelector 
          groups={groups}
          selectedGroupId={selectedGroup}
          onSelect={setSelectedGroup}
        />

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white mb-4">{selectedGroupName}</h2>
          <GroupFeed 
            posts={posts}
            onLike={likePost}
            onComment={(postId) => console.log('Comment on', postId)}
          />
        </div>

        {/* New Post Button */}
        <div className="fixed bottom-20 right-4">
          <Button
            className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
            aria-label="New post"
            onClick={() => {
              const content = prompt('What would you like to share?');
              if (content) addPost(content, true);
            }}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </MobileContainer>
    </div>
  );
}
