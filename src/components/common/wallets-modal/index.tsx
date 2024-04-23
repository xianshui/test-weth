// import LeftIcon from '@/components/icons/left-icon'
import useWallet from '@/hooks/use-wallet'
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import NoWallets from './no-wallets'
import ConnectWallets from './connect-wallets'

export default function WalletsModal() {
  const { isConnected, closeWalletModal, isWalletModalOpen } = useWallet()
  const [step, setStep] = useState<'index' | 'noWallets'>('index')

  useEffect(() => {
    if (isConnected) {
      closeWalletModal()
    }
  }, [closeWalletModal, isConnected])

  return (
    <>
      <Modal
        isOpen={isWalletModalOpen}
        onClose={closeWalletModal}
        variant={'dialog'}
      >
        <ModalOverlay />
        <ModalContent maxW={389} maxH={468} minH={414}>
          <ModalHeader className="tw-align-center">
            {step === 'index' && 'Connect Wallet'}
            {step === 'noWallets' && (
              <>
                <IconButton
                  onClick={() => setStep('index')}
                  className="mr-2 h-6 w-6"
                  aria-label="back"
                  variant={'link'}
                  // icon={<LeftIcon className="h-7 w-7 align-bottom" />}
                />
                I dont have a wallet
              </>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="px-0">
            {step === 'noWallets' && <NoWallets />}
            {step === 'index' && (
              <ConnectWallets setStep={setStep} isConnected={isConnected} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
