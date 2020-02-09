import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import styled from 'styled-components';

import './layout.css';
import { rhythm, scale } from '../utils/typography';
import { breakpointUp, maxWidth } from '../utils/breakpoints';
import Divider from './divider';
import AuthorInfo from './authorInfo';

const Logo = styled(({ src, to, className }) => (
    <Link className={classnames('logo', className)} to={to}>
        <img src={src} alt='logo' />
    </Link>
))`
    line-height: 0;
    img {
        height: 32px;
        transform: rotate(-45deg);
        margin: 0;
        padding: 0;
        opacity: 0.5;

        @media ${breakpointUp.sm} {
            height: 48px;
        }

        @media ${breakpointUp.md} {
            height: 64px;
        }

        @media ${breakpointUp.lg} {
            height: 80px;
        }

        @media ${breakpointUp.xl} {
            height: 96px;
        }
    }
`;

const TitleLink = styled(Link)`
    padding-left: ${() => rhythm(1 / 4)};
    box-shadow: none;
    text-decoration: none;
    color: inherit;

    @media ${breakpointUp.sm} {
        padding-left: ${() => rhythm(1 / 3)};
    }

    @media ${breakpointUp.md} {
        padding-left: ${() => rhythm(1 / 2)};
    }

    @media ${breakpointUp.lg} {
        padding-left: ${() => rhythm(2 / 3)};
    }

    @media ${breakpointUp.xl} {
        padding-left: ${() => rhythm(3 / 4)};
    }
`;

const Title = styled.h1`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 0;
    margin-bottom: ${() => rhythm(1 / 4)};
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.5);

    :hover {
        color: #007acc;
    }
`;

const Description = styled.p`
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    margin-top: ${() => rhythm(3 / 4)};
`;

const Header = styled(({ title, description, className }) => {
    return (
        <header className={classnames('header', className)}>
            <Title>
                <Logo src="/qrcode.svg" to={`/`} />
                <TitleLink to={`/`}>{title}</TitleLink>
            </Title>
            <Description>{description}</Description>
            <Divider />
            <AuthorInfo />
            <Divider />
        </header>
    );
})`
    margin-bottom: ${() => rhythm(1)};
`;

const Footer = styled(({ copyrightRange, className }) => {
    // Default to showing 2020-<current year> as the copyright range in the footer
    // since that is the full range of the copyright dates of the blog.
    if (!copyrightRange) {
        const startYear = 2020;
        const currentYear = new Date().getFullYear();
        if (currentYear > startYear) {
            copyrightRange = `${startYear}-${currentYear}`;
        } else {
            copyrightRange = `${currentYear}`;
        }
    }
    return (
        <footer className={classnames('footer', className)}>
            © {copyrightRange}, Eric Turner
        </footer>
    );
})`
    color: rgba(0, 0, 0, 0.5);
    padding: ${() => rhythm(2)};
    text-align: center;
`;

const Layout = styled(({ title, description, copyrightRange, className, children }) => {
    return (
        <div className={classnames('layout', className)}>
            <Header title={title} description={description} />
            <main>{children}</main>
            <Footer copyrightRange={copyrightRange}/>
        </div>
    );
})`
    margin-left: auto;
    margin-right: auto;
    padding: ${() => `${rhythm(1.5)} ${rhythm(1.5)}`};
    border-radius: ${() => rhythm(1)};
    max-width: ${() => maxWidth.lg};

    @media ${breakpointUp.sm} {
        padding: ${() => `${rhythm(2)} ${rhythm(2)}`};
    }

    @media ${breakpointUp.md} {
        padding: ${() => `${rhythm(2.5)} ${rhythm(2.5)}`};
    }

    @media ${breakpointUp.lg} {
        padding: ${() => `${rhythm(3)} ${rhythm(3)}`};
    }

    @media ${breakpointUp.xl} {
        padding: ${() => `${rhythm(3.5)} ${rhythm(3.5)}`};
    }
`;

export default Layout;
