import { useEffect, useState } from 'react';

interface TickerProps {
  items: string[];
  intervalMs?: number;
  className?: string;
}

export function Ticker({ items, intervalMs = 5000, className }: TickerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, intervalMs]);

  if (items.length === 0) return null;

  return (
    <span key={index} className={`animate-fade-in ${className ?? ''}`}>
      {items[index]}
    </span>
  );
}
