
import { User } from '@supabase/supabase-js';

export type WalletType = 'phantom' | 'solflare';

export interface WalletProvider {
  isPhantom?: boolean;
  isSolflare?: boolean;
  publicKey: { toString: () => string };
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
}

export interface SignedMessage {
  signature: string;
  publicKey: string;
}

export interface WalletAuthResult {
  success: boolean;
  user?: User;
  error?: Error;
}
