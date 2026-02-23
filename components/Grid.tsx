import { type ReactNode } from 'react';

type GridProps = {
  children: ReactNode;
  columns?: 2 | 3;
};

export function Grid({ children, columns = 2 }: GridProps) {
  const className =
    columns === 3
      ? 'grid gap-5 md:grid-cols-2 lg:grid-cols-3'
      : 'grid gap-5 md:grid-cols-2';

  return <div className={className}>{children}</div>;
}
