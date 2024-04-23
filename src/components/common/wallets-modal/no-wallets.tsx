import { jump } from '@/utils'
import { Button, Text } from '@chakra-ui/react'

const wallets = [
  {
    // icon: <MetamaskIcon />,
    title: 'MetaMask',
    link: 'https://metamask.io/',
  },
  {
    // icon: <Coin98Icon />,
    title: 'Coin98',
    link: 'https://wallet.coin98.com/',
  },
  {
    // icon: <CoinbaseIcon />,
    title: 'Coinbase Wallet',
    link: 'https://www.coinbase.com/wallet',
  },
]

export default function NoWallets() {
  return (
    <div className="flex flex-col gap-4 pt-4 text-a1">
      {wallets.map((w) => (
        <div key={w.title} className="tw-align-center h-16 px-6 hover:bg-a7">
          {/* {w.icon} */}
          <Text className="ml-4">{w.title}</Text>
          <Button
            className="ml-auto h-[28px] px-4 py-1 text-sm"
            variant={'outlinedBlack'}
            onClick={() => jump(w.link)}
          >
            Get
          </Button>
        </div>
      ))}
    </div>
  )
}
