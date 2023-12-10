import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About me',
  description: 'description 🗑️ ',
}

export default function Page() {
  return (
    <>
      <h2 className='relative mb-4 font-mondwest text-4xl'>
        <span>About Me</span>
        <span className='absolute  left-[3px] w-full text-stroke-mauve1 dark:text-stroke-mauve12'>
          About Me
        </span>
      </h2>
      <div className='mt-10 text-left font-stack'>
        <p>
          <strong>ya7(trash97)</strong> is a Beginner Frontend developer based
          in Japan.
        </p>
        <h3>SNS</h3>
        <a
          className='font-bold text-sky-600 decoration-sky-600 decoration-[0.1em] underline-offset-2 transition-all hover:bg-sky-200 hover:text-mauve1 dark:text-sky-400 dark:decoration-sky-400 dark:hover:bg-sky-400'
          href='https://github.com/yanachuwan9sm'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </a>
        <h3>mind</h3>
        <ul>
          <li>1. Do our best to improve the product.</li>
          <li>
            2. Give opinions without fear of criticism, and be frank when you
            criticize.
          </li>
          <li>
            3. Never create a job that only you can do, but seek to achieve
            results as a team.
          </li>
          <li>
            4.{' '}
            <strong>Enjoyment is the most important aspect of our work.</strong>
          </li>
        </ul>
        <h3>like</h3>
        <ul>
          <li>my family ❤️❤️❤️</li>
          <li>music (hiphop / randb / house)</li>
          <li>React / Next.js</li>
          <li>TypeScript</li>
          <li>WebGL technology</li>
          <li>design (modern / retro)</li>
        </ul>
        <h3>interest</h3>
        <ul>
          <li>UI / UX</li>
          <li>Design System</li>
          <li>Web performance</li>
          <li>Frontend Test</li>
          <li>WebSocket / WebWorker</li>
          <li>LLM(ChatGPT / LangChain)</li>
        </ul>
        <h3>outside of work</h3>
        <p>I`m dad.(wife & 2 sons ❤️)</p>
      </div>
    </>
  )
}
