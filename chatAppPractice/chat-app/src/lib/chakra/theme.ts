import { createSystem, defaultConfig } from '@chakra-ui/react'

export const Theme = createSystem(defaultConfig, {
  globalCss: {
    'html, body,#__next': {
      height: '100%',
      '&': {
        height: '100svh',
      },
    },
    '#__next': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
})
