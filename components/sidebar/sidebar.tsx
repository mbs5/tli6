"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, History, X, ChevronLeft, ChevronRight, PanelRightOpen, Home, BookOpen, ClipboardList, FileText, Lightbulb } from 'lucide-react';
import { EnhancedSidebarInput } from '@/components/sidebar/enhanced-sidebar-input';
import { ChatMessage } from '@/components/chat/chat-message';
import { generateAnalogy, generateQuiz, generateFlashcard } from "@/actions/replicate-actions";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from 'next/link';

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
  ]);
  const [isNavOpen, setIsNavOpen] = useState(true);

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
      {/* Collapsible Navigation Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-background border-r transition-all duration-300 ${isNavOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 flex justify-between items-center">
          <h2 className={`font-bold ${isNavOpen ? 'block' : 'hidden'}`}>Navigation</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
        <nav className={`space-y-2 ${isNavOpen ? 'px-4' : 'px-2'}`}>
          <Link href="/" className="flex items-center py-2 px-4 hover:bg-accent rounded-md">
            {isNavOpen ? 'Home' : <Home className="h-4 w-4" />}
          </Link>
          <Link href="/study-sets" className="flex items-center py-2 px-4 hover:bg-accent rounded-md">
            {isNavOpen ? 'Study Sets' : <BookOpen className="h-4 w-4" />}
          </Link>
          <Link href="/assignments" className="flex items-center py-2 px-4 hover:bg-accent rounded-md">
            {isNavOpen ? 'Assignments' : <ClipboardList className="h-4 w-4" />}
          </Link>
          <Link href="/resources" className="flex items-center py-2 px-4 hover:bg-accent rounded-md">
            {isNavOpen ? 'Resources' : <FileText className="h-4 w-4" />}
          </Link>
          <Link href="/analogies" className="flex items-center py-2 px-4 hover:bg-accent rounded-md">
            {isNavOpen ? 'Analogies' : <Lightbulb className="h-4 w-4" />}
          </Link>
        </nav>
        <div className="absolute bottom-4 left-4">
          <ThemeToggle />
        </div>
      </div>

      {/* AI Tool Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed right-0 top-0 h-full bg-background shadow-lg transition-transform duration-300 ease-in-out z-50 ${isAIOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: `${width}px` }}
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
              <Button variant="ghost" size="icon">
                <History className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onAIClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} content={message.content} isAI={message.role === 'assistant'} />
            ))}
          </div>
          <div className="border-t">
            <EnhancedSidebarInput onSubmit={handleSubmit} files={files} tool={tool} />
          </div>
        </div>
      </div>

      {/* Toggle button for AI sidebar */}
      {!isAIOpen && (
        <Button
          variant="outline"
          size="icon"
          className="fixed right-4 bottom-4 p-2 rounded-full shadow-lg z-50"
          onClick={onAIToggle}
        >
          <PanelRightOpen className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}