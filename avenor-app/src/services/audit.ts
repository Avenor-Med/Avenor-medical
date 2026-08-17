import { supabaseAdmin } from '@/services/supabase/server';

// Fire-and-forget audit logging. Uses the service-role client so entries land
// even for actions the user's own RLS wouldn't permit them to write.
// The table is append-only: no update/delete policies exist.
export async function audit(entry: {
  actorId?: string | null;
  action: string;
  entity?: string;
  entityId?: string;
  detail?: Record<string, unknown>;
  ip?: string | null;
}) {
  try {
    const db = supabaseAdmin();
    await db.from('audit_log').insert({
      actor_id: entry.actorId ?? null,
      action: entry.action,
      entity: entry.entity ?? null,
      entity_id: entry.entityId ?? null,
      detail: entry.detail ?? null,
      ip: entry.ip ?? null,
    });
  } catch {
    // Audit failures must never break the user-facing request path.
    // Vercel logs capture the underlying error.
  }
}
