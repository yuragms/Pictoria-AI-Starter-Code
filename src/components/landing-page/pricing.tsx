import React from 'react';
import AnimatedGradientText from '../ui/animated-gradient-text';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

const Pricing = () => {
  return (
    <section className="w-full bg-muted flex flex-col items-center justify-center">
      <div className="w-full container mx-auto py-32 flex flex-col items-center justify-center space-y-8">
        {' '}
        <div className="text-center flex flex-col items-center justify-center">
          {' '}
          <AnimatedGradientText>
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Price
            </span>
          </AnimatedGradientText>
          <h1 className="mt-4 capitalize text-4xl font-bold">
            Chooes the plan that fits your needs
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl">
            Chooes an affordable plan that is packed with the best features for
            engaging your audience, creating customer loyalty and driving sales.
          </p>
        </div>
        <div>
          <Label>Monthly</Label>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
