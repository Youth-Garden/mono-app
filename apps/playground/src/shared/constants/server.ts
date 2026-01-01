/**
 * Server Configuration
 * Base URLs for different backend services
 */
export const ServerConfig = {
  /** Main API server */
  Main: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  /** Code execution service (Piston) */
  CodeRunner:
    process.env.NEXT_PUBLIC_CODE_RUNNER_URL || 'https://emkc.org/api/v2/piston',
} as const;

/** @deprecated Use ServerConfig.Main instead */
export const BASE_API = ServerConfig.Main;

/**
 * Centralized API Endpoints
 * All API paths should be defined here
 */
export enum ApiEndpoint {
  // Auth
  AuthLogin = '/auth/login',
  AuthRefresh = '/auth/refresh',
  AuthRegister = '/auth/register',
  AuthLogout = '/auth/logout',

  // Code Runner
  CodeExecute = '/execute',
  CodeRuntimes = '/runtimes',

  // Chat
  ChatMessages = '/messages',
  ChatConversations = '/messages/conversations',
  ChatProjects = '/projects',
}
