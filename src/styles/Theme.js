import { theme } from 'rebass'
import reboot from 'styled-reboot'

export const colors = {
    white: '#fff',
    black: '#000',
    jaguar: '#1d1c1e',
    fuscousGrey: '#484648',
    red: '#f46767',
    green: '#60dca8',
    blue: '#4029dd',
    yellow: '#ffdb97',
    alizarin: '#ee2739'
}

// export const breakpoints = [
//     `575px`, `767px`, `991px`, `1200px`, `1366px`, `1920px`
// ]

export const breakpoints = [
    576,
    768,
    992,
    1200,
    1366,
    1600,
    1920
]

export const space = [
    0, 20
]

export const fonts = {
    serif: 'Inknut Antiqua, serif',
    mono: 'PT Mono, monospace'
}

export const fontSizes = [
    10,
    14,
    16,
    25,
    30,
    40,
    48,
    52,
    80
]

export const rebootCSS = reboot({
    fontFamilyBase: fonts.mono,
    fontFamilyMonospace: fonts.mono,
    fontFamilySerif: fonts.serif,
    linkColor: colors.white
});

export default {
    ...theme,
    breakpoints,
    colors,
    space,
    fonts,
    fontSizes
}
