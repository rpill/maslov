import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import { useLocation } from '@reach/router'
import {Flex, Box} from 'rebass'
import Slider from "./Slider";



const WorksStyle = styled.div`
  position: absolute;
  z-index: 5;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`

const Works = ({works}) => {
    const location = useLocation();
    const [ visible, setVisible ] = useState(false);
    const pathname = location.pathname;

    useEffect(() => {
        setVisible(false)
    }, [pathname]);

    return (
        <Flex as={WorksStyle} alignItems="center">
            <Slider images={works}/>
        </Flex>
    )
};

export default Works
