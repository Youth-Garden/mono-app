import { clsx } from 'clsx';
import { ComponentChildren } from 'preact';
import { ButtonHTMLAttributes } from 'preact/compat';

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ComponentChildren;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    'chat-bg-widget-primary chat-text-white hover:chat-opacity-90 chat-shadow-sm',
  destructive:
    'chat-bg-red-500 chat-text-white hover:chat-bg-red-600 chat-shadow-sm',
  outline:
    'chat-border chat-border-widget-border chat-bg-transparent hover:chat-bg-widget-card chat-text-widget-text',
  secondary:
    'chat-bg-widget-card chat-text-widget-text hover:chat-bg-widget-border',
  ghost:
    'chat-bg-transparent hover:chat-bg-widget-card chat-text-widget-muted hover:chat-text-widget-text',
  link: 'chat-bg-transparent chat-text-widget-primary hover:chat-underline chat-underline-offset-4',
};

const sizeStyles: Record<ButtonSize, string> = {
  default: 'chat-h-10 chat-px-4 chat-py-2',
  sm: 'chat-h-8 chat-px-3 chat-text-sm',
  lg: 'chat-h-12 chat-px-6',
  icon: 'chat-h-9 chat-w-9 chat-p-0',
};

export function Button({
  variant = 'default',
  size = 'default',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'chat-inline-flex chat-items-center chat-justify-center chat-rounded-lg chat-font-medium chat-transition-all',
        'focus-visible:chat-outline-none focus-visible:chat-ring-2 focus-visible:chat-ring-widget-ring focus-visible:chat-ring-offset-2',
        'disabled:chat-pointer-events-none disabled:chat-opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
