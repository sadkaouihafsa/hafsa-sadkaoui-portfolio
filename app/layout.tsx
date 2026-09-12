import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hafsa Sadkaoui | Data, Analytics & AI",
  description: "Portfolio of Hafsa Sadkaoui, MS Business Analytics & AI candidate at UT Dallas.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
