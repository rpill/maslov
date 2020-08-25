import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components'
import posed from "react-pose"

import { loadImages } from '../../utils/images-loader';
import CanvasSpriteAnim from '../../utils/canvas-sprite-anim';
import manData from '../../../static/assets/images/eye/eye.json';

const LoaderPoses = posed.div({
    hidden: {
        opacity: 0,
        transition: {
            duration: 500,
            ease: [.14, .99, .43, .99]
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 500,
            ease: [.14, .99, .43, .99]
        }
    }
})

const LoaderStyle = styled(LoaderPoses)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.jaguar};
  &.hidden {
    pointer-events: none;
  }
`

const LoaderCanvasStyle = styled.canvas`
  width: 346px;
  height: 346px;
  @media (max-width: ${props => props.theme.breakpoints[5]}px) {
    width: 252px;
    height: 252px;
  }
  @media (max-width: ${props => props.theme.breakpoints[4]}px) {
    width: 168px;
    height: 168px;
  }
  @media (max-width: ${props => props.theme.breakpoints[1]}px) {
    width: 180px;
    height: 180px;
  }
`

const filteredFrames = (frames, filter) =>
    frames.filter(frame => frame.filename.indexOf(filter) > -1);

let spriteAnim;
let loadedImages;

const Loader = () => {
    const [visible, setVisible] = useState(true);
    const [imgLoaded, setImgLoaded] = useState(false);
    const canvasRef = useRef(null);

    const delay = t => new Promise(resolve => setTimeout(resolve, t));

    useEffect(() => {
        const images = ['../../assets/images/eye/eye.png'];

        loadImages(...images).then(imgs => {
            loadedImages = imgs;
            setImgLoaded(true);
        }).catch(e => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        if (loadedImages && imgLoaded && canvasRef.current) {

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
                frameRate: 16,
                baseWidth: manData.frames[0].sourceSize.w,
            });

            spriteAnim.register({ ...getData(manData, '') });
            spriteAnim.start();

            delay(4000).then(() => {
                setVisible(false);
                delay(500).then(() => {
                    spriteAnim.pause();
                });
            });
        }

        return () => {
            if (spriteAnim) {
                spriteAnim.dispose();
                spriteAnim = null;
            }
        };

    }, [imgLoaded]);

    return (
        <LoaderStyle initialPose={'visible'} pose={visible ? 'visible' : 'hidden'} className={visible ? '' : 'hidden'}>
                <LoaderCanvasStyle ref={canvasRef}/>
        </LoaderStyle>
    )
}

export default Loader
