'use client'

import { useAccount } from 'wagmi'
import { useTBA } from '@/hooks/useTBA'
import { useMint } from '@/hooks/useMint'

export default function Home() {
  const { address, isConnected } = useAccount()
  // We use Token ID 1 for your first agent
  const { tbaAddress } = useTBA(1) 
  const { mintAgent, isPending } = useMint()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter">AGENT.FI</h1>
          <p className="text-zinc-500">Please connect your wallet in the header to begin.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tighter">AGENT.FI</h1>
          <div className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800 font-mono text-sm text-blue-400">
            {address?.slice(0,6)}...{address?.slice(-4)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* THE BODY */}
          <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
            <h2 className="text-blue-500 text-xs font-bold uppercase mb-6">Identity (NFT)</h2>
            <div className="aspect-square bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-700">
              <span className="text-zinc-600 font-bold">AGENT #1</span>
            </div>
          </div>

          {/* THE BRAIN */}
          <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 flex flex-col justify-between">
            <div>
              <h2 className="text-green-500 text-xs font-bold uppercase mb-6">Brain (TBA Wallet)</h2>
              <div className="bg-black p-4 rounded-xl border border-zinc-800 font-mono text-sm text-green-400 break-all">
                {tbaAddress}
              </div>
            </div>

            <button 
              onClick={() => {
                console.log("Attempting Mint for:", address);
                if (address) mintAgent(address);
              }}
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 py-4 rounded-2xl font-bold transition-all mt-8"
            >
              {isPending ? 'Confirm in MetaMask...' : 'Initialize Agent'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}