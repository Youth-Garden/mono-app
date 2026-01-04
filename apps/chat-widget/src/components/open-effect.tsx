import { clsx } from 'clsx';
import { PropsWithChildren } from 'preact/compat';

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
  const animationClass = clsx(
    effect === 'grow' && 'chat-animate-grow chat-origin-bottom-right',
    effect === 'fade' && 'chat-animate-fade-in',
    effect === 'slide' && 'chat-animate-slide-up'
  );

  return <div className={clsx(className, animationClass)}>{children}</div>;
}
