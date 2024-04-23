import WagmiProvider from '@/provider/wagmi'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import ChaProvider from '@/provider/chakra'
import clsx from 'clsx'
import { ethers } from 'ethers'
import { providerWeb3Modal, signerWeb3Modal } from '@/store'
import { useSetAtom } from 'jotai'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const setProviderWeb3Modal = useSetAtom(providerWeb3Modal)
  const setSignerWeb3Modal = useSetAtom(signerWeb3Modal)

  useEffect(() => {
    let providerWeb3Modal: any = ''
    let signerWeb3Modal = ''
    const ethereum = window.ethereum as any

    const updateProviderAndSigner = async () => {
      providerWeb3Modal = new ethers.providers.Web3Provider(ethereum)
      setProviderWeb3Modal(providerWeb3Modal)

      signerWeb3Modal = await providerWeb3Modal.getSigner()
      setSignerWeb3Modal(signerWeb3Modal)
    }

    ethereum?.on('chainChanged', async () => {
      updateProviderAndSigner()
    })

    updateProviderAndSigner()
  }, [])

  return (
    <ChaProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <WagmiProvider>
          <main className={clsx(inter.className, 'flex min-h-screen flex-col')}>
            <Component {...pageProps} />
          </main>
        </WagmiProvider>
      </ThemeProvider>
    </ChaProvider>
  )
}
