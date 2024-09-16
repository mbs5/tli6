"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface PreviousChat {
  id: string;
  title: string;
  tool: 'analogy' | 'quiz' | 'flashcard';
  timestamp: string;
}

interface PreviousChatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chats: PreviousChat[];
  onSelectChat: (chatId: string) => void;
}

export function PreviousChatsModal({ isOpen, onClose, chats, onSelectChat }: PreviousChatsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTool, setSelectedTool] = useState<'all' | 'analogy' | 'quiz' | 'flashcard'>('all');

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTool === 'all' || chat.tool === selectedTool)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Previous Chats</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex space-x-2">
            {['all', 'analogy', 'quiz', 'flashcard'].map((tool) => (
              <Button
                key={tool}
                variant={selectedTool === tool ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTool(tool as any)}
              >
                {tool.charAt(0).toUpperCase() + tool.slice(1)}
              </Button>
            ))}
          </div>
          <ScrollArea className="h-[300px]">
            {filteredChats.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="flex flex-col items-start">
                  <span>{chat.title}</span>
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
              </Button>
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}