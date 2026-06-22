import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set('ezee_vendor_session', 'true', {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    // No maxAge = session cookie (cleared when browser closes)
  });
  return response;
}
