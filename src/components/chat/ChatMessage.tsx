
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  avatarSrc?: string;
  avatarFallback?: string;
  avatarColor?: string;
  onSpeakMessage?: () => void;
  isSpeaking?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  role,
  timestamp,
  avatarSrc,
  avatarFallback,
  avatarColor,
  onSpeakMessage,
  isSpeaking
}) => {
  const isAssistant = role === 'assistant';
  const formattedTime = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);

  return (
    <div className={`flex gap-3 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="flex-shrink-0">
        <Avatar className={`${!isAssistant && 'border border-berry-light'}`}>
          {isAssistant ? (
            <>
              <AvatarImage src={avatarSrc} />
              <AvatarFallback className={avatarColor}>{avatarFallback}</AvatarFallback>
            </>
          ) : (
            <AvatarFallback className="bg-dark-lighter">You</AvatarFallback>
          )}
        </Avatar>
      </div>
      
      <div className={`flex flex-col max-w-[80%] space-y-1 ${isAssistant ? 'items-start' : 'items-end'}`}>
        <div className={`rounded-2xl py-2 px-4 ${isAssistant ? 'bg-dark-card border border-dark-border' : 'bg-berry text-white'}`}>
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        
        <div className={`flex items-center text-xs text-gray-400 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
          <span>{formattedTime}</span>
          
          {isAssistant && onSpeakMessage && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 ml-2 text-gray-400 hover:text-berry"
              onClick={onSpeakMessage}
            >
              {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
