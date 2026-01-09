'use client'

import { useState, useEffect } from 'react'
import { usePublicClient, useAccount } from 'wagmi'
import { 
  REGISTRY_ADDRESS, 
  IMPLEMENTATION_ADDRESS, 
  SEPOLIA_ID, 
  AGENT_NFT_ADDRESS 
} from '@/lib/constants'

export function useTBA(tokenId: number | null) {
  const [tbaAddress, setTbaAddress] = useState<string>('Initializing...')
  const { isConnected } = useAccount()
  const publicClient = usePublicClient()

  useEffect(() => {
    // Safety check prevents calling readContract on undefined
    if (!isConnected || !publicClient || tokenId === null) {
      setTbaAddress('Connect Wallet')
      return
    }

    async function fetchTBA() {
      try {
        // The '!' tells TypeScript that publicClient is guaranteed to exist here
        const addr = await publicClient!.readContract({
          address: REGISTRY_ADDRESS,
          abi: [{
            name: 'account',
            type: 'function',
            stateMutability: 'view',
            inputs: [
              { name: 'implementation', type: 'address' },
              { name: 'chainId', type: 'uint256' },
              { name: 'tokenContract', type: 'address' },
              { name: 'tokenId', type: 'uint256' },
              { name: 'salt', type: 'uint256' }
            ],
            outputs: [{ name: '', type: 'address' }]
          }],
          functionName: 'account',
          args: [
            IMPLEMENTATION_ADDRESS,
            BigInt(SEPOLIA_ID),
            AGENT_NFT_ADDRESS,
            BigInt(tokenId as number), // Casting fixes the 'number | null' error
            BigInt(0)
          ]
        })
        setTbaAddress(addr as string)
      } catch (err) {
        setTbaAddress("Address Pending Mint")
      }
    }

    fetchTBA()
  }, [tokenId, publicClient, isConnected])

  return { tbaAddress }
}