'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MobileContainer } from '@/components/layout/MobileContainer';
import Link from 'next/link';
import { useRealtimePosts } from '@/hooks/useRealtimePosts';
import { GroupFeed } from '@/components/community/GroupFeed';

export default function GroupDetailPage() {
  const params = useParams();
  const groupId = params.groupId as string;
  const { posts, addPost, likePost, loading } = useRealtimePosts(groupId);

  // Mock group data - in production, fetch from API
  const group = {
    id: groupId,
    name: groupId === 'group_1' ? 'Study Stress Support' : 
          groupId === 'group_2' ? 'Financial Help Network' :
          groupId === 'group_3' ? 'Addiction Recovery' : 'Exam Anxiety',
    description: 'A safe space for students to share experiences and support each other',
    memberCount: 124,
    rules: [
      'Be respectful and supportive',
      'No judgment - we\'re all here to help',
      'Keep discussions confidential',
      'No spam or self-promotion'
    ]
  };

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
        >
          <Link href="/community" className="inline-flex items-center text-emerald-100 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Communities
          </Link>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{group.name}</h1>
                <p className="text-sm text-gray-600">{group.memberCount} members</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{group.description}</p>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Group Rules</h3>
              <ul className="space-y-1">
                {group.rules.map((rule, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-white mb-4">Recent Discussions</h2>
          <GroupFeed 
            posts={posts}
            onLike={likePost}
            onComment={(postId) => console.log('Comment on', postId)}
          />
        </motion.div>
      </MobileContainer>
    </div>
  );
}
