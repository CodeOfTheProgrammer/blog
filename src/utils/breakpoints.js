/**
 * Example usage:
 *
 * import {breakpointUp} from './breakpoints';
 *
 * @media ${breakpointUp.lg} {
 *   ...
 * }
 *
 */

export const minWidth = {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
};

export const maxWidth = {
    xs: '575.98px',
    sm: '767.98px',
    md: '991.98px',
    lg: '1199.98px',
    xl: '99999.98px',
};

export const breakpointUp = {
    xs: `(min-width: ${minWidth.xs})`,
    sm: `(min-width: ${minWidth.sm})`,
    md: `(min-width: ${minWidth.md})`,
    lg: `(min-width: ${minWidth.lg})`,
    xl: `(min-width: ${minWidth.xl})`,
};

export const breakpointDown = {
    xs: `(max-width: ${maxWidth.xs})`,
    sm: `(max-width: ${maxWidth.sm})`,
    md: `(max-width: ${maxWidth.md})`,
    lg: `(max-width: ${maxWidth.lg})`,
    xl: `(max-width: ${maxWidth.xl})`,
};

export const breakpointOnly = {
    xs: `${breakpointUp.xs} and ${breakpointDown.xs}`,
    sm: `${breakpointUp.sm} and ${breakpointDown.sm}`,
    md: `${breakpointUp.md} and ${breakpointDown.md}`,
    lg: `${breakpointUp.lg} and ${breakpointDown.lg}`,
    xl: `${breakpointUp.xl} and ${breakpointDown.xl}`,
};
