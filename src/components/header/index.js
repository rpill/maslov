import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'rebass'
import { space } from '../../styles/Theme'

import Back from '../back'
import Logo from './Logo'

const HeaderStyle = styled.header`
  position: fixed;
  z-index: 100;
  padding: ${space[1]}px;
  height: 100px;
  width: 100%;
  top: 0;
  left: 0;
`

const HeaderBackStyle = styled.div`
  @media (max-width: ${props => props.theme.breakpoints[2]}px) {
      display: none;
  }
`

const HeaderLogoStyle = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: ${props => props.theme.breakpoints[0]}px) {
    top: 20px;
  }
`

const Header = () => (
  <Flex as={HeaderStyle}>
    <Box as={HeaderBackStyle}>
      <Back/>
    </Box>
    <Box as={HeaderLogoStyle}>
      <Logo/>
    </Box>
  </Flex>
)

export default Header
