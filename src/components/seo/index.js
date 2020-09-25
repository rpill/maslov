import React from "react"
import PropTypes from "prop-types"
import {Helmet} from "react-helmet"
import {useStaticQuery, graphql} from "gatsby"

import image from '../../assets/images/og-image.jpg'
import allProjectMobileVideo from "../../assets/videos/all-projects-mobile.mp4";
import typographyVideo from "../../assets/videos/typography.mp4";
import logoDesignVideo from "../../assets/videos/logo-design.mp4";
import illustrationsVideo from "../../assets/videos/illustrations.mp4";
import aboutMobileVideo from "../../assets/videos/about-mobile.mp4";

function SEO({description, lang, meta, title}) {
    const {site} = useStaticQuery(
        graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            image
          }
        }
      }
    `
    )

    const metaDescription = description || site.siteMetadata.description

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            // titleTemplate={`%s | ${site.siteMetadata.title}`}
            titleTemplate={`${site.siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:image`,
                    content: `${site.siteMetadata.siteUrl}${image}`,
                },
                {
                    name: `twitter:card`,
                    content: `summary_large_image`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    name: `twitter:image`,
                    content: `${site.siteMetadata.siteUrl}${image}`,
                },
            ].concat(meta)}
            // link={[
            //     {
            //         rel: `preload`,
            //         media: `all`,
            //         as: `video`,
            //         type: `video/mp4`,
            //         href: allProjectMobileVideo
            //     },
            //     {
            //         rel: `preload`,
            //         media: `all`,
            //         as: `video`,
            //         type: `video/mp4`,
            //         href: typographyVideo
            //     },
            //     {
            //         rel: `preload`,
            //         media: `all`,
            //         as: `video`,
            //         type: `video/mp4`,
            //         href: logoDesignVideo
            //     },
            //     {
            //         rel: `preload`,
            //         media: `all`,
            //         as: `video`,
            //         type: `video/mp4`,
            //         href: illustrationsVideo
            //     },
            //     {
            //         rel: `preload`,
            //         media: `all`,
            //         as: `video`,
            //         type: `video/mp4`,
            //         href: aboutMobileVideo
            //     },
            // ]}
        />
    )
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
}

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
}

export default SEO
