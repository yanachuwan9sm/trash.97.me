import Link from 'next/link'

import { cn } from '_libs/utils'

export const Header = () => {
  return (
    <header className='-ml-2 mb-8 flex w-full select-none justify-between py-4 font-stack tracking-tighter'>
      <Link
        className={cn(
          'relative',
          "before:content-['_>']",
          "after:relative after:-bottom-[1px] after:ml-[0.2em] after:inline-block after:h-[14px] after:w-[2px] after:animate-[cursor_1s_infinite] after:bg-sky-400 after:content-['']",
        )}
        href='/'
      >
        <span className='pl-2 text-sky-400'>Trash.97</span>
      </Link>
      <nav className='flex flex-row gap-x-2'>
        <Link
          className='underline-offset-3 underline transition-colors duration-200 hover:text-mauve11 active:text-mauve10'
          href='/blog'
        >
          Blog
        </Link>
        <Link
          className='underline-offset-3 underline transition-colors duration-200 hover:text-mauve11'
          href='/about'
        >
          Me
        </Link>
      </nav>
    </header>
  )
}
