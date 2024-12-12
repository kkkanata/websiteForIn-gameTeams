import { Box, chakra, Container, Flex } from '@chakra-ui/react'
import { Navigate } from '@src/component/Navigate/Navigate'

export const Footer = () => {
  return (
    <chakra.footer py={4} bgColor={'blue.600'} color={'white'}>
      <Container maxW={'container.lg'}>
        <Flex flexDirection={'column'} gap={2} alignItems={'start'}>
          <Box lineHeight={1} _hover={{ color: 'green' }}>
            <Navigate href={(path) => path.$url()}>トップページ </Navigate>
          </Box>

          <Box lineHeight={1} _hover={{ color: 'green' }}>
            <Navigate href={(path) => path.signin.$url()}>サインイン </Navigate>
          </Box>

          <Box lineHeight={1} _hover={{ color: 'green' }}>
            <Navigate href={(path) => path.signup.$url()}>
              サインアップ{' '}
            </Navigate>
          </Box>

          <Box lineHeight={1} _hover={{ color: 'green' }}>
            <Navigate href={(path) => path.chat.$url()}>チャット </Navigate>
          </Box>
        </Flex>
      </Container>
    </chakra.footer>
  )
}
