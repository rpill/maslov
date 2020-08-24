module.exports = {
  assetPrefix: `/assets/`,
  siteMetadata: {
    title: `Никита Маслов`,
    description: `Иллюстратор`,
    author: ``,
    social: [
      {
        name: `email`,
        url: `mailto:mymail@mail.com`
      },
      {
        name: `facebook`,
        url: `https://facebook.com`
      },
      {
        name: `instagram`,
        url: `https://instagram.com`
      },
      {
        name: `dribbble`,
        url: `https://dribbble.com`
      },
      {
        name: `behance`,
        url: `https://behance.com`
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
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
        spaceId: `wjubrff7rdix`, // or process.env.CONTENTFUL_SPACE_ID
        accessToken: `ab1OBF34rPmwBkOlpBsdJfgWpX2x7WJzTWQwW7agtFA`, // or process.env.CONTENTFUL_TOKEN
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
