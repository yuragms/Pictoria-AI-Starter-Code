import { create } from 'zustand';
import { z } from 'zod';
import { ImageGenerationFormSchema } from '@/components/image-generation/Configurations';
import { generateImageAction, storeImages } from '@/app/actions/image-actions';

interface GenerateState {
  loading: boolean;
  images: Array<{ url: string }>;
  error: string | null;
  generateImage: (
    values: z.infer<typeof ImageGenerationFormSchema>
  ) => Promise<void>;
}

const useGeneratedStore = create<GenerateState>((set) => ({
  loading: false,
  images: [],
  error: null,
  generateImage: async (values: z.infer<typeof ImageGenerationFormSchema>) => {
    set({ loading: true, error: null });
    // const modelInput = {
    //     prompt: input.prompt,
    //     go_fast: true,
    //     guidance: input.guidance,
    //     num_outputs: input.num_outputs,
    //     aspect_ratio: input.aspect_ratio,
    //     output_format: input.output_format,
    //     output_quality: input.output_quality,
    //     prompt_strength: 0.8,
    //     num_inference_steps: input.num_inference_steps,
    // };

    try {
      const { error, success, data } = await generateImageAction(values);
      if (!success) {
        set({ error: error, loading: false });
        return;
      }
      const dataWithUrl = data.map((url: string) => {
        return { url, ...values };
      });
      set({ images: dataWithUrl, loading: false });
      await storeImages(dataWithUrl);
    } catch (error: any) {
      set({
        error: error.message || 'Failed to generate image. Please try again',
        loading: false,
      });
    }
  },
}));

export default useGeneratedStore;
