import React from 'react';
import PropTypes from 'prop-types';
import {Box} from 'rebass'

const SplitText = ({text, onMouseEnterEvent}) => {

    let chars = [];

    const handleMouseEnter = () => {
        onMouseEnterEvent(chars);
    };

    return (
        <Box onMouseEnter={handleMouseEnter}>
            {text.split('').map((char, index) => {
                return <span key={index} ref={element => {chars[index] = element}}>{char}</span>;
            })}
        </Box>
    );
}

SplitText.propTypes = {
    text: PropTypes.string
};

export default SplitText;
