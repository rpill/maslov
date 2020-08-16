import { createGlobalStyle } from 'styled-components'

import Theme, { rebootCSS, colors } from './Theme'

const GlobalStyle = createGlobalStyle`
    /* normalize css */
    ${rebootCSS}
    html, body {
        position: fixed;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-style: normal;
        font-weight: normal;
        line-height: normal;
    }
    body {
        background-color: ${colors.jaguar};
        overflow-x: hidden;
        overscroll-behavior-y: contain;
    }
    * {
        outline: none !important;
    }
    button {
        padding: 0;
        border: none;
        background: none;
        &:focus {
            outline: none;
        }
    }
    a {
        transition: all .3s;
        &:hover {
            color: inherit;
            text-decoration: none;
        }
    }
`
export default GlobalStyle