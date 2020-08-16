import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import PrevIcon from '../../svg/PrevIcon';
import NextIcon from '../../svg/NextIcon';

import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'

const Slider = ({ images }) => {
    // const params = {
    //     slidesPerView: 1,
    //     spaceBetween: 10,
    //     centeredSlides: true,
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'fraction',
    //         // renderFraction: (currentClass, totalClass) => {
    //         //     return '<span className="' + currentClass + '"></span>' +
    //         //         '<span className="swiper-pagination-separate">-</span>' +
    //         //         '<span className="' + totalClass + '"></span>';
    //         // }
    //     },
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },
    //     renderPrevButton: () => <div className="swiper-button-prev"><PrevIcon/></div>,
    //     renderNextButton: () => <div className="swiper-button-next"><NextIcon/></div>,
    //     breakpoints: {
    //         992: {
    //             slidesPerView: 3,
    //             spaceBetween: 20,
    //             centeredSlides: false,
    //         },
    //         1921: {
    //             slidesPerView: 4,
    //             spaceBetween: 25,
    //             centeredSlides: false
    //         }
    //     }
    // }
    return (
        <div>
            Slider
        </div>
    )
};

Slider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Slider;
