export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  tags: string[];
  url: string;
  date: string;
}

export interface Experience {
  id: string;
  role: string;
  org: string;
  period: string;
  type: 'ieee' | 'community' | 'event' | 'blog';
  description: string;
  bullets: string[];
  icon: string;
}

export interface TechItem {
  name: string;
  icon?: string;
  category: 'ai' | 'web' | 'database' | 'tool';
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  handle: string;
}

export interface ExploringItem {
  label: string;
  icon: string;
  color: string;
}

export interface Inspirator {
  handle: string;
  url: string;
}
