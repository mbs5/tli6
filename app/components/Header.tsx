"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, ChevronRight } from 'lucide-react';
import { Breadcrumb } from '@/app/components/Breadcrumb';

interface HeaderProps {
  onToggleChat: () => void;
  isSidebarExpanded: boolean;
}

export function Header({ onToggleChat, isSidebarExpanded }: HeaderProps) {
  return (
    <header className={`flex justify-between items-center p-2 bg-background border-b transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-[68px]'}`}>
      <Breadcrumb />
      <Button onClick={onToggleChat} variant="outline" size="sm" className="flex items-center">
        <MessageSquare className="mr-1 h-3 w-3" />
        Chat
        <ChevronRight className="ml-1 h-3 w-3" />
      </Button>
    </header>
  );
}