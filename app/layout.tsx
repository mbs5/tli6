"use client";

import { useState } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from '@/components/sidebar/sidebar';
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false);

  const toggleAISidebar = () => setIsAISidebarOpen(!isAISidebarOpen);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex h-screen">
            <Sidebar 
              isAIOpen={isAISidebarOpen} 
              onAIClose={() => setIsAISidebarOpen(false)} 
              onAIToggle={toggleAISidebar}
            />
            <main className="flex-grow overflow-auto ml-16 md:ml-64">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
