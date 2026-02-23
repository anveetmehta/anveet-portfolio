import { type ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-6xl px-6 lg:px-10 ${className ?? ''}`}>{children}</div>;
}
