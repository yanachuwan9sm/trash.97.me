import { Space } from '_components/FirstView/Space'

import { getBlogPosts } from '../_libs/blog-contents'

export default function Page() {
  const allPosts = getBlogPosts()

  return (
    <>
      <div className='relative  h-[80svh] w-full '>
        <div className='absolute inset-0'>
          <Space />
          <h1 className='absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  transform'>
            <div className='flex flex-col items-center justify-center font-mondwest  text-[clamp(3rem,14vw,8rem)] leading-none'>
              <span>Hey!</span>
              <span>This is</span>
              <span className='font-serenityOSEmoji leading-tight'>🗑️</span>
              <span>
                Trash.<span className='bg-white text-mauve1'>97</span>
              </span>
            </div>
          </h1>
        </div>
      </div>
    </>
  )
}
