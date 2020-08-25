import React, {useContext, useEffect} from "react"

import SEO from "../components/seo"
import {LayoutContext} from "../layouts/layoutContext";

const IndexPage = () => {
    const {layoutState, dispatch} = useContext(LayoutContext);
    const { pageOptions } = layoutState;
    const { title } = pageOptions;

    useEffect(() => {
        dispatch({
            type: 'setPageOptions',
            pageTitle: title ? title : '',
            pageColor: 'home'
        });
    }, []);

    return (
        <>
            <SEO title="Nikita Maslov"/>
        </>
    )
}

export default IndexPage
