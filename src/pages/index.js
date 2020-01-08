import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components';
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogLink = styled(Link)`
    box-shadow: none;
    text-decoration: none;
`;

const BlogPost = styled(({frontmatter, fields, excerpt, className}) => {
    const title = frontmatter.title || fields.slug;
    return (
        <article className={className}>
            <header>
                <h3>
                    <BlogLink to={fields.slug}>{title}</BlogLink>
                </h3>
                <small>{frontmatter.date}</small>
            </header>
            <section>
                <p
                    dangerouslySetInnerHTML={{
                        __html: frontmatter.description || excerpt,
                    }}
                />
            </section>
        </article>
    )
})`
    h3 {
        margin-bottom: ${() => rhythm(1/4)};
    }
`;

const BlogIndex = ({location, data}) => {
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          return (
              <BlogPost key={node.fields.slug} {...node} />
          )
        })}
      </Layout>
    )
};

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
