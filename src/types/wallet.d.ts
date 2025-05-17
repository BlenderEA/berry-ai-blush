
interface PhantomProvider {
  isPhantom: boolean;
  publicKey: {
    toString: () => string;
  };
  isConnected: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array, encoding: string) => Promise<{ signature: Uint8Array }>;
  solana?: PhantomProvider;
}

interface SolflareProvider {
  isSolflare: boolean;
  publicKey: {
    toString: () => string;
  };
  isConnected: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array, encoding: string) => Promise<{ signature: Uint8Array }>;
}

interface Window {
  phantom?: {
    solana?: PhantomProvider;
  };
  solflare?: SolflareProvider;
  solana?: PhantomProvider | SolflareProvider;
}
