import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-templates/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  console.log('Webhok is working', req);
  try {
    const body = await req.json();
    const url = new URL(req.url);

    const userId = url.searchParams.get('userId') ?? '';
    const modelName = url.searchParams.get('modelName') ?? '';
    const fileName = url.searchParams.get('fileName') ?? '';

    // To validate the webhook
    const id = req.headers.get('webhook-id') ?? '';
    const timestamp = req.headers.get('webhook-timestamp') ?? '';
    const webhookSignature = req.headers.get('webhook-signature') ?? '';

    const signedContent = `${id}.${timestamp}.${JSON.stringify(body)}`;
    const secret = await replicate.webhooks.default.secret.get();
    // Base64 decode the secret
    const secretBytes = Buffer.from(secret.key.split('_')[1], 'base64');
    const signature = crypto
      .createHmac('sha256', secretBytes)
      .update(signedContent)
      .digest('base64');
    console.log(signature);

    const expectedSignatures = webhookSignature
      .split(' ')
      .map((sig) => sig.split(',')[1]);
    const isValid = expectedSignatures.some(
      (expectedSignature) => expectedSignature === signature
    );
    if (!isValid) {
      return new NextResponse('Invalid signature', { status: 401 });
    }
    // get user data
    const { data: user, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    if (userError || !user) {
      return new NextResponse('User not found!', { status: 401 });
    }

    const userEmail = user.user.email ?? '';
    const userName = user.user.user_metadata.full_name ?? '';
    if (body.status === 'succeeded') {
      console.log('body-status-succeeded', body);
      // send a successful status email
      await resend.emails.send({
        from: 'Pectoria AI <admin@resend.dev>',
        to: [userEmail],
        subject: 'Model Training completed',
        react: EmailTemplate({
          userName,
          message: 'Your model training has been completed!',
        }),
      });

      //Update the supabase models table
      await supabaseAdmin
        .from('models')
        .update({
          training_status: body.status,
          training_time: body.metrics?.total_time ?? null,
          version: body.output?.version.split(':')[1] ?? null,
        })
        .eq('user_id', userId)
        .eq('model_name', modelName);

      //delete the training data from supabase storage
      // supabaseAdmin.storage
      //   .from('training_data')
      //   .remove([`${userId}/${fileName}`]);
    } else {
      console.log('body-status-nosucceeded', body);
      // handle the failed and the canceled status
      await resend.emails.send({
        from: 'Pectoria AI <admin@resend.dev>',
        to: [userEmail],
        subject: `Model Training ${body.status}`,
        react: EmailTemplate({
          userName,
          message: `Your model training has been ${body.status}!`,
        }),
      });

      //Update the supabase models table
      await supabaseAdmin
        .from('models')
        .update({
          training_status: body.status,
        })
        .eq('user_id', userId)
        .eq('model_name', modelName);
    }
    //delete the training data from supabase storage
    await supabaseAdmin.storage.from('training_data').remove([`${fileName}`]);
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.log('WEbhook processing error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
