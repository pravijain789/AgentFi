'use client'

import { useAccount } from 'wagmi'
import { useMint } from '@/hooks/useMint'

export function MintButton() {
  const { address, isConnected } = useAccount()
  const { mintAgent, isPending, isConfirming, isSuccess } = useMint()

  if (!isConnected) return null

  return (
    <div className="space-y-4">
      <button 
  onClick={() => mintAgent(address!)} // Make sure 'address' is passed here!
  disabled={isPending || isConfirming}
>
  {isPending ? 'Confirm in Wallet...' : 'Initialize Agent'}
</button>

      {isSuccess && (
        <p className="text-green-400 text-center text-sm">
          Agent Successfully Initialized!
        </p>
      )}
    </div>
  )
}