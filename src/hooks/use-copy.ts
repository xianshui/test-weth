import { useClipboard } from '@chakra-ui/react'

const useCopy = () => {
  const { setValue, value, onCopy, hasCopied } = useClipboard('')
  return {
    value,
    copy(str: string = '') {
      setValue(str)
      onCopy()
    },
    hasCopied,
  }
}
export default useCopy
