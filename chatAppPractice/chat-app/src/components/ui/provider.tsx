'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { Theme } from '@src/lib/chakra/theme'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'

//このコンポーネントを直接変更した。変更前は以下のようになる
//import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
//<ChakraProvider value={defaultSystem}>
export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={Theme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
