import React, {useReducer} from 'react'
import PropTypes from 'prop-types'
import {ThemeProvider} from 'styled-components'
import {useStaticQuery, graphql} from 'gatsby'

import {defaultContextValue, reducer, LayoutContext} from './layoutContext'

import Loader from '../components/loader'
import Header from '../components/header'
import Footer from '../components/footer'
import RotateDevice from '../components/rotate-device'
import Wrapper from "./wrapper"

import GlobalStyle from '../styles/Global'
import Theme from '../styles/Theme'
import Menu from '../components/menu'

const Layout = ({children}) => {
    const [layoutState, dispatch] = useReducer(reducer, defaultContextValue);

    const data = useStaticQuery(graphql`
        query SiteSocialQuery {
          site {
            siteMetadata {
              social {
                name
                url
              }
            }
          }
        }
      `);

    return (
        <LayoutContext.Provider value={{layoutState, dispatch}}>
            <GlobalStyle/>
            <ThemeProvider theme={Theme}>
                <RotateDevice/>
                <Loader/>
                <Menu/>
                <Wrapper>
                    <Header/>
                        <main>{children}</main>
                    <Footer socialList={data.site.siteMetadata.social}/>
                </Wrapper>
            </ThemeProvider>
        </LayoutContext.Provider>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
