import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const redd = definePartsStyle({
  field: {
    border: '1px solid var(--a5)',
    fontsize: '14px',
    borderRadius: '6px',
    color: 'var(--a1)',
    caretColor: 'var(--primary)',
    pl: 2,
    bg: 'transparent',
    _focus: {
      borderColor: 'var(--a3)',
    },
  },
})

export const inputTheme = defineMultiStyleConfig({
  variants: { redd },
  defaultProps: {
    variant: 'redd',
  },
})
