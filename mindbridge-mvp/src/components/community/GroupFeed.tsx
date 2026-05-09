import { Post } from '@/types/community';
import { PostCard } from '@/components/community/PostCard';

interface GroupFeedProps {
  posts: Post[];
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
}

export function GroupFeed({ posts, onLike, onComment }: GroupFeedProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 bg-white/80 backdrop-blur-sm rounded-lg">
        <p className="text-gray-600">No posts yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onComment={onComment}
        />
      ))}
    </div>
  );
}
