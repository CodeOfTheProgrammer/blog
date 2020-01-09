import React from "react"
import {Link} from "gatsby"
import styled from 'styled-components';

import "./layout.css";
import {rhythm, scale} from "../utils/typography"
import {breakpointUp} from "../utils/breakpoints";

const Title = styled.h1`
    font-size: ${() => scale(0.25).fontSize};
    line-height: ${() => scale(0.25).lineHeight};
    margin-bottom: ${() => rhythm(1.5)};
    margin-top: 0; 

    @media ${breakpointUp.sm} {
        font-size: ${() => scale(0.5).fontSize};
        line-height: ${() => scale(0.5).lineHeight};
    }
        
    @media ${breakpointUp.md} {
        font-size: ${() => scale(1).fontSize};
        line-height: ${() => scale(1).lineHeight};
    }
    
    @media ${breakpointUp.lg} {
        font-size: ${() => scale(1.5).fontSize};
        line-height: ${() => scale(1.5).lineHeight};
    }
    
     @media ${breakpointUp.xl} {
        font-size: ${() => scale(2).fontSize};
        line-height: ${() => scale(2).lineHeight};
    }
`;

const TitleLink = styled(Link)`
    box-shadow: none;
    text-decoration: none;
    color: inherit;
`;

const Header = styled(({location, title, className}) => {
    return (
        <header className={className}>
            <Title>
                <TitleLink to={`/`}>{title}</TitleLink>
            </Title>
        </header>
    );
})`
    // TODO: Style the header
`;

const Layout = styled(({location, title, className, children}) => {
    return (
        <div className={className}>
            <Header location={location} title={title}/>
            <main>{children}</main>
            <footer>
                © {new Date().getFullYear()} Code of the Programmer
            </footer>
        </div>
    );
})`
    margin: ${() => `${rhythm(1.0)} ${rhythm(1.0)}`};
    padding: ${() => `${rhythm(1.5)} ${rhythm(1.5)}`};
    border-radius: ${() => rhythm(1.0)};
`;

export default Layout;
