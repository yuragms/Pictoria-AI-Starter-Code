'use server';
import { z } from 'zod';
import { ImageGenerationFormSchema } from '@/components/image-generation/Configurations';
import Replicate from 'replicate';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@datatypes.types';
import { imageMeta } from 'image-meta';
import { randomUUID } from 'crypto';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  useFileOutput: false,
});

interface ImageResponse {
  error: string | null;
  success: boolean;
  data: any | null;
}

export async function generateImageAction(
  input: z.infer<typeof ImageGenerationFormSchema>
): Promise<ImageResponse> {
  const modelInput = {
    prompt: input.prompt,
    go_fast: true,
    guidance: input.guidance,
    num_outputs: input.num_outputs,
    aspect_ratio: input.aspect_ratio,
    output_format: input.output_format,
    output_quality: input.output_quality,
    prompt_strength: 0.8,
    num_inference_steps: input.num_inference_steps,
  };

  try {
    const output = await replicate.run(input.model as `${string}/${string}`, {
      input: modelInput,
    });
    console.log('Output', output);
    return {
      error: null,
      success: true,
      data: output,
    };
  } catch (error: any) {
    return {
      error: error.message || 'Failed to generate image',
      success: false,
      data: null,
    };
  }
}

export async function imgUrlToBlob(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob.arrayBuffer();
  //  return (await blob).arrayBuffer();
}

type storeImageInput = {
  url: string;
} & Database['public']['Tables']['generated_images']['Insert'];

export async function storeImages(data: storeImageInput[]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: 'Unauthorized',
      success: false,
      data: null,
    };
  }
  const uploadResults = [];

  for (const img of data) {
    const arrayBufer = await imgUrlToBlob(img.url);
    const { width, height, type } = imageMeta(new Uint8Array(arrayBufer));

    const fileName = `image_${randomUUID()}.${type}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: storageError } = await supabase.storage
      .from('generated_images')
      .upload(filePath, arrayBufer, {
        contentType: `image/${type}`, // image/png or image/jp
        cacheControl: '3600',
        upsert: false,
      });
    if (storageError) {
      uploadResults.push({
        fileName,
        error: storageError.message,
        success: false,
        data: null,
      });
      continue;
    }
    const { data: dbData, error: dbError } = await supabase
      .from('generated_images')
      .insert([
        {
          user_id: user.id,
          model: img.model,
          prompt: img.prompt,
          aspect_ratio: img.aspect_ratio,
          guidance: img.guidance,
          num_inference_steps: img.num_inference_steps,
          output_format: img.output_format,
          image_name: fileName,
          width,
          height,
        },
      ])
      .select();

    if (dbError) {
      uploadResults.push({
        fileName,
        error: dbError.message,
        success: !dbError,
        data: dbData || null,
      });
    }
  }
  console.log('Upload Results', uploadResults);
  return {
    error: null,
    success: true,
    data: { results: uploadResults },
  };
}

export async function getImages(limit?: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: 'Unauthorized',
      success: false,
      data: null,
    };
  }
  let query = supabase
    .from('generated_images')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) {
    return {
      error: error.message || 'Failed to fetch images',
      success: false,
      data: null,
    };
  }
  const imageWithUrls = await Promise.all(
    data.map(
      async (
        image: Database['public']['Tables']['generated_images']['Row']
      ) => {
        const { data } = await supabase.storage
          .from('generated_images')
          .createSignedUrl(`$(user.id)/${image.image_name}`, 3600);
        return {
          ...image,
          url: data?.signedUrl,
        };
      }
    )
  );
  return {
    error: null,
    success: true,
    data: imageWithUrls || null,
  };
}
