/**
 * Organization Types
 * Team and Project related types/enums
 */

/**
 * Team member roles
 */
export enum TeamRole {
  OWNER = 'OWNER', // Full access, can delete team
  ADMIN = 'ADMIN', // Can manage members and projects
  MEMBER = 'MEMBER', // Can view and respond to conversations
}

/**
 * Project status
 */
export enum ProjectStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}
