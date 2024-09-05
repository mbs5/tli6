"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AtSign, MessageCircle, Code } from 'lucide-react';

interface EnhancedInputProps {
  onSubmit: (input: string, complexity: string) => void;
  onMention: () => void;
  onChatToggle: () => void;
  onCodebaseToggle: () => void;
}

export function EnhancedInput({ onSubmit, onMention, onChatToggle, onCodebaseToggle }: EnhancedInputProps) {
  const [input, setInput] = useState('');
  const [complexity, setComplexity] = useState('easy');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input, complexity);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <div className="absolute left-2 flex items-center space-x-2">
        <Select value={complexity} onValueChange={setComplexity}>
          <SelectTrigger className="w-[100px] h-8">
            <SelectValue placeholder="Complexity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onMention}>
          <AtSign className="h-4 w-4" />
        </Button>
      </div>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow min-h-[40px] pl-[220px] pr-[100px] py-2 resize-none rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Type your message..."
        style={{ overflow: 'hidden' }}
      />
      <div className="absolute right-2 flex items-center space-x-2">
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={onChatToggle}>
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={onCodebaseToggle}>
          <Code className="h-4 w-4" />
        </Button>
        <Button type="submit" size="sm">Send</Button>
      </div>
    </form>
  );
}