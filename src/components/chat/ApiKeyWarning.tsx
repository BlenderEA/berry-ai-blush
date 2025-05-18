
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

interface ApiKeyWarningProps {
  message: string;
  details?: string;
}

const ApiKeyWarning = ({ message, details }: ApiKeyWarningProps) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>API Key Issue</AlertTitle>
      <AlertDescription>
        <p className="mb-2">{message}</p>
        {details && <p className="text-sm opacity-90">{details}</p>}
        <p className="text-sm mt-3">
          To fix this issue, a valid Hugging Face API key needs to be set in the Supabase Edge Function secrets.
          You can get a free API key by signing up at{' '}
          <a 
            href="https://huggingface.co/settings/tokens" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline font-medium hover:text-primary"
          >
            huggingface.co
          </a>.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyWarning;
