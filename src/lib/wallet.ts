export async function connectWallet() {
  if (typeof window === "undefined") return null;
  if (!window.ethereum) {
    alert("MetaMask not found");
    return null;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  return accounts[0];
}
