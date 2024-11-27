import { chakra, Container, Heading } from '@chakra-ui/react'
import { Button } from '../../components/ui/button'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { FirebaseError } from '@firebase/util'
import { getAuth, signOut } from 'firebase/auth'
//import { useState } from 'react'
import { useRouter } from 'next/router'
import { Toaster, toaster } from '../../components/ui/toaster'
import { useState } from 'react'

export const Header = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user } = useAuthContext()
  //const [isLoading, setIsLoading] = useState<boolean>(false)
  const { push } = useRouter()
  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const auth = getAuth()
      await signOut(auth)
      toaster.success({
        title: 'ログアウトしました。',
        type: 'success',
        //description: "File saved successfully to the server",
      })
      push('/signin')
    } catch (e) {
      if (e instanceof FirebaseError) {
        toaster.error({
          title: 'エラーが発生しました。',
          type: 'error',
          //description: "File saved successfully to the server",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <chakra.header py={4} bgColor={'blue.600'}>
      <Container maxW={'container.lg'}>
        <Heading color={'white'}>
          <Toaster />
          {user ? (
            <Button
              colorScheme={'teal'}
              loading={isLoading}
              loadingText="サインアウト中"
              onClick={handleSignOut}
            >
              サインアウト
            </Button>
          ) : (
            'ログアウト中'
          )}
        </Heading>
      </Container>
    </chakra.header>
  )
}
