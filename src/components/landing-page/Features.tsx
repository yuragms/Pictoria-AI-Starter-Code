import React from 'react';
import AnimatedGradientText from '../ui/animated-gradient-text';
import { cn } from '@/lib/utils';

const Features = () => {
  return (
    <section
      id="features"
      className="w-full bg-muted py-32 flex flex-col items-center justify-center"
    >
      <div className="container mx-auto grid grid-cols-2 gap-8 relative bg-muted">
        <div>
          <AnimatedGradientText className="text-sm font-medium">
            <span
              className={cn(
                `inline anime-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Features
            </span>
          </AnimatedGradientText>
        </div>
      </div>
    </section>
  );
};

export default Features;
