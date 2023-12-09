import {
  mauve,
  mauveDark,
  crimson,
  crimsonDark,
  indigo,
  indigoDark,
} from '@radix-ui/colors'
import typography from '@tailwindcss/typography'
import plugin from 'tailwindcss/plugin'

import type { Config } from 'tailwindcss'

const TextStrokePlugin = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      'text-stroke': (value) => ({
        '-webkit-text-stroke': `1px ${value}`,
        color: 'transparent',
      }),
    },
    { type: 'color', values: theme('colors') },
  )
})

export default {
  content: ['./app/**/*.{ts,tsx}', './content/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        ...mauve,
        ...mauveDark,
        ...crimson,
        ...crimsonDark,
        ...indigo,
        ...indigoDark,
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        notojp: ['var(--font-notojp)'],
        mondwest: ['var(--font-mondwest)'],
        serenityOSEmoji: ['var(--font-serenityOSEmoji)'],
        stack: [
          'Menlo',
          'Monaco',
          'Lucida Console',
          'Liberation Mono',
          'serif',
        ],
      },
      keyframes: {
        cursor: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [typography, TextStrokePlugin],
} satisfies Config
