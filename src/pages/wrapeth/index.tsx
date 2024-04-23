import {
  Layout,
  Text,
  NewButton,
  FlexDBox,
  CloseButton,
  CollectButton,
  Container,
} from './style'
import { Input, InputGroup, useToast, CircularProgress } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import useWallet from '@/hooks/use-wallet'
import WalletsModal from '@/components/common/wallets-modal'
import { useDisconnect } from 'wagmi'
import dynamic from 'next/dynamic'
import { useAtomValue } from 'jotai'
import { providerWeb3Modal, signerWeb3Modal } from '@/store'
import { ethers } from 'ethers'
import { clsx } from 'clsx'

const TOKEN_ADDRESS = '0xd0df82de051244f04bff3a8bb1f62e1cd39eed92'

const abi = [
  'function approve(address spender, uint256 amount) public returns (bool)',
  'function balanceOf(address addr) external view returns (uint256)',
  'function deposit() payable external',
  'function withdraw(uint256 amount) external',
]

const WrapEthPage = () => {
  const [amount, setAmount] = useState<string>('')
  const { disconnect } = useDisconnect()
  const { isConnected, address, openWalletModal } = useWallet()
  const provider = useAtomValue<any>(providerWeb3Modal)
  const signer = useAtomValue<any>(signerWeb3Modal)
  const [balance, setBalance] = useState('0')
  const [wethBalance, setWethBalance] = useState('0')
  const [contract, setContract] = useState<ethers.Contract>()
  const toast = useToast()
  const [tabIndex, setTabIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const updateBalance = async (contract: ethers.Contract) => {
    if (!address) return
    provider
      ?.getBalance(address)
      .then((res: any) => setBalance(ethers.utils.formatEther(res)))

    try {
      const ba = await contract.balanceOf(address)
      const value = ethers.utils.formatEther(ba)
      setWethBalance(value)
    } catch (e) {
      setWethBalance('0')
    }
  }

  const onClickWrap = async () => {
    if (amount === '0' || amount === '') return
    try {
      let num = ethers.utils.parseEther(amount)

      if (parseFloat(amount) > parseFloat(balance)) {
        toast({
          description: 'Amount should be smaller than ETH balance',
          position: 'top',
          duration: 2000,
          status: 'error',
          isClosable: true,
        })
        return
      }
      const res = await contract?.deposit({
        value: num,
      })
      setLoading(true)
      const results = await res.wait()
      updateBalance(contract as ethers.Contract)
      setLoading(false)
      toast({
        description: JSON.stringify('Wrap ETH successfully!'),
        position: 'top',
        duration: 2000,
        status: 'success',
        isClosable: true,
      })
    } catch (err) {
      toast({
        description: JSON.stringify(err),
        position: 'top',
        duration: 2000,
        status: 'error',
        isClosable: true,
      })
    }
  }

  const onClickUnwrap = async () => {
    if (amount === '0' || amount === '') return
    if (parseFloat(amount) > parseFloat(wethBalance)) {
      toast({
        description: 'Amount should be smaller than WETH balance',
        position: 'top',
        duration: 2000,
        status: 'error',
        isClosable: true,
      })
      return
    }
    try {
      let num = ethers.utils.parseEther(amount)

      const res = await contract?.withdraw(num)

      setLoading(true)
      const result = await res.wait()

      updateBalance(contract as ethers.Contract)
      setLoading(false)

      toast({
        description: 'Unwrap WETH successfully!',
        position: 'top',
        duration: 2000,
        status: 'success',
        isClosable: true,
      })
    } catch (err) {
      toast({
        description: JSON.stringify(err),
        position: 'top',
        duration: 2000,
        status: 'error',
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (isConnected && address) {
      provider
        ?.getBalance(address)
        .then((res: any) => setBalance(ethers.utils.formatEther(res)))
    } else {
      setBalance('0.0')
    }
  }, [isConnected, address, provider])

  useEffect(() => {
    let wethContract = new ethers.Contract(TOKEN_ADDRESS, abi, signer)
    updateBalance(wethContract)

    setContract(wethContract)
  }, [signer])

  return (
    <Layout>
      <span className="mb-4 w-full text-center text-[24px] font-bold text-white">
        ETH Wrapping tool
      </span>
      {isConnected ? (
        <>
          <div className="mb-8 flex h-[40px] w-full cursor-pointer flex-row overflow-clip rounded-[5px] bg-[#aaa] shadow-primary">
            <div
              className={clsx(
                'flex flex-1 cursor-pointer flex-row items-center justify-center',
                tabIndex === 0 ? ' bg-green-500 text-white' : 'bg-transparent',
              )}
              onClick={() => setTabIndex(0)}
            >
              <span className={clsx('text-sm')}>Wrap ETH</span>
            </div>
            <div
              className={clsx(
                'flex flex-1 cursor-pointer flex-row items-center justify-center',
                tabIndex === 1 ? ' bg-green-500 text-white' : 'bg-transparent',
              )}
              onClick={() => setTabIndex(1)}
            >
              <span className={clsx('text-sm')}>Unwrap WETH</span>
            </div>
          </div>
          <InputGroup size="md">
            <Input
              type="number"
              placeholder="Input amount"
              size="lg"
              color={'#fff'}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </InputGroup>
          <div className="mt-4 flex w-full flex-row items-center justify-center">
            {tabIndex === 0 ? (
              <NewButton
                className="w-32 bg-green-500 text-white"
                onClick={onClickWrap}
              >
                Wrap ETH
              </NewButton>
            ) : (
              <NewButton
                className="w-32 bg-green-500 text-white"
                onClick={onClickUnwrap}
              >
                Unwrap WETH
              </NewButton>
            )}
          </div>
        </>
      ) : (
        <div className="h-16" />
      )}
      {isConnected ? (
        <Container className="mt-14">
          <FlexDBox className="mt-4">
            <Text>ETH Balance:</Text>
            <Text className="mt-2">{balance.toString().substr(0, 8)} ETH</Text>
          </FlexDBox>
          <FlexDBox className="mt-4">
            <Text>WETH Balance:</Text>
            <Text className="mt-2">
              {wethBalance.toString().substr(0, 8)} WETH
            </Text>
          </FlexDBox>
          <FlexDBox className="mt-4">
            <Text>Wallet Address:</Text>
            <Text className="mt-2">{address}</Text>
          </FlexDBox>
          <div className="flex w-full flex-row items-center justify-center">
            <CloseButton className="mt-4" onClick={() => disconnect()}>
              Disconnect
            </CloseButton>
          </div>
        </Container>
      ) : (
        <div className="flex w-full flex-row items-center justify-center">
          <CollectButton
            className="px-4 py-2"
            variant={'primary'}
            onClick={openWalletModal}
          >
            Connect Wallet
          </CollectButton>
        </div>
      )}
      <WalletsModal></WalletsModal>
      {loading && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[#0006]">
          <CircularProgress isIndeterminate color="#22C65F" />
        </div>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(WrapEthPage), { ssr: false })
