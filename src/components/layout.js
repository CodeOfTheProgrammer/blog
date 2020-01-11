import React from 'react';
import {Link} from 'gatsby';
import classnames from 'classnames';
import styled from 'styled-components';

import "./layout.css";
import {rhythm, scale} from "../utils/typography"
import {breakpointUp, maxWidth} from "../utils/breakpoints";
import Divider from "./divider";
import AuthorInfo from "./authorInfo";

const Title = styled.h1`
    font-size: ${() => scale(0.8).fontSize};
    line-height: ${() => scale(0.8).lineHeight};
    margin-bottom: ${() => rhythm(1/4)};
    margin-top: 0; 

    @media ${breakpointUp.sm} {
        font-size: ${() => scale(1.1).fontSize};
        line-height: ${() => scale(1.1).lineHeight};
    }

    @media ${breakpointUp.md} {
        font-size: ${() => scale(1.4).fontSize};
        line-height: ${() => scale(1.4).lineHeight};
    }
`;

const TitleLink = styled(Link)`
    box-shadow: none;
    text-decoration: none;
    color: inherit;
`;

const Header = styled(({title, description, className}) => {
    return (
        <header className={classnames('header', className)}>
            <Title>
                <TitleLink to={`/`}>{title}</TitleLink>
            </Title>
            <p>{description}</p>
            <Divider/>
            <AuthorInfo />
            <Divider/>
        </header>
    );
})`
    margin-bottom: ${() => rhythm(1)};
`;

const Layout = styled(({title, description, className, children}) => {
    return (
        <div className={classnames('layout', className)}>
            <Header title={title} description={description} />
            <main>{children}</main>
            <footer>
                © {new Date().getFullYear()}, Eric Turner
            </footer>
        </div>
    );
})`
    margin-left: auto;
    margin-right: auto;
    padding: ${() => `${rhythm(1.5)} ${rhythm(1.5)}`};
    border-radius: ${() => rhythm(1.0)};
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
