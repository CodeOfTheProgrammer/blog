/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faLinkedin, faRedditSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { rhythm } from "../utils/typography"

const Bio = () => {
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
          social {
            instagram,
            linkedin,
            reddit,
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Written by <strong>{author}</strong> who lives and works in Annapolis, Maryland.
        {` `}
        <div>
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
      </p>
    </div>
  )
}

export default Bio
