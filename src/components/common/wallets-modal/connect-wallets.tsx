// import Coin98Icon from '@/components/icons/coin98-icon'
// import CoinbaseIcon from '@/components/icons/coinbase-icon'
// import InfoIcon from '@/components/icons/info-icon'
// import MetamaskIcon from '@/components/icons/metamask-icon'
import { CloseButton, Divider, Text } from '@chakra-ui/react'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'
import { Connector, useConnect } from 'wagmi'

const walletsMap: Record<string, { name: string }> = {
  metaMask: {
    // icon: <MetamaskIcon />,
    name: 'MetaMask',
  },
  coinbaseWallet: {
    // icon: <CoinbaseIcon />,
    name: 'Coinbase Wallet',
  },
  coin98: {
    // icon: <Coin98Icon />,
    name: 'Coin98',
  },
}

interface IProps {
  isConnected: boolean
  setStep: Dispatch<SetStateAction<'index' | 'noWallets'>>
}

const ConnectWallets: React.FC<IProps> = ({ isConnected, setStep }) => {
  const { connect, connectors } = useConnect()
  const handleConnect = (connector: Connector) => {
    if (!isConnected) {
      connect({ connector })
    }
  }
  const [hidden, setHidden] = useState(false)

  return (
    <div className="flex h-full flex-col pb-6 pt-4">
      <div className="flex flex-grow flex-col gap-4 text-base font-semibold">
        {connectors.map((c) => (
          <div
            key={c.name}
            role="button"
            onClick={() => handleConnect(c)}
            className="tw-align-center h-14 gap-4 px-6 hover:bg-a7"
          >
            {/* {walletsMap[c.id].icon} */}
            {walletsMap[c.id].name}
          </div>
        ))}
      </div>
      {/* <div
        className={clsx(
          'relative mx-6 mt-2.5 flex rounded-lg bg-[#e30051]/5 py-2 pr-[26px] text-xs text-down',
          hidden && 'hidden',
        )}
      >
        <CloseButton
          onClick={() => setHidden(true)}
          className="absolute right-0 top-0 scale-90 hover:bg-transparent"
        />
      </div> */}
      {/* <Divider className="mb-4 mt-3 border-a6" />
      <Text
        as={'button'}
        className="w-full text-center text-a1 hover:text-a2"
        onClick={() => setStep('noWallets')}
      >
        I don’t have a wallet
      </Text>
      <Text className="mt-2 px-8 text-center text-a3">
        By connecting your wallet you agree to the
        <span className="text-a2"> Terms of Service</span> and
        <span className="text-a2"> Privacy Policy</span>
      </Text> */}
    </div>
  )
}

export default ConnectWallets
