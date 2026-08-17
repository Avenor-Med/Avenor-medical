import { NextResponse } from 'next/server';
import { supabaseServer } from '@/services/supabase/server';
import { audit } from '@/services/audit';

export async function POST(request: Request) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.auth.signOut();

  if (user) {
    await audit({ actorId: user.id, action: 'auth.signout' });
  }

  return NextResponse.redirect(new URL('/login', request.url), { status: 302 });
}
