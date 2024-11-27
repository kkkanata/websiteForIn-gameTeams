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
import { Toaster, toaster } from '../../components/ui/toaster'
import { FormEvent, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'

export const Page = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await sendEmailVerification(userCredential.user)
      setEmail('')
      setPassword('')

      toaster.success({
        title: '確認メールを送信しました。',
        type: 'success',
        //description: "File saved successfully to the server",
      })
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
      <Heading>サインアップ</Heading>
      <Toaster />
      <chakra.form onSubmit={handleSubmit}>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={'contents'}>
            <Field label="メールアドレス" required>
              <Input
                type={'email'}
                name={'email'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </Field>
            <Field label="パスワード" required>
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
            アカウントを作成
          </Button>
        </Center>
      </chakra.form>
    </Container>
  )
}

export default Page
