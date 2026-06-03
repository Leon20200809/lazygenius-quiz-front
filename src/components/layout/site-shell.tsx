import type { ReactNode } from "react";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <SiteHeader />

      <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-5xl px-6 py-10">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}