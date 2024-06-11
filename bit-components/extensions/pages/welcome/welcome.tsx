import type { ReactNode } from 'react';

export type WelcomeProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
};

export function Welcome({ children }: WelcomeProps) {
  return (
    <div>
      {children}
    </div>
  );
}
