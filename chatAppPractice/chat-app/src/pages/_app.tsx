import type { AppProps } from 'next/app'
import { Provider } from '../components/ui/provider'
import { initializeFirebaseApp } from '@src/lib/firebase/firebase'
import { getApp } from 'firebase/app'
import { AuthProvider } from '@src/feature/auth/provider/AuthProvider'
import { Header } from '@src/component/Header/Header'
import { Footer } from '@src/component/Footer/Footer'
import { chakra } from '@chakra-ui/react'
//chakra ui の公式スニペット Provider を拡張テーマを使用するように直接変更した。

initializeFirebaseApp()
function MyApp({ Component, pageProps }: AppProps) {
  console.log(getApp())
  return (
    //最近の更新により

    <Provider>
      <AuthProvider>
        <Header />
        <chakra.main
          flex={1}
          display={'flex'}
          flexDirection={'column'}
          minHeight={0}
        >
          <Component {...pageProps} />
        </chakra.main>
        <Footer />
      </AuthProvider>
    </Provider>
  )
}
export default MyApp
