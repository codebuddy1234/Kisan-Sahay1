
import React from "react";
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { VoiceProvider } from '@/lib/voice-context';
import { ThemeProvider } from '@/lib/theme-context';
import '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Kisan Sahay - Farmer Scheme Discovery Platform',
  description: 'Discover government schemes, insurance, and financial support for farmers.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          <ThemeProvider>
            <VoiceProvider>
              {children}
            </VoiceProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
