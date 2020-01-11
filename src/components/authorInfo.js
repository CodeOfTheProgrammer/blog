/**
 * AuthorInfo component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import {useStaticQuery, graphql} from "gatsby";
import classnames from 'classnames';
import Image from "gatsby-image";
import styled from 'styled-components';
import {rhythm} from "../utils/typography"
import SocialMedia from './socialMedia';

const BioImage = styled(Image)`
    margin-right: ${() => rhythm(1 / 2)};
    margin-bottom: 0;
    min-width: 50px;
    border-radius: 10%;
`;

const AuthorInfo = styled(({className}) => {
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

    const {author} = data.site.siteMetadata;
    return (
        <div className={classnames('author-info', className)}>
            <div className="bio">
                <BioImage
                    fixed={data.avatar.childImageSharp.fixed}
                    alt={author}
                    className="bio-image"
                />
                <div className="bio-content">
                    <p>
                        <strong>{author}</strong>
                    </p>
                    <p>
                        Annapolis, Maryland, USA
                    </p>
                </div>
            </div>
            <SocialMedia/>
        </div>
    )
})`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: 320px;
    .bio {
        display: flex;
        flex-direction: row;
        .bio-content p {
            margin-bottom: 0;
        }
    }
`;


export default AuthorInfo;
