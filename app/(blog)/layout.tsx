import { Header } from '_components/Header'
import { cn } from '_libs/utils'
import { mondwest, montserrat, notojp, serenityOSEmoji } from '_ui/font'

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
        'mx-auto mb-10  max-w-2xl px-2 md:px-0',
      )}
    >
      <main className='flex h-full min-h-screen flex-col items-center justify-center px-2 md:px-0'>
        <Header />
        {children}
        <footer className='flex w-full  flex-col items-center justify-center gap-y-2 pb-2 pt-10'>
          <a href='https://notbyai.fyi' target='_blank' rel='noreferrer'>
            <picture>
              <source
                srcSet='/Written-By-Human-Not-By-AI-Badge-black.svg'
                media='(prefers-color-scheme: dark)'
              />
              <img
                src='/Written-By-Human-Not-By-AI-Badge-white.svg'
                alt='not by AI'
                height='22'
                width='80'
              />
            </picture>
          </a>
          <span className='font-stack text-sm text-mauve2 dark:text-mauve11'>
            Copyright © 2023 Yanachuwan9sm
          </span>
        </footer>
      </main>
    </body>
  )
}
