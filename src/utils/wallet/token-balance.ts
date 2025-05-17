
// Fetch BUSTY token balance for connected wallet
export const fetchTokenBalance = async (walletAddress: string): Promise<number> => {
  try {
    // BUSTY token mint address
    const tokenMintAddress = "6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump";
    
    // Fetch token account info using Solana web3 RPC API
    const response = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getTokenAccountsByOwner",
        "params": [
          walletAddress,
          {
            "mint": tokenMintAddress
          },
          {
            "encoding": "jsonParsed"
          }
        ]
      })
    });

    const data = await response.json();
    
    // Extract balance from response
    if (data.result?.value && data.result.value.length > 0) {
      const accountInfo = data.result.value[0].account.data.parsed.info;
      const balance = parseFloat(accountInfo.tokenAmount.amount) / 10 ** accountInfo.tokenAmount.decimals;
      return balance;
    }
    
    return 0; // Return 0 if no tokens found
  } catch (error) {
    console.error("Error fetching token balance:", error);
    return 0;
  }
};
