import { Tables } from '@datatypes.types';
import { User } from '@supabase/supabase-js';
import React from 'react';
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
type Subscription = Tables<'subscriptions'>;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PriceWithProduct extends Price {
  products: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}
interface PlanSummaryProps {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  products: ProductWithPrices[] | null;
}

const PlanSummary = ({ subscription, user, products }) => {
  return <div>PlanSummary</div>;
};

export default PlanSummary;
