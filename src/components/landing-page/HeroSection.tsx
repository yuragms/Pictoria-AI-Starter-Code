import React from 'react';
import AnimatedGradientText from '../ui/animated-gradient-text';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="w-full relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="relative w-fot mx-auto flex flex-col items-center justify-center space-y-4 text-center z-40 backdrop-blur-[2px]">
        {' '}
        <AnimatedGradientText className="text-sm font-medium">
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{' '}
          <span
            className={cn(
              `inline anime-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Try new flux model
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
        <h1 className="text-6xl font-extrabold tracking-tighter">
          Transform your photos with the power of AI
        </h1>
        <p className="mx-auto max-w-3xl text-xl mb-8">
          From LinkedIn headshots to Instagram influencer photos, Pictoria AI's
          state-of-the-art technology ensures you always look your best. Create,
          edit, and generate images effortlessly.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
