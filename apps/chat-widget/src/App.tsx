import { ChatBubble } from './components/chat-bubble';
import { ChatWindow } from './components/chat-window';
import { ThemeProvider } from './providers/theme-provider';
import './service'; // Init service listeners
import { isOpen } from './store';

export function App() {
  return (
    <ThemeProvider>
      {isOpen.value && <ChatWindow />}
      <ChatBubble />
    </ThemeProvider>
  );
}
