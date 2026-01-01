/**
 * Chat Types
 * Message and Conversation related types/enums
 */

/**
 * Message sender types
 */
export enum MessageSender {
  USER = 'user',
  AGENT = 'agent',
  SYSTEM = 'system',
}

/**
 * Conversation status
 */
export enum ConversationStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
  PENDING = 'Pending',
}
