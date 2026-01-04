import { ChatBubble, ChatWindow, ImageModal } from './components';
import { ThemeProvider } from './providers/theme-provider';

export function App() {
  return (
    <ThemeProvider>
      <ChatBubble />
      <ChatWindow />
      <ImageModal />
    </ThemeProvider>
  );
}
