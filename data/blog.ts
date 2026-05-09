import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Agentic AI: Building Autonomous Systems',
    excerpt:
      'Explore how agentic AI frameworks like AutoGen and LangGraph enable you to build AI systems that plan, reason, and act autonomously.',
    image: '/images/blog/agentic-ai.jpg',
    readTime: '8 min read',
    tags: ['Agentic AI', 'LangChain', 'Automation'],
    url: '#',
    date: 'Apr 2025',
  },
  {
    id: '2',
    title: 'Deep Learning with PyTorch: From Tensors to CNNs',
    excerpt:
      'A beginner-friendly deep dive into PyTorch fundamentals — understanding tensors, autograd, and building your first CNN from scratch.',
    image: '/images/blog/pytorch.jpg',
    readTime: '12 min read',
    tags: ['PyTorch', 'Deep Learning', 'CNN'],
    url: '#',
    date: 'Mar 2025',
  },
  {
    id: '3',
    title: 'MLOps for Beginners: Deploying ML Models at Scale',
    excerpt:
      'Learn how to take your ML models from notebook to production using MLflow, Docker, and CI/CD pipelines.',
    image: '/images/blog/mlops.jpg',
    readTime: '10 min read',
    tags: ['MLOps', 'Docker', 'Deployment'],
    url: '#',
    date: 'Feb 2025',
  },
];
