"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, AtSign } from 'lucide-react';

type Complexity = "Easy" | "Medium" | "Hard";

interface File {
  id: string;
  name: string;
}

interface EnhancedSidebarInputProps {
  onSubmit: (input: string, selectedFiles: string[], complexity: Complexity) => void;
  files: File[];
  tool: 'analogy' | 'quiz' | 'flashcard';
}

export function EnhancedSidebarInput({ onSubmit, files = [], tool }: EnhancedSidebarInputProps) {
  const [input, setInput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [complexity, setComplexity] = useState<Complexity>('Easy');
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
      onSubmit(input, selectedFiles, complexity);
      setInput('');
      setSelectedFiles([]);
    }
  };

  const toggleFile = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const getComplexityOptions = (): Complexity[] => {
    switch (tool) {
      case 'analogy':
      case 'quiz':
      case 'flashcard':
        return ['Easy', 'Medium', 'Hard'];
      default:
        return [];
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="p-2 border-b">
        <div className="flex items-center space-x-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add Content
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search files..." />
                <CommandEmpty>No files found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-[200px]">
                    {files && files.length > 0 ? (
                      files.map((file) => (
                        <CommandItem
                          key={file.id}
                          onSelect={() => toggleFile(file.id)}
                        >
                          <div className={`flex items-center space-x-2 ${selectedFiles.includes(file.id) ? 'text-primary' : ''}`}>
                            <span>{file.name}</span>
                          </div>
                        </CommandItem>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-muted-foreground">No files available.</div>
                    )}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <ScrollArea className="w-[200px] whitespace-nowrap">
            <div className="flex space-x-1">
              {selectedFiles.map((fileId) => {
                const file = files.find(f => f.id === fileId);
                return file ? (
                  <Badge key={fileId} variant="secondary" className="text-xs">
                    {file.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => toggleFile(fileId)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ) : null;
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex-grow p-2 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full min-h-[40px] max-h-[200px] resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Type your message..."
          rows={1}
        />
      </div>
      <div className="p-2 border-t flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Select 
            value={complexity} 
            onValueChange={(value: string) => setComplexity(value as Complexity)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Complexity" />
            </SelectTrigger>
            <SelectContent>
              {getComplexityOptions().map((option) => (
                <SelectItem key={option} value={option.toLowerCase()}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <AtSign className="h-4 w-4" />
          </Button>
        </div>
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
}