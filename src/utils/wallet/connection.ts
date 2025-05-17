
import { WalletType, SignedMessage } from './types';
import { getWalletProvider } from './providers';

// Connect to wallet
export const connectWallet = async (walletType: WalletType): Promise<string | null> => {
  try {
    console.log(`Starting connection to ${walletType}...`);
    
    const provider = getWalletProvider(walletType);
    
    if (!provider) {
      console.error(`${walletType} wallet provider not found`);
      if (walletType === 'phantom') {
        window.open('https://phantom.app/', '_blank');
      } else if (walletType === 'solflare') {
        window.open('https://solflare.com/', '_blank');
      }
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
      throw new Error(`${walletType} wallet not found`);
    }

    let publicKey = '';
    
    if (walletType === 'phantom') {
      publicKey = provider.publicKey.toString();
    } else if (walletType === 'solflare') {
      publicKey = provider.publicKey.toString();
    }

    console.log(`Signing message with ${walletType} wallet...`);
    
    // Sign the message
    const { signature } = await provider.signMessage(encodedMessage);
    console.log('Got signature:', signature);
    
    // Convert signature to hex string without using Buffer
    const signatureHex = Array.from(signature)
      .map(b => {
        // Convert to hex and pad with leading zeros if needed
        const hex = b.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
    
    console.log('Converted signature to hex:', signatureHex);
    
    return {
      signature: signatureHex,
      publicKey: publicKey
    };
  } catch (error) {
    console.error(`Error signing with ${walletType}:`, error);
    return null;
  }
};
