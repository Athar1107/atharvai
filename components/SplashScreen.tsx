'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = 'hidden';
    
    // Hide the splash screen after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'unset';
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1, backgroundColor: '#000000' }}
          animate={{ backgroundColor: '#020817' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 flex items-center justify-center opacity-50">
            <div className="w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative flex items-center justify-center scale-90 md:scale-100">
            {/* Outer spinning ring - clockwise */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[320px] h-[320px] rounded-full border border-blue-500/10 border-t-blue-500/60 border-b-cyan-400/60"
            />
            
            {/* Middle counter-spinning ring - dashed */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[280px] h-[280px] rounded-full border-[1.5px] border-dashed border-cyan-500/30 border-l-blue-400/70"
            />

            {/* Inner fast spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[220px] h-[220px] rounded-full border border-transparent border-r-blue-500/80 border-l-cyan-400/80 opacity-60"
            />

            {/* Inner pulsing glow reactor core */}
            <motion.div
              animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[150px] h-[150px] rounded-full bg-blue-500/20 blur-2xl"
            />

            {/* Logo in the center */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
              className="relative z-10 flex justify-center items-center"
            >
              <Image
                src="/Vector 19.png"
                alt="Logo"
                width={80}
                height={80}
                className="object-contain h-[55px] w-auto drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                priority
              />
            </motion.div>

            {/* HUD Scanning Line */}
            <motion.div
              animate={{ y: [-60, 60, -60] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[180px] h-[2px] bg-cyan-400 shadow-[0_0_12px_#22d3ee] z-20"
            />
            
            {/* Corner Crosshairs */}
            <div className="absolute w-[360px] h-[360px]">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/50" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/50" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500/50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500/50" />
            </div>
          </div>

          {/* System Initializing text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-20 flex flex-col items-center gap-3"
          >
            <div className="font-mono text-cyan-500/80 text-xs sm:text-sm tracking-[0.3em] uppercase">
              System Initializing
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ...
              </motion.span>
            </div>
            
            {/* Loading Bar */}
            <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
                className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
