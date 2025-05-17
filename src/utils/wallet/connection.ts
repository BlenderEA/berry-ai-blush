
import { WalletType, SignedMessage } from './types';
import { getWalletProvider } from './providers';
import { toast } from "sonner";

// Connect to wallet
export const connectWallet = async (walletType: WalletType): Promise<string | null> => {
  try {
    console.log(`Starting connection to ${walletType}...`);
    
    const provider = getWalletProvider(walletType);
    
    if (!provider) {
      console.error(`${walletType} wallet provider not found`);
      toast.error(`${walletType} wallet not found`, {
        description: "Please install the wallet extension and refresh the page."
      });
      return null;
    }
    
    console.log(`Attempting to connect to ${walletType}...`);
    
    // Connect to the wallet
    const response = await provider.connect();
    const publicKey = response.publicKey.toString();
    
    console.log(`Connected to ${walletType} with public key: ${publicKey}`);
    return publicKey;
  } catch (error) {
    console.error(`Error connecting to ${walletType}:`, error);
    
    // Check if the wallet is locked
    if (error instanceof Error && error.message.includes('locked')) {
      toast.error("Wallet is locked", {
        description: "Please unlock your wallet and try again."
      });
    } else {
      toast.error(`Failed to connect to ${walletType}`, {
        description: "Make sure your wallet is unlocked and try again."
      });
    }
    
    return null;
  }
};

// Sign message using wallet
export const signMessage = async (walletType: WalletType, message: string): Promise<SignedMessage | null> => {
  try {
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message);
    
    const provider = getWalletProvider(walletType);
    if (!provider) {
      toast.error(`${walletType} wallet not found`, {
        description: "Please install the wallet extension and refresh the page."
      });
      throw new Error(`${walletType} wallet not found`);
    }

    let publicKey = provider.publicKey.toString();

    console.log(`Signing message with ${walletType} wallet...`);
    
    // Sign the message
    const { signature } = await provider.signMessage(encodedMessage);
    console.log('Got signature:', signature);
    
    // Convert Uint8Array signature to hex string properly
    const signatureHex = Buffer.from(signature).toString('hex');
    
    console.log('Converted signature to hex:', signatureHex);
    
    return {
      signature: signatureHex,
      publicKey: publicKey
    };
  } catch (error) {
    console.error(`Error signing with ${walletType}:`, error);
    
    if (error instanceof Error && error.message.includes('rejected')) {
      toast.error("Signature rejected", {
        description: "You declined to sign the message. Please try again and approve the signature request."
      });
    } else {
      toast.error(`Failed to sign message with ${walletType}`, {
        description: "Please make sure your wallet is unlocked and try again."
      });
    }
    
    return null;
  }
};
