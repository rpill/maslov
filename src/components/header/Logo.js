import React, {useContext, useEffect, useState} from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import posed from 'react-pose'
import { Box } from 'rebass'

import { LayoutContext } from '../../layouts/layoutContext'

import LogoIcon from '../../svg/LogoIcon';
import {useLocation} from "@reach/router";

const LogoStyle = styled(props => <Link {...props} />)`
  &.home {
    color: ${props => props.theme.colors.white};
    svg {
      fill: ${props => props.theme.colors.white};
    }
  }
  &.typography {
    color: ${props => props.theme.colors.red};
    svg {
      fill: ${props => props.theme.colors.red};
    }
  }
  &.logo-design {
    color: ${props => props.theme.colors.green};
    svg {
      fill: ${props => props.theme.colors.green};
    }
  }
  &.illustrations {
    color: ${props => props.theme.colors.blue};
    svg {
      fill: ${props => props.theme.colors.blue};
    }
  }
  &.about {
    color: ${props => props.theme.colors.yellow};
    svg {
      fill: ${props => props.theme.colors.yellow};
    }
  }
`

const LogoIconStyle = styled.div`
  svg {
    transition: all .3s;
    @media (max-width: ${props => props.theme.breakpoints[0]}px) {
      width: 59px;
      height: 32px;
    }
  }
`

const LogoWrapStyle = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
`

const LogoInnerPoses = posed.div({
    hidden: {
        y: -30,
        opacity: 0,
        transition: {
            duration: 1000,
            ease: [.14, .99, .43, .99]
        }
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1000,
            ease: [.14, .99, .43, .99]
        }
    }
})

const LogoInnerStyle = styled(LogoInnerPoses)`
  
`

const LogoTitleStyle = styled.div`
  transform: translateX(8px) translateY(3px) rotate(-13deg);
  color: inherit;
  font-size: ${props => props.theme.fontSizes[1]}px;
  text-transform: uppercase;
  letter-spacing: .04rem;
  white-space: nowrap;
  transition: all .3s;
  @media (max-width: ${props => props.theme.breakpoints[2]}px) {
    transform: translateX(3px) translateY(2px) rotate(-13deg);
    font-size: ${props => props.theme.fontSizes[0]}px;
  }
`

const Logo = () => {
    const location = useLocation();
    const { layoutState } = useContext(LayoutContext);
    const [visible, setVisible] = useState(false);
    const { pageOptions } = layoutState;
    const { title, color } = pageOptions;
    const pathname = location.pathname;

    useEffect(() => {
        pathname === '/' ? setVisible(false) : setVisible(true);
    }, [pathname]);

    return (
        <LogoStyle to="/" className={color ? color : null}>
            <Box as={LogoIconStyle}>
                <LogoIcon/>
            </Box>
            <Box as={LogoWrapStyle}>
                <LogoInnerStyle pose={visible ? 'visible' : 'hidden'}>
                    <Box as={LogoTitleStyle}>
                        {title}
                    </Box>
                </LogoInnerStyle>
            </Box>
        </LogoStyle>
    );
}

export default Logo
