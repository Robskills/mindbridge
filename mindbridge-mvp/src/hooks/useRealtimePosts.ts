import { useState, useEffect, useRef } from 'react';
import { Post, Group } from '@/types/community';

export function useRealtimePosts(groupId: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Initialize with existing posts
    initializePosts();

    // Set up realtime connection
    setupRealtimeConnection();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [groupId]);

  const initializePosts = async () => {
    try {
      setLoading(true);
      // In a real implementation, fetch initial posts from API
      const initialPosts: Post[] = [
        {
          id: 'post_1',
          content: 'Feeling overwhelmed with finals approaching. Anyone else feeling this way?',
          author_id: 'user_1',
          group_id: groupId,
          created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          likes_count: 5,
          comments_count: 2,
          is_anonymous: true,
          author_display_name: 'Anonymous Student',
          pinned: false,
          deleted: false,
        },
        {
          id: 'post_2',
          content: 'Just wanted to share that it\'s okay to take breaks. Your mental health matters!',
          author_id: 'user_2',
          group_id: groupId,
          created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          likes_count: 12,
          comments_count: 3,
          is_anonymous: false,
          author_display_name: 'Sarah K.',
          pinned: true,
          deleted: false,
        }
      ];
      setPosts(initialPosts);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeConnection = () => {
    // In a real implementation, connect to Supabase realtime
    // eventSourceRef.current = new EventSource(`/api/posts/stream/${groupId}`);
    
    // eventSourceRef.current.onmessage = (event) => {
    //   const newPost = JSON.parse(event.data);
    //   setPosts(prev => [newPost, ...prev]);
    // };
  };

  const addPost = async (content: string, isAnonymous: boolean) => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      const newPost: Post = {
        id: `post_${Date.now()}`,
        content,
        author_id: 'current_user',
        group_id: groupId,
        created_at: new Date().toISOString(),
        likes_count: 0,
        comments_count: 0,
        is_anonymous,
        author_display_name: isAnonymous ? 'Anonymous' : 'You',
        pinned: false,
        deleted: false,
      };

      setPosts(prev => [newPost, ...prev]);
    } catch (err) {
      setError('Failed to add post');
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId: string) => {
    try {
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes_count: post.likes_count + 1 } 
          : post
      ));
    } catch (err) {
      setError('Failed to like post');
    }
  };

  return {
    posts,
    loading,
    error,
    addPost,
    likePost,
  };
}
