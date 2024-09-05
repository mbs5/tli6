"use client";

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Copy, Plus, Edit, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ChatMessageProps {
  content: string;
  isAI: boolean;
  onEdit?: (newContent: string) => void;
}

export function ChatMessage({ content, isAI, onEdit }: ChatMessageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit?.(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({
      description: "Copied to clipboard",
      duration: 2000,
    });
  };

  const formattedContent = isAI
    ? content.split('\n\n').map((paragraph, index) => (
        <p key={index} className={index > 0 ? 'mt-4' : ''}>{paragraph}</p>
      ))
    : content;

  return (
    <div className={cn("flex items-start space-x-2 mb-4 group", isAI ? "justify-start" : "justify-end")}>
      {!isAI && !isEditing && (
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100" onClick={handleEdit}>
          <Edit className="h-4 w-4" />
        </Button>
      )}
      <div
        className={cn(
          "px-4 py-2 rounded-lg relative",
          isAI
            ? "border border-gray-200 dark:border-gray-700"
            : "bg-primary text-primary-foreground"
        )}
      >
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full bg-transparent resize-none focus:outline-none"
            />
            <div className="mt-2">
              <Button variant="ghost" size="sm" onClick={handleSave}>
                <Check className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-sm">{formattedContent}</div>
        )}
        {isAI && (
          <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}