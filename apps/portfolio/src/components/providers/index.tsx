import { DialogProvider } from './dialog-provider';
import SplashProvider from './splash-provider';
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SplashProvider>
      <DialogProvider>{children}</DialogProvider>
    </SplashProvider>
  );
};
