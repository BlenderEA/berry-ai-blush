
export type WalletType = 'phantom' | 'solflare';

export interface WalletAuthResult {
  publicKey: string;
  signature: string;
}
