import React from "react"
import styled, { keyframes } from 'styled-components'
import { Box } from 'rebass'
import RotateDeviceIcon from "../../svg/RotateDeviceIcon"

const RotateDeviceStyle = styled.div`
    position: fixed;
    z-index: 100000;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.jaguar};
    opacity: 0;
    visibility: hidden;
    text-align: center;
    @media (max-width: 1024px) and (min-width: 480px) and (orientation: landscape) {
        opacity: 1;
        visibility: visible;
    }
`

const blink = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
`;

const RotateDeviceContentStyle = styled.div`
    animation: ${blink} 2s infinite;
`

const RotateDeviceTextStyle = styled.div`
    font-size: ${props => props.theme.fontSizes[1]}px;
    color: ${props => props.theme.colors.white};
    text-transform: uppercase;
`

const RotateDevice = () => {
    return (
        <Box as={RotateDeviceStyle}>
            <Box as={RotateDeviceContentStyle}>
                <Box sx={{mb: '7px'}}>
                    <RotateDeviceIcon/>
                </Box>
                <Box as={RotateDeviceTextStyle}>Flip Your Phone</Box>
            </Box>
        </Box>
    );
}

export default RotateDevice;
