import { supabaseAdmin } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_URL =
  //   process.env.SITE_URL ?? `https://dfef-194-53-197-67.ngrok-free.app`;
  process.env.SITE_URL ?? `https://4699-194-53-197-67.ngrok-free.app`;

export async function POST(request: NextRequest) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error('The replicate api token is not set!');
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const formData = await request.formData();
    const input = {
      fileKey: formData.get('fileKey') as string,
      modelName: formData.get('modelName') as string,
      gender: formData.get('gender') as string,
    };
    // console.log(input);
    if (!input.fileKey || !input.modelName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    const fileName = input.fileKey.replace('training_data/', '');
    const { data: fileUrl } = await supabaseAdmin.storage
      .from('training_data')
      .createSignedUrl(fileName, 3600);
    if (!fileUrl?.signedUrl) {
      throw new Error('Failed to get the file URL');
    }
    // console.log(fileUrl);
    // const hardware = await replicate.hardware.list();

    // console.log(hardware);

    //create model first
    const modelId = `${user.id}_${Date.now()}_${input.modelName
      .toLocaleLowerCase()
      .replaceAll(' ', '_')}`;
    await replicate.models.create('yuragms', modelId, {
      visibility: 'private',
      hardware: 'gpu-a100-large',
    });

    // start training
    const training = await replicate.trainings.create(
      'ostris',
      'flux-dev-lora-trainer',
      'e440909d3512c31646ee2e0c7d6f6f4923224863a6a10c494606e79fb5844497',
      {
        // You need to create a model on Replicate that will be the destination for the trained version.
        destination: `yuragms/${modelId}`,
        input: {
          steps: 1000,
          resolution: '1024',
          input_images: fileUrl.signedUrl,
          trigger_word: 'ohwx',
        },
        webhook: `${WEBHOOK_URL}/api/webhooks/training?userId=${
          user.id
        }&modelName=${encodeURIComponent(
          input.modelName
        )}&fileName=${encodeURIComponent(fileName)}`,
        webhook_events_filter: ['completed'], // optional
      }
    );
    // console.log(training);

    //add model values in the supabase
    await supabaseAdmin.from('models').insert({
      model_id: modelId,
      user_id: user.id,
      model_name: input.modelName,
      gender: input.gender,
      training_status: training.status,
      trigger_word: 'ohwx',
      training_steps: 1000,
      training_id: training.id,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Training Error: ', error);

    const errorMeessage =
      error instanceof Error
        ? error.message
        : 'Failed to start the model training';
    return NextResponse.json({ error: errorMeessage }, { status: 500 });
  }
}
