import type { Metadata } from "next";
import "../globals.css";

import { Providers as ProviderTheme } from "@/providers/theme";

export const metadata: Metadata = {
  title: "Clover Apps",
  description: "Clover is IT Service Desk Management for Internal Employee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body>
        <ProviderTheme>
          {children}
        </ProviderTheme>
      </body>
    </html>
  );
}
