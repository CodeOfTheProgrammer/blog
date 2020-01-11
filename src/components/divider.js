import styled from 'styled-components';
import { rhythm } from '../utils/typography';

const Divider = styled.hr`
    margin-top: ${() => rhythm(1 / 2)};
    margin-bottom: ${() => rhythm(1 / 2)};
`;

export default Divider;
