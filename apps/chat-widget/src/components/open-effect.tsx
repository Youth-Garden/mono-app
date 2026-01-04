import { PropsWithChildren } from 'preact/compat';
import { cn } from '../lib';

export type OpenEffectType = 'grow' | 'fade' | 'slide';

interface OpenEffectProps extends PropsWithChildren {
  className?: string;
  effect?: OpenEffectType;
}

export function OpenEffect({
  children,
  className,
  effect = 'grow',
}: OpenEffectProps) {
  const animationClass = cn(
    effect === 'grow' && 'chat-animate-grow chat-origin-bottom-right',
    effect === 'fade' && 'chat-animate-fade-in',
    effect === 'slide' && 'chat-animate-slide-up'
  );

  return <div className={cn(className, animationClass)}>{children}</div>;
}
