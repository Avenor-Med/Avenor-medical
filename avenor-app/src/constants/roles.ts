export const ROLES = [
  'practitioner',
  'recruiter',
  'cs',
  'facility',
  'admin',
] as const;

export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && (ROLES as readonly string[]).includes(value);
}

// Which roles may access which dashboard area. Enforced server-side in
// layouts and API handlers — the client is never trusted.
export const AREA_ACCESS: Record<string, Role[]> = {
  practitioner: ['practitioner'],
  recruiter: ['recruiter', 'admin'],
  cs: ['cs', 'admin'],
  facility: ['facility'],
  admin: ['admin'],
};

export function canAccess(area: string, role: Role): boolean {
  return AREA_ACCESS[area]?.includes(role) ?? false;
}
