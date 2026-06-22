import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set('ezee_admin_session', 'true', {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
  });
  return response;
}
