import { Montserrat, Noto_Sans_JP } from 'next/font/google'
import localFont from 'next/font/local'

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const notojp = Noto_Sans_JP({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-notojp',
  display: 'swap',
})

export const mondwest = localFont({
  src: [
    {
      path: '../_fonts/PPMondwest-Regular.otf',
      style: 'normal',
    },
  ],
  variable: '--font-mondwest',
})

export const serenityOSEmoji = localFont({
  src: [
    {
      path: '../_fonts/SerenityOS-Emoji.ttf',
      style: 'normal',
    },
  ],
  variable: '--font-serenityOSEmoji',
})
