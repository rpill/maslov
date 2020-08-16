import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import styled from 'styled-components'
import {Box} from 'rebass'
import {space} from '../../styles/Theme'
import Swiper from 'react-id-swiper';

import PrevIcon from '../../svg/PrevIcon';
import NextIcon from '../../svg/NextIcon';

import 'swiper/css/swiper.css'

const SliderStyle = styled.div`
  position: relative;
  width: 100%;
  .swiper-container {
    padding: 0 ${space[1]}px;
    transition: opacity .3s;
    &:not(.swiper-container-initialized) {
      opacity: 0;
      & + .swipe {
        opacity: 0;
      }
    }
  }
  .swiper-pagination-fraction {
    position: static;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: ${space[1]}px;
    font-size: 0;
    @media (min-width: ${props => props.theme.breakpoints[2] + 1}px) {
      display: none;
    }
    @media (max-width: ${props => props.theme.breakpoints[0]}px) {
      margin-top: 13px;
    }
    &:before {
      content: '';
      display: block;
      order: 2;
      margin: 0 10px;
      height: 1px;
      width: 10px;
      background-color: ${props => props.theme.colors.white};
      }
      .swiper-pagination-current, .swiper-pagination-total {
        min-width: 18px;
        color: ${props => props.theme.colors.white};
        font-size: ${props => props.theme.fontSizes[1]}px;
      }
      .swiper-pagination-current {
        order: 1;
        text-align: right;
      }
      .swiper-pagination-total {
        order: 3;
      }
    }
`

const ButtonStyle = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  top: 50%;
  margin-top: -31px;
  width: 62px;
  height: 62px;
  background-color: ${props => props.theme.colors.black};
  border-radius: 50%;
  cursor: pointer;
  transition: all .3s;
  @media (max-width: ${props => props.theme.breakpoints[2]}px) {
    display: none;
  }
  &:hover {
    transform: translateY(-8px);
  }
  &.swiper-button-disabled {
    display: none;
  }
  &:before, &:after {
    display: none;
  }
  .swiper-button-prev {
    left: ${space[1] * 2}px;
    svg {
      transform: translateX(-2px);
    }
  }
  .swiper-button-next {
    right: ${space[1] * 2}px;
    svg {
      transform: translateX(2px);
    }
  }
`

const SliderSwipeStyle = styled.div`
  position: absolute;
  right: ${space[1]}px;
  bottom: 2px;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes[0]}px;
  text-transform: uppercase;
  letter-spacing: .04rem;
  transition: opacity .3s;
  @media (min-width: ${props => props.theme.breakpoints[2] + 1}px) {
    display: none;
  }
`

const Slider = ({images}) => {
    const params = {
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            // renderFraction: (currentClass, totalClass) => {
            //     return '<span className="' + currentClass + '"></span>' +
            //         '<span className="swiper-pagination-separate">-</span>' +
            //         '<span className="' + totalClass + '"></span>';
            // }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        renderPrevButton: () => <ButtonStyle className="swiper-button-prev"><PrevIcon/></ButtonStyle>,
        renderNextButton: () => <ButtonStyle className="swiper-button-next"><NextIcon/></ButtonStyle>,
        breakpoints: {
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
            },
            1921: {
                slidesPerView: 4,
                spaceBetween: 25,
                centeredSlides: false
            }
        }
    }
    return (
        <Box as={SliderStyle}>
            <Swiper {...params}>
                {images.map((item, index) => {
                    return (
                        <div key={`slide_${index}`}>
                            <Img
                                fluid={item.image.fluid}
                                alt={item.title}
                            />
                        </div>
                    )
                })}
            </Swiper>
            <Box as={SliderSwipeStyle} className="swipe">
                swipe to see
            </Box>
        </Box>
    )
};

Slider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Slider;
