import React from 'react';
import { Link, graphql } from 'gatsby';
import classnames from 'classnames';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const BlogLink = styled(Link)`
    box-shadow: none;
    text-decoration: none;
`;

const BlogPostSummary = styled(
    ({ frontmatter, fields, excerpt, className }) => {
        const title = frontmatter.title || fields.slug;
        return (
            <article className={classnames('blog-post-summary', className)}>
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
        );
    }
)`
    header {
        h3 {
            margin-bottom: 0;
        }
        margin-bottom: ${() => rhythm(1 / 4)};
    }
`;

const BlogIndex = ({ location, data, className }) => {
    console.log(data);
    const siteTitle = data.site.siteMetadata.title;
    const siteDescription = data.site.siteMetadata.description;
    const posts = data.allMarkdownRemark.edges;

    return (
        <Layout
            className={classnames('blog-index', className)}
            location={location}
            description={siteDescription}
            title={siteTitle}
        >
            <SEO title="All posts" />
            {posts.map(({ node }) => {
                return <BlogPostSummary key={node.fields.slug} {...node} />;
            })}
        </Layout>
    );
};

export default BlogIndex;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
                description
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
