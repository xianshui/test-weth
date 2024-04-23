import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from '@/theme'

const emotionCache = createCache({
  key: 'css',
  prepend: true,
})

export default function ChaProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
