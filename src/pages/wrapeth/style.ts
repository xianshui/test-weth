import styled from 'styled-components'
import { Button } from '@chakra-ui/react'

export const Layout = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  padding: 30px;
  width: 460px;
  height: 600px;
  background-color: var(--a2);
  border-radius: 12px;
  overflow: clip;
`

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Text = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  color: #ffffff;
`

export const FlexDBox = styled.div`
  display: flex;
  flex-direction: column;
`

export const NewButton = styled(Button)`
  width: 140px;
  height: 48px;
`

export const CloseButton = styled(Button)`
  margin-top: 24px;
  width: 320px;
  height: 48px;
  background-color: var(--primary);
  color: #fff;
`

export const CollectButton = styled(Button)`
  margin-top: 100px;
  width: 320px;
  height: 48px;
  background-color: rgb(34 197 94);
  color: #fff;
`

export const Container = styled.div`
  border-top: 1px solid #ffffff;
`
