import { redirect } from 'next/navigation';
import { supabaseServer } from '@/services/supabase/server';
import { canAccess, type Role } from '@/constants/roles';

// Server-side role guard used by every dashboard page. Reads the role from
// the database on each request — never from anything the client sends.
export async function requireRole(area: string) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/dashboard/${area}`);

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (!profile || !canAccess(area, profile.role as Role)) {
    redirect('/dashboard');
  }

  return { user, role: profile.role as Role, name: profile.full_name ?? '' , supabase };
}
