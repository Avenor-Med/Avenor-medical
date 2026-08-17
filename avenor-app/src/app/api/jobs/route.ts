import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/services/supabase/server';

const QuerySchema = z.object({
  state: z.string().length(2).optional(),
  specialty: z.string().max(80).optional(),
  profession: z.string().max(40).optional(),
  page: z.coerce.number().int().min(1).default(1),
  per: z.coerce.number().int().min(1).max(50).default(20),
});

export async function GET(request: NextRequest) {
  const parsed = QuerySchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }

  const { state, specialty, profession, page, per } = parsed.data;
  const supabase = await supabaseServer();

  let query = supabase
    .from('jobs')
    .select(
      'id, title, profession, specialty, city, state, shift_type, hours_per_week, duration_weeks, rate_usd, job_type, visa_support, signing_bonus_usd, posted_at, facilities(name)',
      { count: 'exact' },
    )
    .eq('status', 'open')
    .is('deleted_at', null)
    .order('posted_at', { ascending: false, nullsFirst: false })
    .range((page - 1) * per, page * per - 1);

  if (state) query = query.eq('state', state);
  if (specialty) query = query.eq('specialty', specialty);
  if (profession) query = query.eq('profession', profession);

  const { data, count, error } = await query;
  if (error) {
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }

  return NextResponse.json({
    jobs: data,
    page,
    per,
    total: count ?? 0,
    pages: Math.ceil((count ?? 0) / per),
  });
}
