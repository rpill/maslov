import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import {Box} from 'rebass'
import {space} from '../../styles/Theme'

import debounce from 'lodash/debounce'
import {clamp, inertia, normalize} from '../../utils/math'
import {startAnimationFrame} from "../../utils/start-animation-frame"

const AboutContentTextPoses = posed.p({
    hidden: {
        y: 30,
        opacity: 0,
        transition: {
            duration: 1000,
            ease: [.14, .99, .43, .99]
        }
    },
    visible: {
        y: 0,
        opacity: 1,
        delay: 100,
        transition: {
            duration: 1000,
            ease: [.14, .99, .43, .99],
        }
    }
})

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
  @media (min-width: ${props => props.theme.breakpoints[1] + 1}px) {
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
  @media (min-width: ${props => props.theme.breakpoints[1] + 1}px) {
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

const AboutContentTextStyle = styled(AboutContentTextPoses)`
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
    const [ visible, setVisible ] = useState(false);
    const [transformY, setTransformY] = useState(0);
    const [opacity, setOpacity] = useState(0);

    const content = React.createRef();
    let touches = {
        start: 0,
        current: 0
    };
    let maxY = 0;
    let started = false;
    let cancelAnimation = null;
    let inert = inertia(100);
    let scrollTop = 0;
    let stylesContent = {
        transform: `translateY(${transformY}px)`
    };
    let stylesOverlay = {
        opacity: opacity,
        transform: `translateY(${transformY-10}px)`
    };

    const handleResize = debounce(() => {
        const {innerHeight} = window;
        maxY = innerHeight / 2;
    }, 350);

    useEffect(() => {
        setVisible(true)
    });

    useEffect(() => {

        const {innerHeight} = window;
        maxY = innerHeight / 2;
        setTimeout(() => {
            setTransformY(maxY);
        }, 50);

        handleResize();

        cancelAnimation = startAnimationFrame(time => onFrame(time));

        window.addEventListener('wheel', handleWheel, {passive: true});
        window.addEventListener('touchstart', handleTouchStart, {passive: true});
        window.addEventListener('touchmove', handleTouchMove, {passive: true});
        window.addEventListener('resize', handleResize, {passive: true});

        return () => {
            cancelAnimation();
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const onFrame = (time) => {
        if (!started) return;

        const scroll = Math.floor(inert(scrollTop, time));

        const transformY = maxY - scroll;

        setTransformY(transformY);
        setOpacity(1 - Math.floor(normalize(transformY, 0, maxY) * 100) / 100);
    };

    const handleWheel = (e) => {
        let delta = e.deltaY || e.detail || e.wheelDelta;
        calc(delta);
    };

    const handleTouchStart = (e) => {
        touches.start = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        touches.current = e.touches[0].clientY;
        let delta = touches.current - touches.start;
        touches.start = touches.current;
        calc(-delta);
    };

    const calc = (delta) => {
        started = true;
        scrollTop += delta;
        scrollTop = clamp(scrollTop, 0, maxY);
    };

    return (
        <Box as={AboutContentStyle} ref={content} style={stylesContent}>
            <AboutContentOverlayStyle style={stylesOverlay}>{''}</AboutContentOverlayStyle>
            <AboutContentTextStyle initialPose={'hidden'} pose={visible ? 'visible' : 'hidden'}>
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
