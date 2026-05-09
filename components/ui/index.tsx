'use client';

export { ScrollReveal } from './ScrollReveal';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = href ? 'a' : 'button';

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Comp
        {...(href ? { href } : {})}
        onClick={onClick}
        className={className}
      >
        {children}
      </Comp>
    </motion.div>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  animate?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  animate = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 30 } : {}}
      whileInView={animate ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass ${hover ? 'glass-hover' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-14 ${centered ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

interface NeonBadgeProps {
  children: ReactNode;
  className?: string;
}

export function NeonBadge({ children, className = '' }: NeonBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
        bg-blue-500/10 border border-blue-500/25 text-blue-300 ${className}`}
    >
      {children}
    </span>
  );
}
