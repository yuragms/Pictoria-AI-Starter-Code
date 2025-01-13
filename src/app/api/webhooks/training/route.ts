import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('Webhok is working', req);
  try {
    const body = await req.json();
    console.log('Webhook is working fine', body);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log('WEbhook processing error:', error);
    return new NextResponse('Intternal server error', { status: 500 });
  }
}
