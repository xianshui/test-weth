import styled from 'styled-components'
import { HTMLAttributes } from 'react'

interface CustomDivProps extends HTMLAttributes<HTMLDivElement> {
  padding?: string
  margin?: string
  alignItems?: string
  justifyContent?: string
  flexWrap?: string
  gap?: string
  flexDirection?: string
}

export const HorizonCenterWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const HorizonBaselineWrapper = styled.div`
  display: flex;
  align-items: baseline;
`

export const CenterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const RowWrapper = styled(CenterWrapper)<CustomDivProps>`
  justify-content: space-between;
  padding: ${(props) => props.padding || '3em 2em 4em'};
  align-items: ${(props) => props.alignItems};
`

export const FlexWrapper = styled.div<CustomDivProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'center'};
  flex-wrap: ${(props) => props.flexWrap || 'no-wrap'};
  margin: ${(props) => props.margin || '0'};
  gap: ${(props) => props.gap || '0'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
`

export const SpaceBetweenWrapper = styled.div<CustomDivProps>`
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => props.alignItems || 'center'};
  flex-wrap: ${(props) => props.flexWrap || 'no-wrap'};
  margin: ${(props) => props.margin || '0'};
  gap: ${(props) => props.gap || '0'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
`

export const ColumnCenterWrapper = styled.div<CustomDivProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'center'};
  flex-wrap: ${(props) => props.flexWrap || 'no-wrap'};
  margin: ${(props) => props.margin || '0'};
  gap: ${(props) => props.gap || '0'};
`
