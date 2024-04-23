import { useEffect, useState } from 'react'
import {
  Connector,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
} from 'wagmi'

export default function WalletButton() {
  const [hasMounted, setHasMounted] = useState(false)
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { data } = useBalance({ address })
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const handleConnect = (connector: Connector) => {
    if (!isConnected) {
      connect({ connector })
    }
  }

  if (!hasMounted) {
    return null
  }

  return (
    <div className="flex h-40 flex-col items-center justify-center space-y-3 bg-slate-500 text-white">
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => handleConnect(connector)}
        >
          {!isConnected ? connector.name : ''}
        </button>
      ))}

      {isConnected && (
        <>
          <div>address: {address}</div>
          <div>
            balance: {data?.formatted} {data?.symbol}
          </div>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      )}
    </div>
  )
}
