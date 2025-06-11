import type { ReactNode } from 'react';
import { LeftBar } from './LeftBar';
import { RightBar } from './RightBar';

export interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => (
  <div className="flex grow">
    <LeftBar className="grow" />
    <main className="border-muted grow-3 border-x">{children}</main>
    <RightBar className="grow" />
  </div>
);
