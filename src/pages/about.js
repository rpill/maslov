import React, {useContext, useEffect, useCallback} from "react"

import SEO from "../components/seo"

import About from "../components/about"
import {LayoutContext} from "../layouts/layoutContext";

const AboutPage = () => {
    const {layoutState, dispatch} = useContext(LayoutContext);

    useEffect(() => {
        dispatch({
            type: 'setPageOptions',
            pageTitle: 'About',
            pageColor: 'about'
        });
    }, []);

    return (
        <>
            <SEO title="About"/>
            <About/>
        </>
    )
}

export default AboutPage
