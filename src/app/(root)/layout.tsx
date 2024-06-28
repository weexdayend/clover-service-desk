import type { Metadata } from "next";
import "../globals.css";

import { Providers as ProviderSession } from "@/providers/session";
import { Providers as ProviderTheme } from "@/providers/theme";

import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";

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
      <body className='w-full min-h-screen'>
        <ProviderSession>
          <ProviderTheme>
            <Navbar />
            {children}
          </ProviderTheme>
        </ProviderSession>
      </body>
    </html>
  );
}
