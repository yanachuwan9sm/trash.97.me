import { Header } from '_components/Header'
import { cn } from '_libs/utils'
import { mondwest, montserrat, notojp, serenityOSEmoji } from '_ui/font'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About me',
  description: 'description 🗑️ ',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <body
      className={cn(
        montserrat.variable,
        notojp.variable,
        mondwest.variable,
        serenityOSEmoji.variable,
        'font-sans antialiased',
        'mx-auto mb-10 min-h-screen max-w-2xl px-2 md:px-0',
      )}
    >
      <main className='flex flex-auto flex-col items-center justify-center px-2 md:px-0'>
        <Header />
        {children}
      </main>
    </body>
  )
}
