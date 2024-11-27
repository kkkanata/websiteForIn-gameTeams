import type { AppProps } from 'next/app'
import { Provider } from '../components/ui/provider'
import { initializeFirebaseApp } from '@src/lib/firebase/firebase'
import { getApp } from 'firebase/app'
import { AuthProvider } from '@src/feature/auth/provider/AuthProvider'
import { Header } from '@src/component/Header/Header'

initializeFirebaseApp()
function MyApp({ Component, pageProps }: AppProps) {
  console.log(getApp())
  return (
    //最近の更新により

    <Provider>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}
export default MyApp
