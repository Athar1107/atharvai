import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered-Student-Performance-Prediction-Model',
    description:
      'An AI-powered attendance tracking system using facial recognition and computer vision to automate student/employee check-ins in real time.',
    image: '/images/projects/attendance.jpg',
    tags: ['Python', 'OpenCV', 'Face Recognition', 'Computer Vision'],
    category: 'AI / ML',
    githubUrl: '#',
    liveUrl: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'AI Study Assistant',
    description:
      'A conversational AI assistant that helps students understand concepts, generate summaries, and create quizzes from uploaded study material.',
    image: '/images/projects/study-assistant.jpg',
    tags: ['NLP', 'LangChain', 'OpenAI', 'Python'],
    category: 'NLP + AI',
    githubUrl: '#',
    liveUrl: '#',
    featured: true,
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description:
      'A premium futuristic developer portfolio built with Next.js 15, Framer Motion, and React Three Fiber — the site you are viewing right now.',
    image: '/images/projects/portfolio.jpg',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'Three.js'],
    category: 'Web Development',
    githubUrl: '#',
    liveUrl: '#',
    featured: true,
  },
  {
    id: '4',
    title: 'Image Classifier CNN',
    description:
      'A deep learning image classification model built from scratch using CNNs, trained on custom datasets with high accuracy and real-time inference.',
    image: '/images/projects/cnn.jpg',
    tags: ['PyTorch', 'CNN', 'Deep Learning', 'Python'],
    category: 'Deep Learning',
    githubUrl: '#',
    liveUrl: '#',
    featured: true,
  },
];
