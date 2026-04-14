'use client';

import type { ReactNode } from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
