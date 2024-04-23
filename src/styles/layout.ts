import styled from 'styled-components'

export const Layout = styled.div<{ isEven: boolean }>`
  background-color: ${(props) => (props.isEven ? '#FFFFFF' : '#FAFAFA')};
`

export const Card = styled.div`
  width: 1200px;
  margin: 0 auto;
`
