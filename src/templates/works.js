import React, {useContext, useEffect} from 'react'
import {graphql} from 'gatsby'
import WorksList from '../components/works';

import SEO from "../components/seo";
import {LayoutContext} from "../layouts/layoutContext";

export default function Works(result) {
    const {works, title, slug} = result.data.props;
    const {layoutState, dispatch} = useContext(LayoutContext);

    useEffect(() => {
        dispatch({
            type: 'setPageOptions',
            pageTitle: title,
            pageColor: slug
        });
    }, []);

    return (
        <>
            <SEO title={title}/>
            <WorksList works={works}/>
        </>
    )
}

export const pageQuery = graphql`
  query WorksBySlug($slug: String!) {
    props: contentfulTypeWork(slug: {eq: $slug}) {
      works {
        title
        image {
          id
          fluid(maxWidth: 820) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
      title
      slug
    }
  }
`
