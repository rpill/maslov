module.exports = {
  assetPrefix: `/assets/`,
  siteMetadata: {
    title: `Nikita Maslov`,
    description: `Graphic Designer & Illustrator, focused on creating original and conceptual works`,
    author: ``,
    siteUrl: `https://nikitamslv.com/`,
    image: `src/assets/images/og-image.jpg`,
    social: [
      {
        name: `email`,
        url: `mailto:idleheaddsgn@gmail.com`
      },
      {
        name: `facebook`,
        url: `https://www.facebook.com/nikitamslv`
      },
      {
        name: `instagram`,
        url: `https://instagram.com/idlehead`
      },
      {
        name: `dribbble`,
        url: `https://dribbble.com/nikitamaslov`
      },
      {
        name: `behance`,
        url: `https://www.behance.net/nikitamaslov`
      }
    ],
  },
  plugins: [
    `gatsby-plugin-layout`,
    `gatsby-disable-404`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        ssr: false
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`,
        ignore: ['**/*.mp4']
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `PT Mono`,
          `Inknut Antiqua\:300`
        ],
        display: 'swap'
      }
    },
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nikita Maslov`,
        short_name: `Nikita Maslov`,
        start_url: `/`,
        background_color: `#484648`,
        theme_color: `#484648`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `mj1vhtt89p21`, // or process.env.CONTENTFUL_SPACE_ID
        accessToken: `EtvAxwXp3MTGNTzCJzruMgnwilED10b35V5atANd_Qk`, // or process.env.CONTENTFUL_TOKEN
      },
    },
    'gatsby-plugin-no-sourcemaps'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
  ],
}
