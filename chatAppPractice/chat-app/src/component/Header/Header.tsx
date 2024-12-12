import { Flex, chakra, Container, Heading, Spacer } from '@chakra-ui/react'
import { Button } from '../../components/ui/button'
import { Avatar } from '../../components/ui/avatar'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '../../components/ui/menu'

import { FirebaseError } from '@firebase/util'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from '@src/hooks/useRouter/useRouter'
import { Toaster, toaster } from '../../components/ui/toaster'
import { Navigate } from '@src/component/Navigate/Navigate'

export const Header = () => {
  const { user } = useAuthContext()
  const { push } = useRouter()
  const handleSignOut = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      toaster.success({
        title: 'ログアウトしました。',
        type: 'success',
        //description: "File saved successfully to the server",
      })
      push((path) => path.signin.$url())
    } catch (e) {
      if (e instanceof FirebaseError) {
        toaster.error({
          title: 'エラーが発生しました。',
          type: 'error',
          //description: "File saved successfully to the server",
        })
      }
    }
  }
  return (
    <chakra.header py={4} bgColor={'blue.600'}>
      <Container maxW={'container.lg'}>
        <Toaster />
        <Flex>
          <Heading color={'white'} _hover={{ color: 'green' }}>
            {' '}
            <Navigate href={(path) => path.$url()}>
              Firebase Realtime Chat
            </Navigate>
          </Heading>

          <Spacer aria-hidden />
          {user ? (
            <MenuRoot>
              <MenuTrigger asChild>
                <Button>
                  <Avatar flexShrink={0} width={10} height={10} />
                </Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="move to signinPage" onClick={handleSignOut}>
                  サインアウト
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          ) : (
            <Button colorScheme={'teal'}>
              <Navigate href={(path) => path.signin.$url()}>
                サインイン
              </Navigate>
            </Button>
          )}
        </Flex>
      </Container>
    </chakra.header>
  )
}
