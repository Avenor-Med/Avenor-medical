import { supabaseServer } from '@/services/supabase/server';
import type { Role } from '@/constants/roles';

// Session and profile reads. Role always comes from the database, never from
// anything the client supplies.

export async function getCurrentUser() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('profiles')
    .select('id, role, full_name, phone')
    .eq('id', user.id)
    .single();

  return data ? { ...data, role: data.role as Role, email: user.email } : null;
}

export function dashboardPathForRole(role: Role): string {
  return `/dashboard/${role}`;
}
