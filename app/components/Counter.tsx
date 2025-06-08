'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

type MotionCounterProps = {
  from?: number;
  to: number;
  duration?: number;
};

export default function MotionCounter({ from = 0, to, duration = 2 }: MotionCounterProps) {
  const count = useMotionValue(from);
  const [displayCount, setDisplayCount] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplayCount(Math.floor(latest));
      },
    });

    return controls.stop;
  }, [count, to, duration]);

  return (
    <motion.span className="text-5xl text-gray-900 font-bold">
      {displayCount}%
    </motion.span>
  );
}
