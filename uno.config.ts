// uno.config.ts
import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno,
  transformerDirectives, transformerVariantGroup
} from 'unocss'

const colors = [
  'white',
  'black',
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink'
];

const safelist = [
  ...colors.map((v) => `bg-${v}-100`),
  ...colors.map((v) => `bg-${v}-400`),
  ...colors.map((v) => `bg-${v}-500`),
  ...colors.map((v) => `hover:bg-${v}-100`),
  ...colors.map((v) => `hover:bg-${v}-300`),
  ...colors.map((v) => `hover:bg-${v}-400`),
  ...colors.map((v) => `hover:bg-${v}-500`),
  ...colors.map((v) => `border-${v}-400`),
  ...colors.map((v) => `border-${v}-500`),
  ...colors.map((v) => `text-${v}-500`),
  ...colors.map((v) => `hover:text-${v}-500`),
  'text-white',
  ...Array.from({ length: 8 }, (_, i) => `px-${i + 1}`),
  ...Array.from({ length: 8 }, (_, i) => `py-${i + 1}`),
  ...['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map((v) => `text-${v}`),
  ...['rounded-full', 'rounded-lg'],
  ...[
    'search',
    'edit',
    'check',
    'message',
    'star-off',
    'delete',
    'add',
    'share'
  ].map((v) => `i-ic-baseline-${v}`)
];

export default defineConfig({
  theme: {
    colors: {
      // ...
    }
  },
  safelist,
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    presetTypography()
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ]
})
