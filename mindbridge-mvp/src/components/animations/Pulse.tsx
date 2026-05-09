import { motion } from 'framer-motion';

interface PulseProps {
  children: React.ReactNode;
  duration?: number;
}

export function Pulse({ children, duration = 2 }: PulseProps) {
  return (
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: [1, 0.7, 1]
      }}
      transition={{ 
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}
