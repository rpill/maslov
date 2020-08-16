import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { space } from '../../styles/Theme'

import backgroundImage from '../../assets/images/about/background.png';
import backgroundMobileImage from '../../assets/images/about/background-mobile.png';
import AboutContent from "./AboutContent";
import AboutImage from "./AboutImage";

const AboutStyle = styled.div`
  position: relative;
  z-index: 2;
  background: ${props => props.theme.colors.red} url(${backgroundImage}) center no-repeat;
  background-size: cover;
  padding: ${space[1] * 2}px ${space[1]}px;
  min-height: 100vh;
      transition: opacity .3s;
  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: space-between;
    padding: 144px ${space[1]}px ${space[1] * 2}px;
  }
  @media (max-width: ${props => props.theme.breakpoints[1]}px) {
    justify-content: center;
    overflow: hidden;
    padding: 75px ${space[1]}px;
    background-image: url(${backgroundMobileImage});
  }
  &:after {
    content: '';
    position: absolute;
    z-index: 2;
    display: none;
    bottom: 0;
    left: 0;
    right: 0;
    height: 15vh;
    background: linear-gradient(180deg, rgba(29, 28, 30, 0) 0%, ${props => props.theme.colors.jaguar} 100%);
    pointer-events: none;
    @media (max-width: ${props => props.theme.breakpoints[1]}px) {
      display: block;
    }
  }
`

const About = () => {
    return (
        <Flex as={AboutStyle}>
            <AboutContent/>
            <AboutImage/>
        </Flex>
    )
  }

export default About
