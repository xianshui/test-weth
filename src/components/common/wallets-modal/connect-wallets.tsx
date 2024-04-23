import { Dispatch, SetStateAction } from 'react'
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

const ConnectWallets: React.FC<IProps> = ({ isConnected }) => {
  const { connect, connectors } = useConnect()
  const handleConnect = (connector: Connector) => {
    if (!isConnected) {
      connect({ connector })
    }
  }

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
    </div>
  )
}

export default ConnectWallets
