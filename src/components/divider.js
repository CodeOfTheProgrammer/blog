import styled from 'styled-components';
import { rhythm } from '../utils/typography';

const Divider = styled.hr`
    color: rgba(0, 0, 0, 0.5);
    margin-top: ${() => rhythm(1 / 4)};
    margin-bottom: ${() => rhythm(1 / 4)};
`;

export default Divider;
