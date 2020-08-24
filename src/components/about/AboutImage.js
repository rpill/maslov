import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components'
import posed from "react-pose"
import { Box } from 'rebass'
import { space } from '../../styles/Theme'

import manBackgroundImage from '../../assets/images/about/man.png';
import manBackgroundMobileImage from '../../assets/images/about/man-mobile.png';

import { loadImages } from '../../utils/images-loader';
import CanvasSpriteAnim from '../../utils/canvas-sprite-anim';
import manData from '../../../static/assets/images/about/man.json';

const AboutImagePoses = posed.div({
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
        delay: 200,
        transition: {
            duration: 1000,
            ease: [.14, .99, .43, .99],
        }
    }
})

const AboutImageStyle = styled(AboutImagePoses)`
  display: flex;
  margin: ${-space[1] * 2}px 0;
  width: 100%;
  @media (max-width: ${props => props.theme.breakpoints[4]}px) {
    margin: ${-space[1] * 2}px 0 ${-space[1] * 6}px;
  }
  @media (max-width: 1024px) {
    margin: ${-space[1] * 4}px 0 ${-space[1] * 2}px;
    height: 117.2vw;
  }
  @media (max-width: ${props => props.theme.breakpoints[1]}px) {
    position: absolute;
    margin: 0;
    left: 6vw;
    bottom: -5vw;
    height: 100vw;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}px) {
    height: 145vw;
    width: 105vw;
  }
`

const AboutImageBackgroundStyle = styled.div`
  position: relative;
  align-self: flex-end;
  height: 100%;
  width: 100%;
  background: url(${manBackgroundImage}) bottom/100% auto no-repeat;
  pointer-events: none;
  @media (max-width: 1024px) {
    background-size: contain;
  }
  @media (max-width: ${props => props.theme.breakpoints[1]}px) {
    background-image: url(${manBackgroundMobileImage});
  }
`

const AboutImageCanvasStyle = styled.canvas`
  position: absolute;
  left: -2.7vw;
  bottom: 30.3vw;
  width: 19.469vw;
  height: 18.74vw;
  @media (min-width: ${props => props.theme.breakpoints[5]+1}px) and (max-height: 1250px) {

  }
  @media (max-width: ${props => props.theme.breakpoints[3]}px) {
    left: -2.9vw;
    bottom: 39vw;
    width: 23.469vw;
    height: 22.74vw;
  }
  @media (max-width: 1024px) {
    left: -1vw;
    bottom: 79.2vw;
    width: 44.469vw;
    height: 43.74vw;
  }
  @media (max-width: ${props => props.theme.breakpoints[1]}px) {
    left: 9vw;
    bottom: 68vw;
    width: 37.469vw;
    height: 36.74vw;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}px) {
    left: -6.3vw;
    bottom: 93vw;
    width: 54.469vw;
    height: 53.74vw;
  }
`

const filteredFrames = (frames, filter) =>
    frames.filter(frame => frame.filename.indexOf(filter) > -1);

let spriteAnim;
let loadedImages;

const AboutImage = () => {
    const [ visible, setVisible ] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const canvasRef = useRef(null);

    // useEffect(() => {
    //     setVisible(true)
    // });

    useEffect(() => {
        let isMounted = false;
        const images = ['../../assets/images/about/man.png'];

        loadImages(...images).then(imgs => {
            loadedImages = imgs;
            if(!isMounted) setImgLoaded(true);
        }).catch(e => {
            console.log(e);
        });

        return () => {
            isMounted = true;
        };
    }, []);

    useEffect(() => {
        if (loadedImages && imgLoaded && canvasRef.current) {
            setVisible(true);
            const getImage = src => {
                return loadedImages.find(img => img.src.indexOf(src) > -1);
            };

            const getData = (data, filter = '') => {
                return {
                    image: getImage(data.meta.image),
                    frames: filter ? filteredFrames(data.frames, filter) : data.frames,
                    meta: { size: data.meta.size },
                };
            };

            spriteAnim = new CanvasSpriteAnim(canvasRef.current, {
                frameRate: 8,
                baseWidth: manData.frames[0].sourceSize.w,
            });

            spriteAnim.register({ ...getData(manData, '') });
            spriteAnim.start();
        }

        return () => {
            if (spriteAnim) {
                spriteAnim.dispose();
                spriteAnim = null;
            }
        };

    }, [imgLoaded]);

    return (
        <AboutImageStyle initialPose={'hidden'} pose={visible ? 'visible' : 'hidden'}>
            <Box as={AboutImageBackgroundStyle}>
                <AboutImageCanvasStyle ref={canvasRef}/>
            </Box>
        </AboutImageStyle>
    )
}

export default AboutImage
