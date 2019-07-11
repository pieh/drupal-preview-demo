import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Recipes</h1>
    <ul>
      {data.allNodeRecipe.nodes.map(
        ({
          id,
          title,
          field_summary: { processed },
          relationships: { node__article },
        }) => {
          return (
            <li key={id}>
              <h2>{title}</h2>
              <div dangerouslySetInnerHTML={{ __html: processed }} />
              {node__article && node__article.length > 0 && (
                <React.Fragment>
                  <h4>Referenced By</h4>
                  <ul>
                    {node__article.map(({ title }) => {
                      return <li>{title}</li>
                    })}
                  </ul>
                </React.Fragment>
              )}
            </li>
          )
        }
      )}
    </ul>
  </Layout>
)

export default IndexPage

export const q = graphql`
  {
    allNodeRecipe {
      nodes {
        id
        title
        field_summary {
          processed
        }
        relationships {
          node__article {
            title
          }
        }
      }
    }
  }
`
