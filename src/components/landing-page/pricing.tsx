'use client';
import React, { useState } from 'react';
import AnimatedGradientText from '../ui/animated-gradient-text';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tables } from '@datatypes.types';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';

type Product = Tables<'products'>;
type Price = Tables<'prices'>;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PricingProps {
  products: ProductWithPrices[];
  mostPopularProduct?: string;
}

const Pricing = ({ products, mostPopularProduct = 'pro' }: PricingProps) => {
  const [billingInterval, setBillingInterval] = useState('month');
  console.log(products);
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
        <div className="flex justify-center items-center space-x-4 py-8">
          <Label htmlFor="pricing-switch" className="font-semibold text-base">
            Monthly
          </Label>
          <Switch
            id="pricing-switch"
            checked={billingInterval === 'year'}
            onCheckedChange={(checked) =>
              setBillingInterval(checked ? 'year' : 'month')
            }
          />
          <Label htmlFor="pricing-switch" className="font-semibold text-base">
            Yearly
          </Label>
        </div>
        <div className="grid grid-cols-3 place-items-center mx-auto gap-8">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );

            if (!price) return null;

            const priceString = new Intl.NumberFormat('en-Us', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);

            return (
              <div
                key={product.id}
                className={cn(
                  'border bg-background rounded-xl shadow-sm h-fit divide-y divide-border border-border',
                  product.name?.toLowerCase() ===
                    mostPopularProduct.toLowerCase()
                    ? 'border-primary bg-background drop-shadow-md scale-105'
                    : 'border-border'
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl leading-6 font-semibold text-foreground flex items-center justify-between">
                    {product.name}
                    {product.name?.toLowerCase() ===
                    mostPopularProduct.toLowerCase() ? (
                      <Badge className="border-border font-semibold">
                        Most Popular
                      </Badge>
                    ) : null}
                  </h2>
                  <p className="text-muted-foreground mt-4 text-sm">
                    {product.description}
                  </p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-foreground">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-muted-foreground">
                      /{billingInterval}
                    </span>
                  </p>
                  <Link href="/login?state=signup">
                    <Button
                      className="mt-8 w-full font-semibold"
                      variant={
                        product.name?.toLowerCase() ===
                        mostPopularProduct.toLocaleLowerCase()
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      Subscribe
                    </Button>
                  </Link>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="uppercase tracking-wide text-foreground font-medium text-sm">
                    What&apos;s included
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {Object.values(product.metadata || {}).map(
                      (feature, index) => {
                        if (feature) {
                          return (
                            <li key={index} className="flex space-x-3">
                              <Check className="w-5 h-5 text-primary" />
                              <span className="text-sm text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          );
                        }
                      }
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
