import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 2 }: AnimatedCounterProps) {
  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });
  
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}
