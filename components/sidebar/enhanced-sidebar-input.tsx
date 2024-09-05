"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, X, AtSign } from 'lucide-react';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

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
  const [searchTerm, setSearchTerm] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");

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

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInput(newValue);

    const lastChar = newValue[newValue.length - 1];
    if (lastChar === '@') {
      setIsCommandOpen(true);
    }
  };

  const handleFileSelect = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      setInput(prev => prev + file.name);
      setIsCommandOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="p-2">
        <div className="flex items-center">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex-shrink-0 mr-2">
                <Plus className="h-4 w-4 mr-2" /> Add Content
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4" align="start">
              <Input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
              />
              <ScrollArea className="h-[200px]">
                {filteredFiles.length > 0 ? (
                  filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-accent ${
                        selectedFiles.includes(file.id) ? 'bg-accent' : ''
                      }`}
                      onClick={() => toggleFile(file.id)}
                    >
                      <span>{file.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-sm text-muted-foreground">No files found.</div>
                )}
              </ScrollArea>
            </PopoverContent>
          </Popover>
          <div className="flex-grow overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex space-x-1 py-1 overflow-x-auto hide-scrollbar"
            >
              {selectedFiles.map((fileId) => {
                const file = files.find(f => f.id === fileId);
                return file ? (
                  <Badge key={fileId} variant="secondary" className="text-xs whitespace-nowrap flex-shrink-0">
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
          </div>
        </div>
      </div>
      
      <div className="flex-grow p-2 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          className="w-full min-h-[40px] max-h-[200px] resize-none rounded-md bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Type your message..."
          rows={1}
        />
      </div>
      
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <CommandInput placeholder="Search files..." value={commandQuery} onValueChange={setCommandQuery} />
        <CommandList>
          <CommandEmpty>No files found.</CommandEmpty>
          <CommandGroup heading="Files">
            {files.filter(file => file.name.toLowerCase().includes(commandQuery.toLowerCase())).map(file => (
              <CommandItem key={file.id} onSelect={() => handleFileSelect(file.id)}>
                {file.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      
      <div className="p-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Select 
            value={complexity} 
            onValueChange={(value: string) => setComplexity(value as Complexity)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Complexity" />
            </SelectTrigger>
            <SelectContent>
              {['Easy', 'Medium', 'Hard'].map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
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