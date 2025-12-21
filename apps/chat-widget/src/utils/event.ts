export interface AppEvents {
  // UI Actions (Triggered by Window API or Buttons)
  'chat:open': void;
  'chat:close': void;
  'chat:toggle': void;

  // Data Events (Triggered by Logic)
  'message:sent': { id: string; text: string; timestamp: Date };
  'message:received': { id: string; text: string; timestamp: Date };

  // System Events
  'config:updated': { theme?: string; userEmail?: string };
}
