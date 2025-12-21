import { ChatBubble } from './components/ChatBubble';
import { ChatWindow } from './components/ChatWindow';
import { isOpen } from './store';

// This needs to be imported here for Vite to bundle it as a string
// so we can inject it into the Shadow DOM in main.tsx
import './style.css';

export function App() {
  return (
    // We use a define a container for our widget's font stack
    <div className="chat-font-sans chat-antialiased">
      {isOpen.value && <ChatWindow />}
      <ChatBubble />
    </div>
  );
}
