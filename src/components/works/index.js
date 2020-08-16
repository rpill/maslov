import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import Slider from "./Slider";

const WorksPoses = posed.div({
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
        transition: {
            duration: 1000,
            ease: [.14, .99, .43, .99],
        }
    }
})

const WorksStyle = styled(WorksPoses)`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 5;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`

const Works = ({works}) => {
    const [ visible, setVisible ] = useState(false);

    useEffect(() => {
        setVisible(true)
    });

    return (
        <WorksStyle initialPose={'hidden'} pose={visible ? 'visible' : 'hidden'}>
            <Slider images={works}/>
        </WorksStyle>
    )
};

export default Works
