import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from '../components/Navigation';
import { QueryProvider } from '../components/providers/QueryProvider';
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MSDP Admin Dashboard",
  description: "Multi-Service Delivery Platform - Admin Management Console",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased bg-gray-50`}>
        <QueryProvider>
          <div className="min-h-screen flex">
            <Navigation />
            <main className="flex-1 ml-64">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}