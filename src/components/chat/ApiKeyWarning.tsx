
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ApiKeyWarningProps {
  message: string;
  details?: string;
}

const ApiKeyWarning = ({ message, details }: ApiKeyWarningProps) => {
  const openSupabaseSecrets = () => {
    window.open('https://supabase.com/dashboard/project/zampjpsurcfjxpnqshtu/settings/functions', '_blank');
  };

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>API Key Issue</AlertTitle>
      <AlertDescription>
        <p className="mb-2">{message}</p>
        {details && <p className="text-sm opacity-90 mb-2">{details}</p>}
        <div className="text-sm mt-3">
          <p className="mb-2">
            To fix this issue, you need to verify that:
          </p>
          <ol className="list-decimal pl-5 space-y-1 mb-3">
            <li>You have a valid OpenAI API key (should start with <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">sk-</code>)</li>
            <li>The API key is correctly added as <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">OPENAI_API_KEY</code> in Supabase secrets</li>
            <li>There are no extra spaces before or after the API key</li>
          </ol>
          <div className="mt-4">
            <h4 className="font-medium mb-1">Steps to fix:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Get a valid API key from OpenAI</li>
              <li>Go to your Supabase project's Edge Function secrets</li>
              <li>Delete the current <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">OPENAI_API_KEY</code> value if it exists</li>
              <li>Add a new <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">OPENAI_API_KEY</code> secret with your valid key</li>
              <li>Make sure there are no spaces or extra characters</li>
              <li>Refresh this page and try chatting again</li>
            </ol>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button 
              variant="default" 
              size="sm" 
              onClick={openSupabaseSecrets} 
              className="flex items-center gap-1"
            >
              <span>Open Supabase Secrets</span>
              <ExternalLink size={14} />
            </Button>
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <span>Get OpenAI API Key</span>
                <ExternalLink size={14} />
              </Button>
            </a>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyWarning;
