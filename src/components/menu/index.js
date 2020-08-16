import React from 'react'
import { Link, navigate } from 'gatsby';
import styled from 'styled-components'
import { Flex, Box } from 'rebass'
import { space } from '../../styles/Theme'

const MENU_ITEMS = [
    {
        id: 'all-projects',
        name: 'all projects',
        url: '/all-projects',
        color: 'white',
    },
    {
        id: 'typography',
        name: 'typography',
        url: '/typography',
        color: 'red'
    },
    {
        id: 'logo-design',
        name: 'logo-design',
        url: '/logo-design',
        color: 'green'
    },
    {
        id: 'illustrations',
        name: 'illustrations',
        url: '/illustrations',
        color: 'blue'
    },
    {
        id: 'about',
        name: 'about',
        url: '/about',
        color: 'yellow'
    }
];

const MenuStyle = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transition: opacity 1s;
`

const MenuListStyle = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`

const MenuItemStyle = styled.li`
    overflow: hidden;
    text-align: center;
`

const MenuLinkStyle = styled(props => <Link {...props} />)`
    color: ${props => props.theme.colors.fuscousGrey};
    font-family: ${props => props.theme.fonts.serif};
    font-size: ${props => props.theme.fontSizes[8]}px;
    line-height: 1.5;
    text-transform: uppercase;
    letter-spacing: .1rem;
    transition: all .5s;
    @media (max-width: ${props => props.theme.breakpoints[4]}px) {
        font-size: ${props => props.theme.fontSizes[6]}px;
    }
    @media (max-width: ${props => props.theme.breakpoints[2]}px) {
        font-size: ${props => props.theme.fontSizes[7]}px;
    }
    @media (max-width: ${props => props.theme.breakpoints[0]}px) {
        font-size: ${props => props.theme.fontSizes[4]}px;
    }
    @media (max-width: 374px) {
        letter-spacing: 0;
    }
`

const Menu = () => {
    return (
        <Flex as={MenuStyle} alignItems="center">
            <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center" sx={{zIndex: 2}}>
                <Box as={MenuListStyle}>
                    {MENU_ITEMS.map((link, index) => (
                        <Box as={MenuItemStyle} key={index}>
                            <MenuLinkStyle to={link.url}>
                                {link.name}
                            </MenuLinkStyle>
                        </Box>
                    ))}
                </Box>
            </Flex>
        </Flex>
    )
  }

export default Menu
