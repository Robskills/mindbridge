import { 
  Home, 
  MessageCircle, 
  Users, 
  BookOpen, 
  Heart, 
  AlertTriangle,
  Settings,
  HelpCircle
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  disabled?: boolean;
}

export const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
    description: 'Welcome back',
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageCircle,
    description: 'Talk to AI companion',
  },
  {
    title: 'Community',
    href: '/community',
    icon: Users,
    description: 'Find your group',
  },
  {
    title: 'Journal',
    href: '/journal',
    icon: BookOpen,
    description: 'Private thoughts',
  },
  {
    title: 'Mood Check',
    href: '/mood',
    icon: Heart,
    description: 'How are you doing?',
  },
];

export const bottomNavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageCircle,
  },
  {
    title: 'Community',
    href: '/community',
    icon: Users,
  },
  {
    title: 'Mood',
    href: '/mood',
    icon: Heart,
  },
  {
    title: 'Crisis',
    href: '/crisis',
    icon: AlertTriangle,
    className: 'text-red-500',
  },
];

export const utilityNavItems: NavItem[] = [
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    title: 'Help',
    href: '/help',
    icon: HelpCircle,
  },
  {
    title: 'Crisis Support',
    href: '/crisis',
    icon: AlertTriangle,
    className: 'text-red-500',
  },
];

export const communitySubNavItems: NavItem[] = [
  {
    title: 'All Groups',
    href: '/community',
    icon: Users,
  },
  {
    title: 'Financial Help',
    href: '/community?category=financial',
    icon: Users,
  },
  {
    title: 'Academic Support',
    href: '/community?category=academic',
    icon: Users,
  },
  {
    title: 'Addiction Recovery',
    href: '/community?category=addiction-recovery',
    icon: Users,
  },
  {
    title: 'Grief Support',
    href: '/community?category=grief',
    icon: Users,
  },
];
