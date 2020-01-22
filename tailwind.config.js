/*
Tailwind - The Utility-First CSS Framework
A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).
Welcome to the Tailwind config file. This is where you can customize
Tailwind specifically for your project. Don't be intimidated by the
length of this file. It's really just a big JavaScript object and
we've done our very best to explain each section.
View the full documentation at https://tailwindcss.com.
*/

/* Utilities */
const pxToRem = (px, base = 16) => `${px / base}rem`
const getScaleValues = (step = 4, limit = 64) => {
  let scale = {}

  Array(limit / step).fill()
    .map((value, key) => pxToRem(key + 1))
    .forEach((value, key) => {
      scale[(key + 1) * step] = value
    })

  return scale
}

/* Config */
// const defaultConfig = require('tailwindcss/defaultConfig')()

const colors = {
  transparent: 'transparent',
  'black': '#000',
  'white': '#fff',
}

const spacing = {
  px: '1px',
  '0': '0',
  '1': pxToRem(4),
  '2': pxToRem(8),
  '3': pxToRem(12),
  '4': pxToRem(16),
  '5': pxToRem(20),
  '6': pxToRem(24),
  '8': pxToRem(32),
  '10': pxToRem(40),
  '12': pxToRem(48),
  '16': pxToRem(64),
  '20': pxToRem(80),
  '24': pxToRem(96),
  '32': pxToRem(128),
}

const sizing = {
  auto: 'auto',
  px: '1px',
  '1': pxToRem(4),
  '2': pxToRem(8),
  '3': pxToRem(12),
  '4': pxToRem(16),
  '5': pxToRem(20),
  '6': pxToRem(24),
  '8': pxToRem(32),
  '10': pxToRem(40),
  '12': pxToRem(48),
  '16': pxToRem(64),
  '20': pxToRem(80),
  '24': pxToRem(96),
  '32': pxToRem(128),
  '48': pxToRem(192),
  '64': pxToRem(256),
}

module.exports = {
  colors: colors,

  screens: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },

  fonts: {
    sans: [
      'system-ui',
      'BlinkMacSystemFont',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
    serif: [
      'Constantia',
      'Lucida Bright',
      'Lucidabright',
      'Lucida Serif',
      'Lucida',
      'DejaVu Serif',
      'Bitstream Vera Serif',
      'Liberation Serif',
      'Georgia',
      'serif',
    ],
    mono: [
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ],
  },

  textSizes: {
    'xs': pxToRem(12),
    'sm': pxToRem(14),
    base: pxToRem(16),
    'lg': pxToRem(18),
    'xl': pxToRem(20),
    '2xl': pxToRem(24),
    '3xl': pxToRem(30),
    '4xl': pxToRem(36),
    '5xl': pxToRem(48),
  },

  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  leading: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    loose: 2,
  },

  tracking: {
    tight: '-0.05em',
    normal: '0',
    wide: '0.05em',
  },

  textColors: colors,

  backgroundColors: colors,

  backgroundSize: {
    auto: 'auto',
    cover: 'cover',
    contain: 'contain',
  },

  borderWidths: {
    default: '1px',
    '0': '0',
  },

  borderColors: global.Object.assign({
    default: 'currentColor',
  }, colors),

  borderRadius: {
    default: '0.25rem',
    'full': '9999px',
  },

  width: global.Object.assign({
    '1/2': '50%',
    '1/3': '33.33333%',
    '2/3': '66.66667%',
    '1/4': '25%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.66667%',
    '5/6': '83.33333%',
    'full': '100%',
    'screen': '100vw',
  }, sizing),

  height: global.Object.assign({
    'full': '100%',
    'screen': '100vh',
  }, sizing),

  minWidth: {
    '0': '0',
    'full': '100%',
  },

  minHeight: {
    '0': '0',
    'full': '100%',
    'screen': '100vh',
  },

  maxWidth: {
    'xs': '20rem',
    'sm': '30rem',
    'md': '40rem',
    'lg': '50rem',
    'xl': '60rem',
    '2xl': '70rem',
    '3xl': '80rem',
    '4xl': '90rem',
    '5xl': '100rem',
    'full': '100%',
  },

  maxHeight: {
    'full': '100%',
    'screen': '100vh',
  },

  padding: global.Object.assign({}, spacing),

  margin: global.Object.assign({
    'auto': 'auto',
  }, spacing),

  negativeMargin: global.Object.assign({}, spacing),

  shadows: {
    default: '0 2px 4px 0 rgba(0, 0, 0, 0.10)',
    'md': '0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',
    'lg': '0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08)',
    'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    'outline': '0 0 0 3px rgba(52, 144, 220, 0.5)',
    'none': 'none',
  },

  zIndex: {
    auto: 'auto',
    '0': 0,
    '10': 10,
    '20': 20,
    '30': 30,
    '40': 40,
    '50': 50,
  },

  opacity: {
    '0': '0',
    '25': '0.25',
    '50': '0.5',
    '75': '0.75',
    '100': '1',
  },

  svgFill: {
    current: 'currentColor',
  },

  svgStroke: {
    current: 'currentColor',
  },

  /*
  |-----------------------------------------------------------------------------
  | Modules                  https://tailwindcss.com/docs/configuration#modules
  |-----------------------------------------------------------------------------
  |
  | Here is where you control which modules are generated and what variants are
  | generated for each of those modules.
  |
  | Currently supported variants:
  |   - responsive
  |   - hover
  |   - focus
  |   - focus-within
  |   - active
  |   - group-hover
  |
  | To disable a module completely, use `false` instead of an array.
  |
  */

  modules: {
    appearance: ['responsive'],
    backgroundAttachment: false,
    backgroundColors: [],
    backgroundPosition: false,
    backgroundRepeat: false,
    backgroundSize: false,
    borderCollapse: [],
    borderColors: [],
    borderRadius: false,
    borderStyle: false,
    borderWidths: [],
    cursor: [],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: false,
    fonts: [],
    fontWeights: [],
    height: ['responsive'],
    leading: ['responsive'],
    lists: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    objectFit: false,
    objectPosition: false,
    opacity: [],
    outline: ['focus'],
    overflow: [],
    padding: ['responsive'],
    pointerEvents: [],
    position: ['responsive'],
    resize: false,
    shadows: false,
    svgFill: [],
    svgStroke: [],
    tableLayout: false,
    textAlign: ['responsive'],
    textColors: ['responsive', 'hover'],
    textSizes: ['responsive'],
    textStyle: [],
    tracking: false,
    userSelect: false,
    verticalAlign: false,
    visibility: false,
    whitespace: [],
    width: ['responsive'],
    zIndex: [],
  },

  /*
  |-----------------------------------------------------------------------------
  | Plugins                                https://tailwindcss.com/docs/plugins
  |-----------------------------------------------------------------------------
  |
  | Here is where you can register any plugins you'd like to use in your
  | project. Tailwind's built-in `container` plugin is enabled by default to
  | give you a Bootstrap-style responsive container component out of the box.
  |
  | Be sure to view the complete plugin documentation to learn more about how
  | the plugin system works.
  |
  */

  plugins: [
    // require('tailwindcss/plugins/container')({
    //   center: true,
    //   padding: '1rem',
    // }),
  ],

  /*
  |-----------------------------------------------------------------------------
  | Advanced Options         https://tailwindcss.com/docs/configuration#options
  |-----------------------------------------------------------------------------
  |
  | Here is where you can tweak advanced configuration options. We recommend
  | leaving these options alone unless you absolutely need to change them.
  |
  */

  options: {
    prefix: '',
    important: false,
    separator: ':',
  },
}