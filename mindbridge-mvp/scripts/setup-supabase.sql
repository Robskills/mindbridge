-- Supabase setup script for MindBridge MVP
-- This script initializes the database schema with Row Level Security

-- Enable Row Level Security on all tables
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.escalation_events ENABLE ROW LEVEL SECURITY;

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    anonymous_id TEXT UNIQUE,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE,
    preferences JSONB DEFAULT '{"notifications_enabled": true, "anonymous_mode": true, "preferred_language": "en", "privacy_level": "anonymous", "crisis_alerts": true, "community_visibility": "all"}'::jsonb
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    participants UUID[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    topic TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'escalated'))
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    sender_id UUID REFERENCES public.users(id),
    sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'ai', 'peer', 'health_scholar')),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE,
    sentiment_score NUMERIC,
    crisis_keywords TEXT[]
);

-- Create groups table
CREATE TABLE IF NOT EXISTS public.groups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    member_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_private BOOLEAN DEFAULT FALSE,
    admin_user_id UUID REFERENCES public.users(id),
    rules TEXT[] DEFAULT '{}'::text[],
    banner_image_url TEXT
);

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.users(id),
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    is_anonymous BOOLEAN DEFAULT FALSE,
    pinned BOOLEAN DEFAULT FALSE,
    deleted BOOLEAN DEFAULT FALSE
);

-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.users(id),
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    likes_count INTEGER DEFAULT 0,
    is_anonymous BOOLEAN DEFAULT FALSE,
    replies_count INTEGER DEFAULT 0
);

-- Create mood_entries table
CREATE TABLE IF NOT EXISTS public.mood_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 10),
    description TEXT,
    tags TEXT[] DEFAULT '{}'::text[],
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    location TEXT,
    weather TEXT,
    activity TEXT
);

-- Create escalation_events table
CREATE TABLE IF NOT EXISTS public.escalation_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id),
    rule_id TEXT NOT NULL,
    detected_content TEXT NOT NULL,
    risk_score NUMERIC NOT NULL,
    escalation_level INTEGER NOT NULL CHECK (escalation_level BETWEEN 0 AND 3),
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    handled_by UUID REFERENCES public.users(id),
    handled_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT,
    resolved BOOLEAN DEFAULT FALSE
);

-- Create group_members junction table
CREATE TABLE IF NOT EXISTS public.group_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_muted BOOLEAN DEFAULT FALSE,
    is_banned BOOLEAN DEFAULT FALSE,
    UNIQUE(group_id, user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON public.messages(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_posts_group_id ON public.posts(group_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_id ON public.mood_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_timestamp ON public.mood_entries(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_escalation_events_user_id ON public.escalation_events(user_id);
CREATE INDEX IF NOT EXISTS idx_escalation_events_resolved ON public.escalation_events(resolved);
CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON public.group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user_id ON public.group_members(user_id);

-- Row Level Security Policies

-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id OR anonymous_id IS NOT NULL);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Users can view messages in their conversations
CREATE POLICY "Users can view messages in their conversations" ON public.messages
    FOR SELECT USING (
        auth.uid() = sender_id OR 
        EXISTS (
            SELECT 1 FROM public.conversations c 
            WHERE c.id = conversation_id AND auth.uid() = ANY(c.participants)
        )
    );

-- Users can send messages
CREATE POLICY "Users can send messages" ON public.messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Users can view posts in groups they belong to (or public groups)
CREATE POLICY "Users can view posts" ON public.posts
    FOR SELECT USING (
        deleted = FALSE AND (
            is_anonymous = FALSE OR 
            EXISTS (
                SELECT 1 FROM public.group_members gm 
                WHERE gm.group_id = group_id AND gm.user_id = auth.uid()
            ) OR
            NOT EXISTS (
                SELECT 1 FROM public.groups g WHERE g.id = group_id AND g.is_private = TRUE
            )
        )
    );

-- Users can create posts in groups they belong to
CREATE POLICY "Users can create posts" ON public.posts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.group_members gm 
            WHERE gm.group_id = group_id AND gm.user_id = auth.uid()
        )
    );

-- Users can update their own posts
CREATE POLICY "Users can update their own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = author_id);

-- Users can view comments on posts they can see
CREATE POLICY "Users can view comments" ON public.comments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.posts p 
            WHERE p.id = post_id AND (
                p.is_anonymous = FALSE OR 
                EXISTS (
                    SELECT 1 FROM public.group_members gm, public.groups g
                    WHERE gm.group_id = g.id AND gm.user_id = auth.uid() AND g.id = p.group_id
                )
            )
        )
    );

-- Users can create comments
CREATE POLICY "Users can create comments" ON public.comments
    FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Users can view their own mood entries
CREATE POLICY "Users can view their own mood entries" ON public.mood_entries
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own mood entries
CREATE POLICY "Users can create mood entries" ON public.mood_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view their own escalation events
CREATE POLICY "Users can view their own escalation events" ON public.escalation_events
    FOR SELECT USING (auth.uid() = user_id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, anonymous_id, display_name)
  VALUES (
    NEW.id,
    'anon_' || substring(md5(random()::text), 1, 9),
    'Student ' || floor(random() * 900 + 100)::int
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on auth signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update conversation timestamp
CREATE OR REPLACE FUNCTION public.update_conversation_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations SET updated_at = NOW() WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update conversation timestamp on new message
CREATE TRIGGER on_message_insert
    AFTER INSERT ON public.messages
    FOR EACH ROW EXECUTE FUNCTION public.update_conversation_updated_at();

-- Insert default community groups
INSERT INTO public.groups (name, description, category, is_private, rules) VALUES
('Study Stress Support', 'A safe space to share exam anxiety, academic pressure, and study tips', 'Academic', FALSE, ARRAY['Be respectful and supportive', 'No judgment - we''re all in this together', 'Keep shared experiences confidential']),
('Financial Help Network', 'Support for students facing financial challenges, HELB stress, and budgeting tips', 'Financial', FALSE, ARRAY['No sharing of personal financial details', 'Focus on resources and support', 'Respect privacy and anonymity']),
('Addiction Recovery', 'Peer support for substance abuse recovery and healthy coping mechanisms', 'Health', TRUE, ARRAY['Absolute confidentiality required', 'No enabling behaviors', 'Celebrate milestones and progress', 'Professional guidance available']),
('Exam Anxiety', 'Managing test anxiety, performance pressure, and academic stress', 'Academic', FALSE, ARRAY['Share coping strategies', 'Encourage without pressure', 'Normalize seeking help']),
('Relationship Support', 'Navigating friendships, romantic relationships, and family dynamics', 'Social', FALSE, ARRAY['Respect diverse perspectives', 'No victim-blaming', 'Focus on healthy communication']),
('Cultural Adjustment', 'Support for students adjusting to university life away from home', 'Social', FALSE, ARRAY['Celebrate cultural diversity', 'Share experiences without comparison', 'Build inclusive community']);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

COMMENT ON TABLE public.users IS 'User profiles with anonymous support';
COMMENT ON TABLE public.conversations IS 'Chat conversations between users and AI';
COMMENT ON TABLE public.messages IS 'Individual messages in conversations';
COMMENT ON TABLE public.groups IS 'Community support groups';
COMMENT ON TABLE public.posts IS 'Posts within community groups';
COMMENT ON TABLE public.comments IS 'Comments on posts';
COMMENT ON TABLE public.mood_entries IS 'Daily mood tracking entries';
COMMENT ON TABLE public.escalation_events IS 'Crisis escalation events for safety monitoring';
