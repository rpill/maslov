import React, {useContext, useEffect} from "react"

import SEO from "../components/seo"

import About from "../components/about"
import {LayoutContext} from "../layouts/layoutContext";

const AboutPage = () => {
    const {dispatch} = useContext(LayoutContext);

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
