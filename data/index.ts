import { TechItem, Stat, NavLink, SocialLink, ExploringItem, Inspirator } from '@/types';

export const techStack: TechItem[] = [
  { name: 'Python', category: 'ai' },
  { name: 'TensorFlow', category: 'ai' },
  { name: 'PyTorch', category: 'ai' },
  { name: 'OpenCV', category: 'ai' },
  { name: 'HTML', category: 'web' },
  { name: 'CSS', category: 'web' },
  { name: 'JavaScript', category: 'web' },
  { name: 'React', category: 'web' },
  { name: 'Next.js', category: 'web' },
  { name: 'Tailwind CSS', category: 'web' },
  { name: 'MySQL', category: 'database' },
  { name: 'Git', category: 'tool' },
  { name: 'Scikit-learn', category: 'ai' },
  { name: 'NumPy', category: 'ai' },
  { name: 'Pandas', category: 'ai' },
  { name: 'LangChain', category: 'ai' },
];

export const stats: Stat[] = [
  { label: 'Projects Built', value: 8, suffix: '+' },
  { label: 'Blog Posts', value: 1, suffix: '+' },
  { label: 'Achievements', value: 5, suffix: '+' },
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
  { platform: 'GitHub', url: 'https://github.com/Athar1107', icon: 'github', handle: 'github.com/Athar1107' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/atharv-ambekar-187160297/', icon: 'linkedin', handle: 'linkedin.com/in/atharv-ambekar' },
  { platform: 'Gmail', url: 'mailto:atharvambekar1105@gmail.com', icon: 'mail', handle: 'atharvambekar1105@gmail.com' },
  { platform: 'Medium', url: 'https://medium.com/@atharvambekar1105', icon: 'medium', handle: '@atharvambekar1105' },
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
