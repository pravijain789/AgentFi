'use client'

import { useWriteContract } from 'wagmi' // This fixes the 'Cannot find name' errors
import { AGENT_NFT_ADDRESS } from '@/lib/constants'
import { parseEther } from 'viem'

const MINT_ABI = [{
  name: 'mint',
  type: 'function',
  stateMutability: 'payable',
  inputs: [{ name: 'to', type: 'address' }],
}] as const

export function useMint() {
  const { writeContract, isPending, error } = useWriteContract()

  const mintAgent = (address: string) => {
    if (!address) return;
    writeContract({
      address: AGENT_NFT_ADDRESS,
      abi: MINT_ABI,
      functionName: 'mint',
      args: [address as `0x${string}`],
      value: parseEther('0.001'),
      gas: BigInt(200000), 
    })
  }

  return { mintAgent, isPending, error }
}