// Role IDs for different access levels
export const ROLES = {
  STAFF: '1376876672409669672',
  TRAINER: '1376876703808360559',
  DASHBOARD: '1377651835715846214',
} as const;

export type Role = keyof typeof ROLES;

export const hasRole = (userRoles: string[] | undefined, requiredRole: Role): boolean => {
  if (!userRoles) return false;
  const roleId = ROLES[requiredRole];
  return userRoles.includes(roleId);
};

export const getRequiredRoles = (pathname: string): Role[] => {
  if (pathname.startsWith('/staff') || pathname.startsWith('/applications/trainer')) {
    return ['STAFF'];
  }
  if (pathname.startsWith('/trainers')) {
    return ['TRAINER'];
  }
  if (pathname.startsWith('/dashboard')) {
    return ['DASHBOARD'];
  }
  return [];
};
