import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: '1',
    role: 'Secretary',
    org: 'IEEE Student Branch',
    period: '2024 – Present',
    type: 'ieee',
    description: 'Leading the student technical community and organizing events.',
    bullets: [
      'Managed operations and communications for the branch',
      'Organized technical workshops, hackathons, and seminars',
      'Coordinated with IEEE chapters for inter-college collaboration',
      'Grew active student membership by 40%',
    ],
    icon: '⚡',
  },
  {
    id: '2',
    role: 'Community Builder',
    org: 'AI & Tech Community',
    period: '2023 – Present',
    type: 'community',
    description: 'Building and nurturing a community of AI enthusiasts and learners.',
    bullets: [
      'Founded and managed an online AI learning community',
      'Organized peer learning sessions and study groups',
      'Collaborated with experts to deliver mentorship sessions',
      'Created educational content reaching 500+ learners',
    ],
    icon: '🌐',
  },
  {
    id: '3',
    role: 'Technical Event Organizer',
    org: 'College Tech Fest',
    period: '2023 – 2024',
    type: 'event',
    description: 'Spearheaded technical events and competitions at college level.',
    bullets: [
      'Organized 15+ technical events including coding contests and AI showcases',
      'Managed a team of 20 student volunteers',
      'Coordinated with industry professionals as keynote speakers',
      'Achieved participation of 500+ students across events',
    ],
    icon: '🏆',
  },
  {
    id: '4',
    role: 'Technical Blogger',
    org: 'Independent Blog',
    period: '2022 – Present',
    type: 'blog',
    description: 'Writing accessible technical content on AI, ML, and software development.',
    bullets: [
      'Published 25+ articles on AI/ML concepts and tutorials',
      'Grew readership to 2000+ monthly readers',
      'Topics include Deep Learning, NLP, MLOps, and Python',
      'Active contributor to tech communities online',
    ],
    icon: '✍️',
  },
];
