import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Global Search — AI Discovery Platform",
  description: "Search tools, companies, models, news, videos and repositories.",
};

// Explicitly light-only. Without this, some browsers/OSes (Android Chrome's
// "force dark", Samsung Internet, etc.) will auto-repaint the page with a
// heuristic dark palette — which is what produces garbled colors and
// low-contrast text, since it's guessing at colors we never intended.
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="supported-color-schemes" content="light" />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  title: {
    default: "The AI Signal — Discover the AI Ecosystem",
    template: "%s | The AI Signal",
  },
  description:
    "Discover, compare, and explore the best AI tools, companies, models, and repositories in the global ecosystem.",
};

import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
