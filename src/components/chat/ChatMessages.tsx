
import { useRef, useEffect } from 'react';
import { Message } from '@/types/chat';

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
};

const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="p-4 h-[60vh] overflow-y-auto flex flex-col gap-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[80%] rounded-lg p-3 ${
              message.role === 'user' 
                ? 'bg-berry text-white ml-auto' 
                : 'bg-dark-lighter text-white'
            }`}
          >
            {message.content}
            {message.imageUrl && (
              <img 
                src={message.imageUrl} 
                alt="Generated" 
                className="mt-2 rounded-md max-w-full" 
              />
            )}
            <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-gray-200' : 'text-gray-400'}`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-dark-lighter text-white rounded-lg p-4 max-w-[80%]">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-berry-light animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-berry-light animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-berry-light animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={chatBottomRef} />
    </div>
  );
};

export default ChatMessages;
