import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Post } from '@/types/community';
import { Card } from '@/components/ui/Card';
import { formatTime } from '@/utils/formatTime';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
}

export function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm p-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
          <Heart className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-gray-800 text-sm">
              {post.author_display_name || 'Anonymous'}
            </span>
            <span className="text-xs text-gray-500">
              {formatTime(new Date(post.created_at))}
            </span>
          </div>
          <p className="text-gray-700 mb-3 break-words">{post.content}</p>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
              <span className="text-xs">{post.likes_count + (isLiked ? 1 : 0)}</span>
            </button>
            <button 
              onClick={() => onComment(post.id)}
              className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{post.comments_count}</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
