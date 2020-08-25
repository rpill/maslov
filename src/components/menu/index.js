import React, {useState, useEffect, useContext} from 'react'
import {Link, navigate} from 'gatsby'
import {useLocation} from '@reach/router'
import styled from 'styled-components'
import posed from "react-pose"
import {Flex, Box} from 'rebass'
import {space} from '../../styles/Theme'

import debounce from 'lodash/debounce'

import allProjectVideo from "../../assets/videos/all-projects.mp4";
import allProjectMobileVideo from "../../assets/videos/all-projects-mobile.mp4";
import typographyVideo from "../../assets/videos/typography.mp4";
import logodesignVideo from "../../assets/videos/logo-design.mp4";
import illustrationsVideo from "../../assets/videos/illustrations.mp4";
import aboutVideo from "../../assets/videos/about.mp4";
import aboutMobileVideo from "../../assets/videos/about-mobile.mp4";

const MENU_ITEMS = [
    {
        id: 'all-projects',
        name: 'all projects',
        url: '/all-projects',
    },
    {
        id: 'typography',
        name: 'typography',
        url: '/typography',
    },
    {
        id: 'logo-design',
        name: 'logo-design',
        url: '/logo-design',
    },
    {
        id: 'illustrations',
        name: 'illustrations',
        url: '/illustrations',
    },
    {
        id: 'about',
        name: 'about',
        url: '/about',
    }
];

const VIDEOS_DESKTOP = {
    'all-projects': allProjectVideo,
    'typography': typographyVideo,
    'logo-design': logodesignVideo,
    'illustrations': illustrationsVideo,
    'about': aboutVideo,
};

const VIDEOS_MOBILE = {
    'all-projects': allProjectMobileVideo,
    'about': aboutMobileVideo,
};

const HoverListPoses = posed.div({
    hidden: {
        opacity: 0,
        transition: {
            duration: 1000,
            ease: [.14, .99, .43, .99]
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1000,
            ease: [.14, .99, .43, .99],
        }
    }
})

const MenuListPoses = posed.ul({
    hidden: {
        opacity: 0,
        transition: {
            duration: 350,
            ease: [.14, .99, .43, .99]
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 350,
            ease: [.14, .99, .43, .99],
        }
    }
})

const MenuStyle = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    &.navigate {
      pointer-events: none;
    }
`

const MenuListStyle = styled(MenuListPoses)`
    list-style: none;
    margin: 0;
    padding: 0;
    pointer-events: auto;
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
    &.all-projects {
      &:hover, &.active {
        color: ${props => props.theme.colors.white};
      }
    }
    &.typography {
      &:hover, &.active {
        color: ${props => props.theme.colors.red};
      }
    }
    &.logo-design {
      &:hover, &.active {
        color: ${props => props.theme.colors.green};
      }
    }
    &.illustrations {
      &:hover, &.active {
        color: ${props => props.theme.colors.blue};
      }
    }
    &.about {
      &:hover, &.active {
        color: ${props => props.theme.colors.yellow};
      }
    }
`

const HoverItemStyle = styled.div`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colors.jaguar};
  opacity: 0;
  transition: opacity .5s cubic-bezier(.215, .61, .355, 1);
  &.active {
    z-index: 5;
    opacity: 1;
  }
`

const HoverVideoWrapStyle = styled.div`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colors.jaguar};
  transform: translateZ(0);
  &.mobile {
    z-index: 2;
    display: none;
  }
`

const HoverVideoStyle = styled.video`
  position: absolute;
  width: auto;
  height: auto;
  min-height: 100%;
  min-width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const HoverListStyle = styled(HoverListPoses)`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  &.mobile {
    ${HoverItemStyle} {
      &.all-projects {
        ${HoverVideoStyle} {
          height: 130vh;
          @media (max-width: ${props => props.theme.breakpoints[1]}px) {
            height: 115vh;
          }
        }
      }
      &.typography {
        ${HoverVideoStyle} {
          height: 100vh;
        }
      }
      &.logo-design {
        ${HoverVideoStyle} {
          height: 70vh;
          min-height: auto;
          @media (max-width: ${props => props.theme.breakpoints[1]}px) {
            height: 60vh;
          }
        }
      }
      &.illustrations {
        ${HoverVideoStyle} {
          height: 100vh;
        }
      }
      &.about {
        ${HoverVideoStyle} {
          height: 130vh;
        }
      }
    }
    ${HoverVideoWrapStyle} {
      & + ${HoverVideoWrapStyle} {
        &.mobile {
          display: block;
        }
      }
    }
  }
`

