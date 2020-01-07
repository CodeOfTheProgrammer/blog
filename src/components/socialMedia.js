/**
 * Creates links to social media sites.
 */

import React from 'react';
import {graphql, useStaticQuery} from "gatsby";
import {FaTwitterSquare, FaGithubSquare, FaRedditSquare, FaInstagram, FaLinkedin, FaEnvelopeSquare} from 'react-icons/fa';

import styled from 'styled-components';

const SocialMediaLinks = styled.div`
  font-size: 1.5rem;
  .social-link {
    color: #007acc;
    box-shadow: none;
  }
`;

const SocialMedia = () => {
  const data = useStaticQuery(graphql`
    query SocialMediaQuery {
      site {
        siteMetadata {
          social {
            github,
            instagram,
            linkedin,
            reddit,
            twitter
          }
        }
      }
    }
  `);

    const { social } = data.site.siteMetadata;

    return (
        <SocialMediaLinks className={'SocialMedia'}>
            <a className={'social-link'} href={`https://twitter.com/${social.twitter}`} title="Twitter" rel="noopener noreferrer" target="_blank">
                <FaTwitterSquare />
            </a>
            {` `}
            <a className={'social-link'} href={`https://github.com/${social.github}`} title="Github" rel="noopener noreferrer" target="_blank">
                <FaGithubSquare />
            </a>
            {` `}
            <a className={'social-link'} href={`https://reddit.com/u/${social.reddit}`} title="Reddit" rel="noopener noreferrer" target="_blank">
                <FaRedditSquare />
            </a>
            {` `}
            <a className={'social-link'} href={`https://instagram.com/${social.instagram}`} title="Instagram" rel="noopener noreferrer" target="_blank">
                <FaInstagram />
            </a>
            {` `}
            <a className={'social-link'} href={`https://www.linkedin.com/in/${social.linkedin}`} title="LinkedIn" rel="noopener noreferrer" target="_blank">
                <FaLinkedin />
            </a>
            {` `}
            <a className={'social-link'} href={`mailto:codeoftheprogrammer@gmail.com`} title="Email" rel="noopener noreferrer" target="_blank">
                <FaEnvelopeSquare />
            </a>
        </SocialMediaLinks>
    );
};

export default SocialMedia;