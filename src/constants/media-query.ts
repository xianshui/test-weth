import {
  FlattenSimpleInterpolation,
  SimpleInterpolation,
  css,
} from 'styled-components'

enum MediaLabel {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Phone = 'phone',
}

const sizes: Record<MediaLabel, number> = {
  [MediaLabel.Desktop]: 992,
  [MediaLabel.Tablet]: 768,
  [MediaLabel.Phone]: 376,
}

type MediaFunction = (
  literals: TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
) => FlattenSimpleInterpolation

const media: Record<MediaLabel, MediaFunction> = Object.keys(sizes).reduce(
  (acc, label) => {
    const emSize = sizes[label as MediaLabel] / 16
    acc[label as MediaLabel] = (...args) => css`
      @media (max-width: ${emSize}em) {
        ${css(...args)}
      }
    `
    return acc
  },
  {} as Record<MediaLabel, MediaFunction>,
)

export default media
