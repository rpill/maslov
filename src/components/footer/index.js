import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'rebass'
import { space } from '../../styles/Theme'

import Back from '../back'
import Social from "../social";

const FooterStyle = styled.footer`
  position: fixed;
  justify-content: center;
  z-index: 100;
  padding: ${space[1]}px;
  height: 100px;
  width: 100%;
  bottom: 0;
  left: 0;
  @media (max-width: ${props => props.theme.breakpoints[2]}px) {
    justify-content: space-between;
    height: auto;
  }
`

const FooterBackStyle = styled.div`
  display: none;
  @media (max-width: ${props => props.theme.breakpoints[2]}px) {
    display: block;
  }
`

const Footer = ({socialList}) => {
    return (
        <Flex as={FooterStyle}>
            <Box as={FooterBackStyle}>
                <Back/>
            </Box>
            <Box>
                <Social list={socialList}/>
            </Box>
        </Flex>
    )
}

export default Footer
