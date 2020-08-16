import React, {useEffect, useState} from "react"
import {Link} from "gatsby"
import styled from 'styled-components'
import posed from 'react-pose'
import {useLocation} from '@reach/router'
import {Box} from 'rebass'

import BackIcon from '../../svg/BackIcon';

const BackPoses = posed(Link)({
    hidden: {
        opacity: 0,
        transition: {
            duration: 150,
            ease: [0.25,0.1,0.25,1]
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 150,
            ease: [0.25,0.1,0.25,1]
        }
    }
});

const BackStyle = styled(BackPoses)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 9px 10px 7px;
  height: 30px;
  width: fit-content;
  overflow: hidden;
  background-color: ${props => props.theme.colors.black};
  border-radius: 20px;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes[1]}px;
  line-height: 1;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: .04rem;
  opacity: 0;
  transition: all .3s;
  &:hover {
    background-color: ${props => props.theme.colors.fuscousGrey};
    color: ${props => props.theme.colors.white};
    @media (max-width: ${props => props.theme.breakpoints[2]}px) {
      background-color: ${props => props.theme.colors.black};
    }
  }
`

const BackIconStyle = styled.div`
  transform: translateY(-2px);
`

const Back = () => {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const pathname = location.pathname;

    useEffect(() => {
        pathname === '/' ? setVisible(false) : setVisible(true);
    }, [pathname]);

    return (
        <BackStyle to="/" initialPose={'hidden'} pose={visible ? 'visible' : 'hidden'}>
            <Box as={BackIconStyle} sx={{mr: '8px'}}>
                <BackIcon/>
            </Box>
            Back
        </BackStyle>
    )
}

export default Back
