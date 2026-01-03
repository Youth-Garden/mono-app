import { FunctionComponent } from 'preact';

interface IconProps {
  className?: string;
  size?: number;
}

// Filled message bubble icon - same shape as MessageSquareText but solid
export const MessageBubbleFilledIcon: FunctionComponent<IconProps> = ({
  className = '',
  size = 32,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
  </svg>
);
