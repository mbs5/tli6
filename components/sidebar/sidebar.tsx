"use client";

import React, { useState, useRef, useEffect, ErrorInfo } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, History, X, ChevronLeft, ChevronRight, PanelRightOpen, Home, BookOpen, ClipboardList, FileText, Lightbulb } from 'lucide-react';
import { EnhancedSidebarInput } from '@/components/sidebar/enhanced-sidebar-input';
import { ChatMessage } from '@/components/chat/chat-message';
import { generateAnalogy, generateQuiz, generateFlashcard } from "@/actions/replicate-actions";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { PreviousChatsModal } from '@/components/sidebar/previous-chats-modal';

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

interface PreviousChat {
  id: string;
  title: string;
  tool: 'analogy' | 'quiz' | 'flashcard';
  timestamp: string;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
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
    { id: '6', name: 'File 6.txt' },
    { id: '7', name: 'File 7.txt' },
    { id: '8', name: 'File 8.txt' },
    { id: '9', name: 'File 9.txt' },
    { id: '10', name: 'File 10.txt' },
  ]);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isPreviousChatsOpen, setIsPreviousChatsOpen] = useState(false);
  const [previousChats, setPreviousChats] = useState<PreviousChat[]>([
    // Add some dummy data for demonstration
    { id: '1', title: 'Analogy about space', tool: 'analogy', timestamp: '2023-04-01 10:00' },
    { id: '2', title: 'Quiz on history', tool: 'quiz', timestamp: '2023-04-02 14:30' },
    { id: '3', title: 'Flashcards for biology', tool: 'flashcard', timestamp: '2023-04-03 09:15' },
  ]);

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

    // Remove AI response and generate a new one
    if (index + 1 < newMessages.length && newMessages[index + 1].role === 'assistant') {
      newMessages.splice(index + 1, 1);
      setMessages(newMessages);
      handleSubmit(newContent, selectedFiles, 'Easy'); // You might want to pass the actual complexity here
    }
  };

  const handleSelectPreviousChat = (chatId: string) => {
    // Implement logic to load the selected chat
    console.log(`Selected chat: ${chatId}`);
    setIsPreviousChatsOpen(false);
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
    <ErrorBoundary>
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
      {isAIOpen && (
        <div 
          ref={sidebarRef}
          className="fixed right-0 top-0 h-full bg-background shadow-lg transition-transform duration-300 ease-in-out z-50 border-l border-gray-200 dark:border-gray-700"
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
        </div>
      )}

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

      <PreviousChatsModal
        isOpen={isPreviousChatsOpen}
        onClose={() => setIsPreviousChatsOpen(false)}
        chats={previousChats}
        onSelectChat={handleSelectPreviousChat}
      />
    </ErrorBoundary>
  );
}