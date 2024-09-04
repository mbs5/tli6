import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar" // Adjusted path

interface ChatMessageProps {
  content: string;
  isAI: boolean;
}

export function ChatMessage({ content, isAI }: ChatMessageProps) {
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      {isAI && (
        <Avatar className="mr-2">
          <AvatarImage src="/ai-avatar.png" alt="AI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div className={`p-3 max-w-[70%] ${isAI ? 'bg-blue-100 rounded-lg rounded-tl-none' : 'bg-gray-100 rounded-lg rounded-tr-none'}`}>
        {content}
      </div>
    </div>
  );
}