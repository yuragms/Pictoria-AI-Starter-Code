import { getCredits } from '@/app/actions/credit-actions';
import PlanSummary from '@/components/billing/PlanSummary';
import Pricing from '@/components/billing/Pricing';

import { getProducts, getSubscription, getUser } from '@/lib/supabase/queries';
import { createClient } from '@/lib/supabase/server';

import { redirect } from 'next/navigation';
import React from 'react';

const BillingPage = async () => {
  const supabase = await createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase), //gets the currentlly authenicated users
    getProducts(supabase), //gets all the active products with their prices
    getSubscription(supabase),
  ]);
  // console.log('user', user);
  // console.log('products', products);
  // console.log('subscription', subscription);

  if (!user) {
    return redirect('/login');
  }

  const { data: credits } = await getCredits();
  return (
    <section className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Plans & Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>
      <div className="grid gap-10">
        <PlanSummary
          subscription={subscription}
          user={user}
          products={products || []}
          credits={credits}
        />
        {subscription.status === 'active' && (
          <Pricing
            user={user}
            products={products ?? []}
            subscription={subscription}
          />
        )}
      </div>
    </section>
  );
};

export default BillingPage;
