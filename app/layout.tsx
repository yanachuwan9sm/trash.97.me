import './global.css'

import { baseUrl, withBaseUrl } from '_libs/utils'

import type { Metadata } from 'next'

const title = 'Trash.97'
const description = '🗑️ is Frontend Developer, writer.'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: '%s | Trash.97',
  },
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    url: withBaseUrl('/'),
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    title,
    description,
    card: 'summary',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html
      lang='ja'
      className='bg-mauve12 text-mauve1 dark:bg-mauve1 dark:text-mauve12'
    >
      <head />
      {children}
    </html>
  )
}
