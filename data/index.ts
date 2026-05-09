import { TechItem, Stat, NavLink, SocialLink, ExploringItem, Inspirator } from '@/types';

export const techStack: TechItem[] = [
  { name: 'Python', icon: '🐍', category: 'ai' },
  { name: 'TensorFlow', icon: '🧠', category: 'ai' },
  { name: 'PyTorch', icon: '🔥', category: 'ai' },
  { name: 'OpenCV', icon: '👁️', category: 'ai' },
  { name: 'HTML', icon: '🌐', category: 'web' },
  { name: 'CSS', icon: '🎨', category: 'web' },
  { name: 'JavaScript', icon: '⚡', category: 'web' },
  { name: 'React', icon: '⚛️', category: 'web' },
  { name: 'Next.js', icon: '▲', category: 'web' },
  { name: 'Tailwind CSS', icon: '💨', category: 'web' },
  { name: 'MySQL', icon: '🗄️', category: 'database' },
  { name: 'Git', icon: '🔀', category: 'tool' },
  { name: 'Scikit-learn', icon: '📊', category: 'ai' },
  { name: 'NumPy', icon: '🔢', category: 'ai' },
  { name: 'Pandas', icon: '🐼', category: 'ai' },
  { name: 'LangChain', icon: '🔗', category: 'ai' },
];

export const stats: Stat[] = [
  { label: 'Projects Built', value: 10, suffix: '+', icon: '🚀' },
  { label: 'Blog Posts', value: 25, suffix: '+', icon: '✍️' },
  { label: 'Events Organized', value: 15, suffix: '+', icon: '🎯' },
  { label: 'Achievements', value: 5, suffix: '+', icon: '🏆' },
];

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: '#', icon: 'github' },
  { platform: 'LinkedIn', url: '#', icon: 'linkedin' },
  { platform: 'Gmail', url: 'mailto:placeholder@gmail.com', icon: 'mail' },
  { platform: 'Instagram', url: '#', icon: 'instagram' },
];

export const exploringItems: ExploringItem[] = [
  { label: 'Deep Learning & CNNs', icon: '🧠', color: 'from-blue-500/20 to-cyan-500/20' },
  { label: 'Agentic AI', icon: '🤖', color: 'from-purple-500/20 to-pink-500/20' },
  { label: 'MLOps', icon: '⚙️', color: 'from-emerald-500/20 to-teal-500/20' },
  { label: 'AI Automation', icon: '⚡', color: 'from-orange-500/20 to-amber-500/20' },
];

export const inspirators: Inspirator[] = [
  { handle: '@karpathy', url: 'https://twitter.com/karpathy' },
  { handle: '@AndrewYNg', url: 'https://twitter.com/AndrewYNg' },
  { handle: '@sentdex', url: 'https://twitter.com/sentdex' },
  { handle: '@veritasium', url: 'https://twitter.com/veritasium' },
  { handle: '@TensorFlow', url: 'https://twitter.com/TensorFlow' },
  { handle: '@OpenAI', url: 'https://twitter.com/OpenAI' },
  { handle: '@codebasics', url: 'https://twitter.com/codebasics' },
];
