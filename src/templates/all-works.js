import React, {useContext, useEffect} from 'react'
import { graphql } from 'gatsby'
import WorksList from '../components/works';

import SEO from '../components/seo';
import {LayoutContext} from '../layouts/layoutContext';

export default function AllWorks( result ) {
    const {nodes} = result.data.props;

    const {dispatch} = useContext(LayoutContext);

    useEffect(() => {
        dispatch({
            type: 'setPageOptions',
            pageTitle: 'All Projects',
            pageColor: 'all-projects'
        });
    }, []);

    return (
        <>
            <SEO title="All Projects"/>
            <WorksList works={nodes} />
        </>
    )
}

export const pageQuery = graphql`
  query AllWorksBySlug {
    props: allContentfulWork {
      nodes {
        title
        image {
          id
          fluid(maxWidth: 820) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`
