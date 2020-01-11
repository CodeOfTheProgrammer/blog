/**
 * Creates links to social media sites.
 */

import React from 'react';
import {graphql, useStaticQuery} from "gatsby";
import classnames from 'classnames';
import {FaComment, FaTwitterSquare, FaGithubSquare, FaRedditSquare, FaInstagram, FaLinkedin, FaEnvelopeSquare} from 'react-icons/fa';
import {scale} from '../utils/typography';

import styled from 'styled-components';

const SocialMediaLinks = styled.div`
  font-size: ${() => scale(0.6).fontSize};
  .social-link {
    color: #007acc;
    box-shadow: none;
  }
`;

const SocialMedia = ({className}) => {
  const data = useStaticQuery(graphql`
    query SocialMediaQuery {
      site {
        siteMetadata {
          social {
            disqus,
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
        <SocialMediaLinks className={classnames('social-media', className)}>
            <a className={'social-link'} href={`https://twitter.com/${social.twitter}`} title="Twitter" rel="noopener noreferrer" target="_blank">
                <FaTwitterSquare />
            </a>
            {` `}
            <a className={'social-link'} href={`mailto:codeoftheprogrammer@gmail.com`} title="Email" rel="noopener noreferrer" target="_blank">
                <FaEnvelopeSquare />
            </a>
            {` `}
            <a className={'social-link'} href={`https://disqus.com/by/${social.disqus}/`} title="Disqus" rel="noopener noreferrer" target="_blank">
                <FaComment />
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
        </SocialMediaLinks>
    );
};

export default SocialMedia;