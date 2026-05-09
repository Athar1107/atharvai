import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered-Student-Performance-Prediction-Model',
    description:
      'An AI-powered student performance prediction system that uses machine learning and data analysis to predict academic outcomes and identify student performance trends.',
    image: '/images/projects/student-prediction.png',
    tags: ['Python', 'AI', 'Scikit-learn', 'Data Analytics', 'Predictive Modeling'],
    category: 'Machine Learning',
    githubUrl: 'https://github.com/Athar1107/AI-Powered-Student-Performance-Prediction-Model',
    liveUrl: 'https://ai-powered-student-performance-dvju.onrender.com/',
    featured: true,
  },
  {
    id: '2',
    title: 'AI-powered driver drowsiness detection system',
    description:
      'An AI-powered driver drowsiness detection system that uses computer vision and real-time facial analysis to monitor driver alertness and prevent fatigue-related accidents.',
    image: '/images/projects/Drowsiness-Detection-System.png',
    tags: ['Computer Vision', 'OpenCV', 'Python','Drowsiness Detection', 'Real-time Analysis' ],
    category: 'Computer Vision',
    githubUrl: 'https://github.com/Athar1107/AI-Powered-Driver-Drowsiness-Detection-System',
    liveUrl: '#',
    featured: true,
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description:
      'An AI-inspired futuristic personal portfolio website showcasing projects, blogs, technical skills, and creative digital experiences through modern interactive design.',
    image: '/images/projects/portfolio.png',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'Three.js'],
    category: 'Web Development',
    githubUrl: 'https://github.com/Athar1107/atharvai',
    liveUrl: 'https://atharvai.vercel.app/',
    featured: true,
  },
  {
    id: '4',
    title: 'Twitter Sentiment Analysis',
    description:
      'A machine learning-based Twitter sentiment analysis system that analyzes tweets in real time to classify public sentiment and extract meaningful insights from social media data.',
    image: '/images/projects/twitter.png',
    tags: ['Python', 'NLP', 'Sentiment Analysis', 'Twitter API'],
    category: 'Natural Language Processing',
    githubUrl: 'https://github.com/Athar1107/twitter_sentiment_analysis',
    liveUrl: 'https://github.com/Athar1107/twitter_sentiment_analysis',
    featured: true,
  },
];
