import React from 'react';
import Disqus from 'disqus-react';
import { Link, graphql } from 'gatsby';
import {FaRegCalendarAlt} from 'react-icons/fa';
import classnames from 'classnames';
import styled from 'styled-components';
import Divider from '../components/divider';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

const PostTitle = styled.h1`
    margin-top: ${() => rhythm(1)};
    margin-bottom: ${() => rhythm(1 / 4)};
    font-size: ${() => scale(0.8).fontSize};
    color: #007acc;
    line-height: ${() => scale(0.8).lineHeight};
`;

const PostDate = styled.p`
    font-size: ${() => scale(-1 / 5).fontSize};
    line-height: ${() => scale(-1 / 5).lineHeight};
    display: block;
`;

const PostNav = styled(({ previous, next, className }) => {
    return (
        <nav className={classnames('post-nav', className)}>
            <ul>
                <li>
                    {previous && (
                        <Link to={previous.fields.slug} rel="prev">
                            ← {previous.frontmatter.title}
                        </Link>
                    )}
                </li>
                <li>
                    {next && (
                        <Link to={next.fields.slug} rel="next">
                            {next.frontmatter.title} →
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
})`
    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        list-style: none;
        padding: 0;
    }
`;

const BlogPostTemplate = styled(
    ({ data, pageContext, location, className }) => {
        const post = data.markdownRemark;
        const siteTitle = data.site.siteMetadata.title;
        const siteDescription = data.site.siteMetadata.description;
        const { previous, next } = pageContext;
        const disqusShortName = 'codeoftheprogrammer';
        const disqusConfig = {
            url: location.href,
            identifier: post.id,
            title: post.frontmatter.title,
        };

        return (
            // Show the year of the post as the copyright date range in the footer of the layout
            // since that is when the post was published and copyrighted.
            <Layout
                className={classnames('blog-post-template', className)}
                title={siteTitle}
                description={siteDescription}
                copyrightRange={`${new Date(post.frontmatter.date).getFullYear()}`}
            >
                <SEO
                    title={post.frontmatter.title}
                    description={post.frontmatter.description || post.excerpt}
                />
                <article>
                    <header>
                        <PostTitle>{post.frontmatter.title}</PostTitle>
                        <PostDate>
                            <FaRegCalendarAlt /> {post.frontmatter.date}
                        </PostDate>
                    </header>
                    <section dangerouslySetInnerHTML={{ __html: post.html }} />
                    <Divider />
                    <footer>
                        <Disqus.DiscussionEmbed
                            shortname={disqusShortName}
                            config={disqusConfig}
                        />
                    </footer>
                </article>

                <PostNav previous={previous} next={next} />
            </Layout>
        );
    }
)`
    blockquote p {
        font-style: italic;
        quotes: '“' '”' '‘' '’';
    }
    blockquote p:before {
        content: open-quote;
    }
    blockquote p:after {
        content: close-quote;
    }
    .gatsby-highlight {
        padding-left: ${() => rhythm(1)};
    }
`;

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                description
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
            }
        }
    }
`;
