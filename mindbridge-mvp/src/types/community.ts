export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  category: GroupCategory;
  memberCount: number;
  isActive: boolean;
  isPrivate: boolean;
  createdAt: Date;
  moderators: string[];
  tags: string[];
  coverImageUrl?: string;
}

export type GroupCategory = 
  | 'support' 
  | 'academic' 
  | 'financial' 
  | 'addiction-recovery' 
  | 'grief' 
  | 'lgbtq' 
  | 'general';

export interface Post {
  id: string;
  groupId: string;
  authorId: string;
  authorDisplayName: string;
  isAnonymous: boolean;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  commentsCount: number;
  tags: string[];
  isPinned: boolean;
  isLocked: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorDisplayName: string;
  isAnonymous: boolean;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  parentId?: string;
}

export interface GroupMembership {
  userId: string;
  groupId: string;
  role: 'member' | 'moderator' | 'admin';
  joinedAt: Date;
  lastActiveAt?: Date;
  notificationsEnabled: boolean;
}
