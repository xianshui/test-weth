import { InjectedConnectorOptions } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Chain } from 'wagmi'

declare global {
  interface Window {
    coin98?: any
  }
}

export class Coin98Connector extends InjectedConnector {
  readonly id = 'coin98'
  readonly ready = typeof window != 'undefined' && window.coin98

  provider?: Window['ethereum']

  constructor({
    chains,
    options,
  }: { chains?: Chain[]; options?: InjectedConnectorOptions } = {}) {
    super({ chains, options: { name: 'Coin98', ...options } })
  }

  async getProvider() {
    if (typeof window !== 'undefined') {
      return window.coin98?.provider
    }
    return
  }
}
