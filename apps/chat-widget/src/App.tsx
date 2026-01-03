import clsx from 'clsx';
import { ChatBubble } from './components/chat-bubble';
import { ChatWindow } from './components/chat-window';
import './service'; // Init service listeners
import { isOpen, theme } from './store';

export function App() {
  return (
    <div
      className={clsx(
        'chat-font-sans chat-antialiased',
        theme.value === 'dark' && 'dark'
      )}
    >
      {isOpen.value && <ChatWindow />}
      <ChatBubble />
    </div>
  );
}
