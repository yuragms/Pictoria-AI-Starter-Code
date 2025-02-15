'use server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { Tables } from '@datatypes.types';

interface CreditResponse {
  error: null | string;
  success: boolean;
  data: Tables<'credits'> | null;
}
export async function getCredits(): Promise<CreditResponse> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('777777777777777777777');

  const { data: creditsData, error } = await supabase
    .from('credits')
    .select('*')
    .eq('user_id', user?.id)
    .single();

  if (error) {
    return {
      error: error?.message || null,
      success: false,
      data: null,
    };
  }

  console.log('creditsData', creditsData);

  return {
    error: null,
    success: true,
    data: creditsData,
  };
}
