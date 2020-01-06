/**
 * Creates links to social media sites.
 */

import React from 'react';
import {graphql, useStaticQuery} from "gatsby";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedin, faRedditSquare, faTwitterSquare} from "@fortawesome/free-brands-svg-icons";
import {faEnvelopeSquare} from "@fortawesome/free-solid-svg-icons";

const SocialMedia = () => {
  const data = useStaticQuery(graphql`
    query SocialMediaQuery {
      site {
        siteMetadata {
          social {
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
        <div className={'SocialMedia'}>
            <a className={'social-link'} href={`https://twitter.com/${social.twitter}`} target="_blank">
                <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
            {` `}
            <a className={'social-link'} href={`https://reddit.com/u/${social.reddit}`} target="_blank">
                <FontAwesomeIcon icon={faRedditSquare} />
            </a>
            {` `}
            <a className={'social-link'} href={`https://instagram.com/${social.instagram}`} target="_blank">
                <FontAwesomeIcon icon={faInstagram} />
            </a>
            {` `}
            <a className={'social-link'} href={`https://www.linkedin.com/in/${social.linkedin}`} target="_blank">
                <FontAwesomeIcon icon={faLinkedin} />
            </a>
            {` `}
            <a className={'social-link'} href={`mailto:codeoftheprogrammer@gmail.com`} target="_blank">
                <FontAwesomeIcon icon={faEnvelopeSquare} />
            </a>
        </div>
    );
};

export default SocialMedia;