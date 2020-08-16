import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {gsap} from 'gsap'
import {Box} from 'rebass'

import SplitText from './SplitText';

const TextMask = styled.div`
  overflow: hidden;
  span {
    display: inline-block;
    @media (max-width: ${props => props.theme.breakpoints[2]}px) {
      display: inline;
    }
  }
`

const AnimateText = ({children}) => {

    let tl = gsap.timeline();

    useEffect(() => {
        tl.timeScale(5);
    });

    const handleMouseEnter = (chars) => {
        tl.clear();

        gsap.set(chars, {y: '0%'});

        tl.to(chars, {duration: 1,y: '-120%', stagger: .05})
            .to(chars, {duration: 0, y: '120%'})
            .to(chars, {duration: 1, y: '0%', stagger: .05});
    };

    return (
        <Box as={TextMask}>
            <SplitText text={children} onMouseEnterEvent={handleMouseEnter}/>
        </Box>
    );
}

AnimateText.propTypes = {
    text: PropTypes.string
};

export default AnimateText;
