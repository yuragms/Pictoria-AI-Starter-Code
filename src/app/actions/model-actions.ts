'use server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function getPresignedStorageUrl(filePath: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: urlData, error } = await supabaseAdmin.storage
    .from('training_data')
    .createSignedUploadUrl(`${user?.id}/${new Date().getTime()}_${filePath}`);

  return {
    signedUrl: urlData?.signedUrl || '',
    error: error?.message || null,
  };
}

export async function fetchModels() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error, count } = await supabase
    .from('models')
    .select('*', { count: 'exact' })
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  return {
    error: error?.message || null,
    success: !error,
    data: data || null,
    count: count || 0,
  };
}
