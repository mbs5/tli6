"use client";

import { useState } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/app/components/Sidebar";
import { Header } from "@/app/components/Header";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar as ChatSidebar } from "@/components/chat-sidebar/chat-sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex h-screen">
            <Sidebar isExpanded={isSidebarExpanded} onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} />
            <div className="flex flex-col flex-grow">
              <Header 
                onToggleChat={() => setIsAIChatOpen(!isAIChatOpen)} 
                isSidebarExpanded={isSidebarExpanded}
              />
              <main className="flex-grow overflow-auto">
                {children}
              </main>
            </div>
            <ChatSidebar 
              isAIOpen={isAIChatOpen} 
              onAIClose={() => setIsAIChatOpen(false)} 
              onAIToggle={() => setIsAIChatOpen(!isAIChatOpen)} 
            />
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
