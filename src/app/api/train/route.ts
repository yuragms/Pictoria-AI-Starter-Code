import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

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
    console.log(input);
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
