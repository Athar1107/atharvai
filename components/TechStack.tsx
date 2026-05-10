'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { techStack } from '@/data';
import { 
  SiPython, SiTensorflow, SiPytorch, SiOpencv, 
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, 
  SiTailwindcss, SiMysql, SiGit, SiScikitlearn, 
  SiNumpy, SiPandas, SiLangchain,
  SiFigma, SiCanva, SiAffinity, SiDavinciresolve
} from 'react-icons/si';

const iconMap: Record<string, React.ReactElement> = {
  'Python': <SiPython className="text-[#3776AB]" />,
  'TensorFlow': <SiTensorflow className="text-[#FF6F00]" />,
  'PyTorch': <SiPytorch className="text-[#EE4C2C]" />,
  'OpenCV': <SiOpencv className="text-[#5C3EE8]" />,
  'HTML': <SiHtml5 className="text-[#E34F26]" />,
  'CSS': <SiCss className="text-[#1572B6]" />,
  'JavaScript': <SiJavascript className="text-[#F7DF1E]" />,
  'React': <SiReact className="text-[#61DAFB]" />,
  'Next.js': <SiNextdotjs className="text-white" />,
  'Tailwind CSS': <SiTailwindcss className="text-[#06B6D4]" />,
  'MySQL': <SiMysql className="text-[#4479A1]" />,
  'Git': <SiGit className="text-[#F05032]" />,
  'Scikit-learn': <SiScikitlearn className="text-[#F7931E]" />,
  'NumPy': <SiNumpy className="text-[#013243]" />,
  'Pandas': <SiPandas className="text-[#150458]" />,
  'LangChain': <SiLangchain className="text-slate-300" />,
  'Figma': <SiFigma className="text-[#F24E1E]" />,
  'Canva': <SiCanva className="text-[#00C4CC]" />,
  'Affinity': <SiAffinity className="text-[#8B98C2]" />,
  'DaVinci Resolve': <SiDavinciresolve className="text-slate-300" />,
};

const half = Math.ceil(techStack.length / 2);
const row1 = techStack.slice(0, half);
const row2 = techStack.slice(half);

function MarqueeRow({ items, reverse = false }: { items: typeof techStack; reverse?: boolean }) {
  const doubled = [...items, ...items]; // duplicate for seamless loop
  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020817] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020817] to-transparent z-10 pointer-events-none" />

      <div className={`flex gap-4 ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'}`}
        style={{ width: 'max-content' }}>
        {doubled.map((tech, i) => (
          <motion.div
            key={`${tech.name}-${i}`}
            whileHover={{ scale: 1.08, y: -3 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 px-5 py-3 rounded-xl glass border border-white/6
              hover:border-blue-500/30 hover:bg-blue-500/5 transition-colors duration-200
              cursor-default min-w-max group"
          >
            <span className="text-2xl">{iconMap[tech.name]}</span>
            <span className="text-sm font-medium text-slate-300 group-hover:text-blue-300 transition-colors">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="techstack" className="section-padding relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Tech Stack"
          title="Tools I Work With"
          subtitle="From AI frameworks to web technologies — here's my day-to-day toolkit."
        />
      </div>

      <div className="flex flex-col gap-5">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2.length >= 4 ? row2 : techStack} reverse />
      </div>

      {/* Category legend */}
      <div className="max-w-7xl mx-auto mt-12 flex flex-wrap justify-center gap-6">
        {[
          { label: 'AI / ML', color: 'bg-blue-500' },
          { label: 'Web', color: 'bg-cyan-500' },
          { label: 'Database', color: 'bg-emerald-500' },
          { label: 'Tools', color: 'bg-purple-500' },
        ].map((cat) => (
          <div key={cat.label} className="flex items-center gap-2 text-sm text-slate-400">
            <span className={`w-2 h-2 rounded-full ${cat.color}`} />
            {cat.label}
          </div>
        ))}
      </div>
    </section>
  );
}