export const loadVideo = domElement =>
    new Promise((resolve, reject) => {
        domElement.oncanplaythrough = () => resolve(domElement);
        domElement.onerror = (error) => reject(error);
    });

export const loadVideos = (...domElements) => Promise.all(domElements.map(loadVideo));

const Menu = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isNavigate, setIsNavigate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [timeId, setTimeId] = useState(null);
    let currentVideos = null;
    let refsVideos = [];
    const pathname = location.pathname;

    const handleResize = debounce(() => {
        setIsMobile(window.innerWidth < 1024);
    }, 300);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (pathname === '/') {
            clearTimeout(timeId);
            setIsNavigate(false);
            setActiveIndex('');
            // setTimeout(function () {
                setVisible(true);
            // }, 100);
        }
    }, [pathname]);

    const handleMouseEnter = (e, index) => {
        if (isNavigate) return;
        setActiveIndex(index);

        playVideos(refsVideos[index]);
    };

    const handleMouseLeave = (e, index) => {
        if (isNavigate) return;
        setActiveIndex('');
    };

    const handleClick = (e, index, url) => {

        e.preventDefault();

        const delay = t => new Promise(resolve => setTimeout(resolve, t));

        setIsNavigate(true);
        setActiveIndex(index);

        playVideos(refsVideos[index]);

        if (isMobile) {
            currentVideos = refsVideos[index];
            delay(1000).then(() => {
                navigate(url);
                let id = setTimeout(function () {
                    setIsNavigate(false);
                    setActiveIndex('');
                    setVisible(false);

                    setTimeout(function () {
                        stopVideos(currentVideos);
                    }, 300);
                }, 1000);
                setTimeId(id);
            });
        } else {
            navigate(url);
            let id = setTimeout(function () {
                setIsNavigate(false);
                setActiveIndex('');
                setVisible(false);
            }, 1000);
            setTimeId(id);
        }
    };

    const playVideos = (videos) => {
        videos.map((video) => {
            video.play()
        });
    };

    const stopVideos = (videos) => {
        videos.map((video) => {
            video.pause();
            video.currentTime = 0;
        });
    };

    return (
        <MenuStyle className={isNavigate ? 'navigate' : ''}>
            <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center" sx={{zIndex: 2}}>
                <MenuListStyle initialPose={visible ? 'visible' : 'hidden'}
                               pose={visible ? 'visible' : 'hidden'}>
                    {MENU_ITEMS.map((link, index) => (
                        <Box as={MenuItemStyle} key={index}>
                            <MenuLinkStyle
                                onMouseEnter={((e) => handleMouseEnter(e, index))}
                                onMouseLeave={((e) => handleMouseLeave(e, index))}
                                onClick={((e) => handleClick(e, index, link.url))}
                                to={link.url} className={`${link.id}${activeIndex === index ? ' active' : ''}`}>
                                {link.name}
                            </MenuLinkStyle>
                        </Box>
                    ))}
                </MenuListStyle>
            </Flex>
            <HoverListStyle className={isMobile ? 'mobile' : null} initialPose={visible ? 'visible' : 'hidden'}
                 pose={visible ? 'visible' : 'hidden'}>
                {MENU_ITEMS.map((link, index) => (
                    <Box as={HoverItemStyle} key={index}
                         className={`${link.id}${activeIndex === index ? ' active' : ''}`}>
                        <Box as={HoverVideoWrapStyle} className="desktop">
                            <HoverVideoStyle preload="auto" loop muted playsInline ref={element => {
                                refsVideos[index] = [];
                                refsVideos[index].push(element)
                            }}>
                                <source src={VIDEOS_DESKTOP[link.id]} type="video/mp4"/>
                            </HoverVideoStyle>
                        </Box>

                        {VIDEOS_MOBILE[link.id]
                            ?
                            <Box as={HoverVideoWrapStyle} className="mobile">
                                <HoverVideoStyle preload="auto" loop muted playsInline
                                                 ref={element => refsVideos[index].push(element)}>
                                    <source src={VIDEOS_MOBILE[link.id]} type="video/mp4"/>
                                </HoverVideoStyle>
                            </Box>
                            : ''
                        }
                    </Box>
                ))}
            </HoverListStyle>
        </MenuStyle>
    )
}

export default Menu
