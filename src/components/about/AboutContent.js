import React from 'react'
import styled from 'styled-components'
import { Box } from 'rebass'
import { space } from '../../styles/Theme'

const AboutContentStyle = styled.div`
  position: relative;
  z-index: 2;
  align-self: center;
  max-width: 65%;
  @media (max-width: ${props => props.theme.fontSizes[3]}px) {
    max-width: 55%;
  }
  @media (max-width: 1024px) {
    max-width: none;
  }
  @media (min-width: ${props => props.theme.breakpoints[1]+1}px) {
    transform: none!important;
  }
`

const AboutContentOverlayStyle = styled.div`
  position: absolute;
  left: ${-space[1]}px;
  right: ${-space[1]}px;
  top: 50%;
  height: 160vh;
  margin-top: -80vh;
  @media (min-width: ${props => props.theme.breakpoints[1]+1}px) {
    display: none;
  }
  &:after {
    content: '';
    display: block;
    height: 100%;
    background: linear-gradient(180deg, rgba(29, 28, 30, 0) 0%, ${props => props.theme.colors.jaguar} 20%);
    opacity: .8;
  }
`

const AboutContentTextStyle = styled.p`
  position: relative;
  color: ${props => props.theme.colors.yellow};
  font-size: ${props => props.theme.fontSizes[5]}px;
  line-height: 1.35;
  letter-spacing: .05rem;
  text-transform: uppercase;
  @media (max-width: ${props => props.theme.breakpoints[4]}px) {
    font-size: ${props => props.theme.fontSizes[4]}px;
  }
  @media (max-width: ${props => props.theme.breakpoints[3]}px) {
    font-size: ${props => props.theme.fontSizes[3]}px;
  }
  @media (max-width: ${props => props.theme.breakpoints[1]}px) {
    font-size: 18px;
    line-height: 1.5;
    user-select: none;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}px) {
    font-size: ${props => props.theme.fontSizes[2]}px;
  }
  @media (max-width: 374px) {
    font-size: ${props => props.theme.fontSizes[1]}px;
  }
`

const AboutContent = () => {
    return (
        <Box as={AboutContentStyle}>
            <AboutContentOverlayStyle>{''}</AboutContentOverlayStyle>
            <AboutContentTextStyle>
                Hi! I&rsquo;m Nikita Maslov, I&nbsp;specialize in&nbsp;
                <nobr>hand-crafted</nobr>
                and web illustration, logotype and
                typography design. Currently working as&nbsp;a&nbsp;
                <nobr>full-time</nobr>
                freelancer. I&rsquo;m focused
                on&nbsp;creating
                original and conceptual solutions for brands, editorial designs, covers, various print and
                visual
                communications
            </AboutContentTextStyle>
        </Box>
    )
}

export default AboutContent
