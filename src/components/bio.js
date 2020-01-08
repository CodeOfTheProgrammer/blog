/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from 'styled-components';
import { rhythm } from "../utils/typography"
import SocialMedia from './socialMedia';

const BioImage = styled(Image)`
    margin-right: ${() => rhythm(1/2)};
    margin-bottom: 0;
    min-width: 50px;
    border-radius: 100%;
`;

const Bio = styled(({className}) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;
  return (
    <div className={className}>
      <BioImage
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
      />
      <div className={'bio-content'}>
          <p>
            Written by <strong>{author}</strong>, who lives and works in Annapolis, Maryland.
          </p>
          <SocialMedia />
      </div>
    </div>
  )
})`
    display: flex;
    margin-bottom: ${() => rhythm(1.0)};
    .bio-content p {
        margin-bottom: 0;
    }
`;


export default Bio;
