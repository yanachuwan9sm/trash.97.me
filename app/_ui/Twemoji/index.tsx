import Image from 'next/image'
import React from 'react'
import twemoji from 'twemoji'

export type TwemojiProps = {
  emoji: string
  ext?: 'svg' | 'png'
  width?: number
  height?: number
}

export const Twemoji = ({
  emoji,
  ext = 'svg',
  height = 72,
  width = 72,
}: TwemojiProps) => {
  const U200D = String.fromCharCode(0x200d)
  const UFE0Fg = /\uFE0F/g

  const BLUE_BOOK_CODE_UNIT_UTF16 = '\ud83d\udcd8'

  /**
   *
   * 0x200D が存在しない場合、0xFE0F が Code Unit(UTF-16)に含まれた状態で Code Point に変換すると、正常なTwemojiが表示されないため
   * 0x200D が存在しない場合、0xFE0F は Code Unitから削除する
   *
   * ```
   * // error
   * twemoji.convert.toCodePoint('\u2639\ufe0f')
   * // 2639-fe0f
   *
   * // ok
   * twemoji.convert.toCodePoint('\u2639')
   * // 2639
   *
   * // ok
   * twemoji.convert.toCodePoint('\u2764\ufe0f\u200d\ud83d\udd25')
   * // 2764-fe0f-200d-1f525
   * ```
   */
  const utf16surrogatePairs =
    emoji.indexOf(U200D) < 0 ? emoji.replace(UFE0Fg, '') : emoji

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const HEXCodePoint = twemoji.convert.toCodePoint(
    utf16surrogatePairs !== ''
      ? utf16surrogatePairs
      : BLUE_BOOK_CODE_UNIT_UTF16,
  )

  return (
    <Image
      src={`https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/${
        ext === 'png' ? '72x72' : 'svg'
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      }/${HEXCodePoint}.${ext}`}
      alt={emoji}
      width={width}
      height={height}
      loading='lazy'
      draggable={false}
    />
  )
}
