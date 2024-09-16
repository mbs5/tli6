"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, History, X } from 'lucide-react';
import { EnhancedSidebarInput } from '@/components/chat-sidebar/enhanced-sidebar-input';
import { ChatMessage } from '@/components/chat/chat-message';
import { generateAnalogy, generateQuiz, generateFlashcard } from "@/actions/replicate-actions";
import { PreviousChatsModal } from '@/components/chat-sidebar/previous-chats-modal';
import { cn } from "@/lib/utils";

type Tool = 'analogy' | 'quiz' | 'flashcard';
type Complexity = "Easy" | "Medium" | "Hard";

interface SidebarProps {
  isAIOpen: boolean;
  onAIClose: () => void;
  onAIToggle: () => void;
}

interface CustomFile {
  id: string;
  name: string;
}

export function Sidebar({ isAIOpen, onAIClose, onAIToggle }: SidebarProps) {
  const [tool, setTool] = useState<Tool>('analogy');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [width, setWidth] = useState(384); // Default width (24rem)
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const [files] = useState<CustomFile[]>([
    { id: '1', name: 'File 1.txt' },
    { id: '2', name: 'File 2.txt' },
    { id: '3', name: 'File 3.txt' },
    { id: '4', name: 'File 4.txt' },
    { id: '5', name: 'File 5.txt' },
  ]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isPreviousChatsOpen, setIsPreviousChatsOpen] = useState(false);

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleSubmit = async (input: string, selectedFiles: string[], complexity: Complexity) => {
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    try {
      let result: string;
      switch (tool) {
        case 'analogy':
          result = await generateAnalogy(input, complexity);
          break;
        case 'quiz':
          result = await generateQuiz(input, complexity);
          break;
        case 'flashcard':
          result = await generateFlashcard(input, complexity);
          break;
        default:
          throw new Error("Invalid tool selected");
      }
      setMessages(prev => [...prev, { role: 'assistant', content: result }]);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Failed to generate content. Please try again." }]);
    }
  };

  const startResizing = (mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    isResizing.current = true;
  };

  const stopResizing = () => {
    isResizing.current = false;
  };

  const resize = (mouseMoveEvent: MouseEvent) => {
    if (isResizing.current && sidebarRef.current) {
      const newWidth = document.body.clientWidth - mouseMoveEvent.clientX;
      setWidth(Math.max(300, Math.min(newWidth, 600))); // Min 300px, max 600px
    }
  };

  const handleEdit = (index: number, newContent: string) => {
    const newMessages = [...messages];
    newMessages[index] = { ...newMessages[index], content: newContent };
    setMessages(newMessages);

    if (index + 1 < newMessages.length && newMessages[index + 1].role === 'assistant') {
      newMessages.splice(index + 1, 1);
      setMessages(newMessages);
      handleSubmit(newContent, selectedFiles, 'Easy');
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, []);

  return (
    <>
      {isAIOpen && (
        <motion.div 
          ref={sidebarRef}
          className={cn(
            "fixed right-0 top-0 h-full bg-background shadow-lg transition-transform duration-300 ease-in-out z-50 border-l border-gray-200 dark:border-gray-700"
          )}
          style={{ width: `${width}px` }}
          initial={{ x: width }}
          animate={{ x: 0 }}
          exit={{ x: width }}
        >
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize"
            onMouseDown={startResizing}
          />
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <Select value={tool} onValueChange={(value: Tool) => setTool(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select tool" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analogy">Create Analogy</SelectItem>
                  <SelectItem value="quiz">Create Quiz</SelectItem>
                  <SelectItem value="flashcard">Create Flashcard</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={handleNewChat}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsPreviousChatsOpen(true)}>
                  <History className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onAIClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto p-4 hide-scrollbar">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  content={message.content}
                  isAI={message.role === 'assistant'}
                  onEdit={message.role === 'user' ? (newContent) => handleEdit(index, newContent) : undefined}
                />
              ))}
            </div>
            <div className="border-t">
              <EnhancedSidebarInput onSubmit={handleSubmit} files={files} tool={tool} />
            </div>
          </div>
        </motion.div>
      )}

      <PreviousChatsModal
        isOpen={isPreviousChatsOpen}
        onClose={() => setIsPreviousChatsOpen(false)}
        chats={[]} // You'll need to implement this
        onSelectChat={() => {}} // You'll need to implement this
      />
    </>
  );
}