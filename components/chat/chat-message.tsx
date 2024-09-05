import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
  content: string;
  isAI: boolean;
}

export function ChatMessage({ content, isAI }: ChatMessageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn("flex items-start space-x-2 mb-4", isAI ? "justify-start" : "justify-end")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isAI && (
        <Avatar>
          <AvatarImage src="/ai-avatar.png" alt="AI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <motion.div
        className={cn(
          "px-4 py-2 rounded-lg",
          isAI
            ? "bg-primary text-primary-foreground rounded-tl-none"
            : "bg-muted rounded-tr-none"
        )}
        whileHover={{ scale: 1.02 }}
      >
        <p className="text-sm">{content}</p>
      </motion.div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-muted-foreground"
        >
          {new Date().toLocaleTimeString()}
        </motion.div>
      )}
    </motion.div>
  );
}