export const role = {
    ADMIN: 'admin',
    OWNER: 'owner',
    EMPLOYEE: 'employee',
} as const;

export type Role = (typeof role)[keyof typeof role];
