import React from "react"
import Disqus from "disqus-react";
import {Link, graphql} from "gatsby"
import styled from 'styled-components';
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {rhythm, scale} from "../utils/typography"

const Divider = styled.hr`
    margin-bottom: ${() => rhythm(1)};
`;

const PostTitle = styled.h1`
    margin-top: ${() => rhythm(1)};
    margin-bottom: 0;
    font-size: ${() => scale(0.8).fontSize};
    line-height: ${() => scale(0.8).lineHeight};
`;

const PostDate = styled.p`
    font-size: ${() => scale(-1 / 5).fontSize};
    line-height: ${() => scale(-1 / 5).lineHeight};
    display: block;
    margin-bottom: ${() => rhythm(1)};
`;

const PostNav = styled(({previous, next, className}) => {
    return (
        <nav className={className}>
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
    )
})`
    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        list-style: none;
        padding: 0;
    }
`;

const BlogPostTemplate = ({data, pageContext, location, className}) => {
    const post = data.markdownRemark;
    const siteTitle = data.site.siteMetadata.title;
    const {previous, next} = pageContext;
    const disqusShortName = 'codeoftheprogrammer';
    const disqusConfig = {
        url: location.href,
        identifier: post.id,
        title: post.frontmatter.title,
    };

    return (
        <Layout location={location} title={siteTitle} className={className}>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <article>
                <header>
                    <PostTitle>{post.frontmatter.title}</PostTitle>
                    <PostDate>{post.frontmatter.date}</PostDate>
                </header>
                <section dangerouslySetInnerHTML={{__html: post.html}}/>
                <Divider/>
                <footer>
                    <Bio/>
                    <Divider/>
                    <Disqus.DiscussionEmbed shortname={disqusShortName} config={disqusConfig}/>
                </footer>
            </article>

            <PostNav previous={previous} next={next} />
        </Layout>
    )
};

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
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
