/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

// You can delete this file if you're not using it
exports.onCreateNode = ({ node }) => {
    // console.log(node.internal.type)
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        graphql(`
      {
        works: allContentfulTypeWork {
          nodes {
            slug
          }
        }
      }
    `).then(({ errors, data }) => {
            if (errors) {
                reject(errors)
            }

            if (data && data.works) {
                const component = path.resolve("./src/templates/works.js");

                createPage({
                    path: `/all-projects`,
                    component: path.resolve("./src/templates/all-works.js"),
                    context: 'all-projects',
                });

                data.works.nodes.map(({ slug }) => {
                    createPage({
                        path: `/${slug}`,
                        component,
                        context: { slug },
                    })
                })
            }

            resolve()
        })
    })
}
