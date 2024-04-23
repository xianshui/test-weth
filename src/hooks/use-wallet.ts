import { showWalletModalAtom } from '@/store/wallet'
import { useAtom } from 'jotai'
import { useAccount, useBalance, useEnsName } from 'wagmi'

export default function useWallet() {
  const [isWalletModalOpen, setShowWalletModal] = useAtom(showWalletModalAtom)
  const { isConnected, address } = useAccount()
  const { data: balance } = useBalance({ address })
  const { data: ensName } = useEnsName({ address })
  return {
    openWalletModal() {
      setShowWalletModal(true)
    },
    closeWalletModal() {
      setShowWalletModal(false)
    },
    isWalletModalOpen,
    isConnected,
    address,
    balance,
    ensName,
  }
}
