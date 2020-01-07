/**
 * Creates links to social media sites.
 */

import React from 'react';
import {graphql, useStaticQuery} from "gatsby";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedin, faRedditSquare, faTwitterSquare, faGithubSquare} from "@fortawesome/free-brands-svg-icons";
import {faEnvelopeSquare} from "@fortawesome/free-solid-svg-icons";
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
                <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
            {` `}
            <a className={'social-link'} href={`https://github.com/${social.github}`} title="Github" rel="noopener noreferrer" target="_blank">
                <FontAwesomeIcon icon={faGithubSquare} />
            </a>
            {` `}
            <a className={'social-link'} href={`https://reddit.com/u/${social.reddit}`} title="Reddit" rel="noopener noreferrer" target="_blank">
                <FontAwesomeIcon icon={faRedditSquare} />
            </a>
            {` `}
            <a className={'social-link'} href={`https://instagram.com/${social.instagram}`} title="Instagram" rel="noopener noreferrer" target="_blank">
                <FontAwesomeIcon icon={faInstagram} />
            </a>
            {` `}
            <a className={'social-link'} href={`https://www.linkedin.com/in/${social.linkedin}`} title="LinkedIn" rel="noopener noreferrer" target="_blank">
                <FontAwesomeIcon icon={faLinkedin} />
            </a>
            {` `}
            <a className={'social-link'} href={`mailto:codeoftheprogrammer@gmail.com`} title="Email" rel="noopener noreferrer" target="_blank">
                <FontAwesomeIcon icon={faEnvelopeSquare} />
            </a>
        </SocialMediaLinks>
    );
};

export default SocialMedia;