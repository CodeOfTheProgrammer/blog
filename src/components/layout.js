import React from "react"
import {Link} from "gatsby"
import styled from 'styled-components';

import "./layout.css";
import {rhythm, scale} from "../utils/typography"

const Title = styled.h1`
    font-size: ${props => props.fontSize};
    line-height: ${props => props.lineHeight};
    margin-bottom: ${props => props.marginBottom};
    margin-top: 0; 
`;

const TitleLink = styled(Link)`
    box-shadow: none;
    text-decoration: none;
    color: inherit;
`;

const Header = styled(({location, title, className}) => {
    const rootPath = `${__PATH_PREFIX__}/`;
    const factor = location.pathname === rootPath ? 1.5 : 0.5;
    return (
        <header className={className}>
            <Title {...scale(factor)} marginBottom={rhythm(factor)}>
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
