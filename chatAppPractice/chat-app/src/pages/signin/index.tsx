import {
  Box,
  Center,
  chakra,
  Container,
  Grid,
  Heading,
  Input,
  Spacer,
} from '@chakra-ui/react'
import { Field } from '../../components/ui/field'
import { Button } from '../../components/ui/button'
import { FormEvent, useState } from 'react'
import { useRouter } from '@src/hooks/useRouter/useRouter'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { Toaster, toaster } from '../../components/ui/toaster'

export const Page = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { push } = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
      toaster.success({
        title: 'ログインしました。',
        type: 'success',
        //description: "File saved successfully to the server",
      })
      push((path) => path.chat.$url())
    } catch (e) {
      toaster.error({
        title: 'エラーが発生しました。',
        type: 'error',
        //description: "File saved successfully to the server",
      })
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Container py={14}>
      <Heading>サインイン</Heading>
      <chakra.form onSubmit={handleSubmit}>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={'contents'}>
            <Field label="メールアドレス">
              <Toaster />
              <Input
                type={'email'}
                name={'email'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </Field>
            <Field label="パスワード">
              <Input
                type={'password'}
                name={'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </Field>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
        <Center>
          <Button type={'submit'} loading={isLoading} loadingText="確認中">
            ログイン
          </Button>
        </Center>
      </chakra.form>
    </Container>
  )
}

export default Page
