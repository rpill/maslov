import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import {useLocation} from '@reach/router'
import {Flex, Box} from 'rebass'

import AnimateText from './AnimateText'

const SocialListPoses = posed.ul({
    hidden: {
        staggerChildren: 50,
    },
    visible: {
        staggerChildren: 50,
        staggerDirection: -1,
    }
});

const SocialItemPoses = posed.li({
    hidden: {
        y: 10,
        opacity: 0,
        transition: {
            type: 'tween',
            duration: 200,
            ease: 'linear',
        },
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'tween',
            y: {
                from: 10,
                duration: 200,
                ease: 'linear',
            },
            opacity: {
                duration: 200,
                ease: 'linear',
            },
        },
    }
});

const SocialWriteStyle = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 9px 10px 7px;
  margin-right: 10px;
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
  cursor: pointer;
  transition: all .3s;
  @media (min-width: ${props => props.theme.breakpoints[2] + 1}px) {
    display: none;
  }
  &:hover {
    background-color: ${props => props.theme.colors.fuscousGrey};
    color: ${props => props.theme.colors.white};
    @media (max-width: ${props => props.theme.breakpoints[2]}px) {
      background-color: ${props => props.theme.colors.black};
    }
  }
`

const SocialButtonStyle = styled.button`
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
  cursor: pointer;
  transition: all .3s;
  @media (min-width: ${props => props.theme.breakpoints[2] + 1}px) {
    display: none;
  }
  &:hover {
    background-color: ${props => props.theme.colors.fuscousGrey};
    color: ${props => props.theme.colors.white};
    @media (max-width: ${props => props.theme.breakpoints[2]}px) {
      background-color: ${props => props.theme.colors.black};
    }
  }
  &.expanded {
    @media (max-width: ${props => props.theme.breakpoints[2]}px) {
      background-color: ${props => props.theme.colors.fuscousGrey};
    }
    & + ul {
      pointer-events: auto;
    }
  }
`

const SocialList = styled(SocialListPoses)`
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    @media (max-width: ${props => props.theme.breakpoints[2]}px) {
      position: absolute;
      flex-direction: column;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }
`

const SocialItemStyle = styled(SocialItemPoses)`
    display: flex;
    align-items: center;
    @media (max-width: ${props => props.theme.breakpoints[2]}px) {
      margin-bottom: 10px;
      opacity: 0;
    }
    @media (min-width: ${props => props.theme.breakpoints[2] + 1}px) {
      opacity: 1!important;
      transform: none!important;
    }
    &:last-child {
      &:after {
        display: none;
      }
    }
    &:after {
      content: '';
      display: block;
      margin: 0 10px;
      width: 10px;
      height: 1px;
      background-color: ${props => props.theme.colors.white};
      @media (max-width: ${props => props.theme.breakpoints[2]}px) {
        display: none;
      }
    }
`

const SocialLinkStyle = styled.a`
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSizes[1]}px;
    text-transform: uppercase;
    letter-spacing: .04rem;
    @media (max-width: ${props => props.theme.breakpoints[2]}px) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 9px 10px 7px;
      height: 30px;
      width: fit-content;
      background-color: ${props => props.theme.colors.black};
      border-radius: 20px;
    }
    &:hover {
      color: ${props => props.theme.colors.white};
    }
`

const Social = ({list}) => {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const pathname = location.pathname;

    useEffect(() => {
        setVisible(false)
    }, [pathname]);

    return (
        <Flex>
            <SocialWriteStyle href={list[0].url} target="_top" rel="noopener noreferrer">
                Write
            </SocialWriteStyle>
            <Box sx={{position: 'relative'}}>
                <Box as={SocialButtonStyle} className={visible ? 'expanded' : null}
                     onClick={event => setVisible(!visible)}>
                    Follow
                </Box>
                <SocialList initialPose={'hidden'} pose={visible ? 'visible' : 'hidden'} visible={visible}>
                    {list.map((item, index) => (
                        <SocialItemStyle key={index}>
                            <SocialLinkStyle href={item.url} target="_blank" rel="noopener noreferrer">
                                <AnimateText>{item.name}</AnimateText>
                            </SocialLinkStyle>
                        </SocialItemStyle>
                    ))}
                </SocialList>
            </Box>
        </Flex>
    )
};

export default Social
