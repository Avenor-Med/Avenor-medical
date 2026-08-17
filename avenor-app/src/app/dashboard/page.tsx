import { redirect } from 'next/navigation';
import { supabaseServer } from '@/services/supabase/server';

// Role router: sends each signed-in user to their area.
// Role comes from the profiles table (server-side), never from the client.
export default async function DashboardPage() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/login');

  switch (profile.role) {
    case 'practitioner':
      redirect('/dashboard/practitioner');
    case 'recruiter':
      redirect('/dashboard/recruiter');
    case 'cs':
      redirect('/dashboard/cs');
    case 'facility':
      redirect('/dashboard/facility');
    case 'admin':
      redirect('/dashboard/admin');
    default:
      redirect('/login');
  }
}
