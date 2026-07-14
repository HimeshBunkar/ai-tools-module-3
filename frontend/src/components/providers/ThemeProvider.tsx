'use client';

// Stub — the app uses a fixed dark theme via globals.css.
// next-themes is NOT used to avoid bundling it into every edge function.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
