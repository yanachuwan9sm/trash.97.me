'use client'

import { vec2, vec3 } from 'gl-matrix'
import { useEffect, useRef } from 'react'

import { useCanvasSize } from './use-canvas-size'

const random = (minNum: number, maxNum: number) => {
  return Math.random() * (maxNum - minNum) + minNum
}

const randomInt = (minNum: number, maxNum: number) => {
  return Math.floor(Math.random() * (maxNum - minNum) + minNum)
}

const STAR_COLOR = [
  '#FF7900',
  '#F94E5D',
  '#CA4B8C',
  '#835698',
  '#445582',
  '#2F4858',
  '#845EC2',
  '#D65DB1',
  '#FF6F91',
  '#FF9671',
  '#FFC75F',
  '#F9F871',
  '#F24B8E',
  '#F6ACC2',
  '#FFE3F1',
  '#59BAB7',
  '#1FAAFE',
  '#00C6FF',
  '#00DCE4',
  '#10ECB8',
  '#A0F68B',
  '#F9F871',
]

const DISTANCE_Z = 60
const sizeRatio = random(0.09, 0.2)
const SCALE = 50

type Star = {
  position: vec3
  screenPosition: vec2
  size: number
  speed: number
  color: string
}

const genStartPosition = (height: number): vec3 => {
  const angle = random(0, 2 * Math.PI)
  const radius = random(height / SCALE, height) * SCALE

  const x = Math.sin(angle) * radius
  const y = Math.cos(angle) * radius

  return vec3.fromValues(x, y, DISTANCE_Z)
}

const createStar = (height: number): Star => {
  return {
    position: genStartPosition(height),
    screenPosition: vec2.fromValues(0, 0),
    size: randomInt(1, 5),
    speed: random(0.05, 0.25),
    color: STAR_COLOR[Math.floor(Math.random() * STAR_COLOR.length)],
  }
}

export const Space = () => {
  const ref = useRef<HTMLCanvasElement>(null)
  const [width, height] = useCanvasSize(ref)

  const canvasCenterVec = vec2.fromValues(width / 2, height / 2)
  const starNum = 125

  useEffect(() => {
    if (ref.current === null) {
      return
    }
    const canvas = ref.current

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')

    if (ctx === null) {
      return
    }

    const stars: Star[] = new Array(starNum)
      .fill(null)
      .map(() => createStar(height))

    const update = () => {
      stars.forEach((star) => {
        /* 全体を通して、透視投影変換（perspective projection）のようなアニメーションを平面上で行う */

        /* starを次の移動座標に更新する */
        const isStarOutOfBounds = star.position[2] - star.speed < 1
        const nextStarPosition = isStarOutOfBounds
          ? genStartPosition(height)
          : vec3.add(
              star.position,
              star.position,
              vec3.fromValues(0, 0, -star.speed),
            )
        Object.assign(star, {
          position: nextStarPosition,
        })

        /* 3次元座標を持つstarを2次元座標に変換し、canvas要素の中心を基点とした2次元座標に更新する */
        const starVec = vec2.fromValues(star.position[0], star.position[1])
        const zOnlyVec = vec2.fromValues(star.position[2], star.position[2])
        const starVecWithoutZVec = vec2.div(vec2.create(), starVec, zOnlyVec)
        Object.assign(star, {
          screenPosition: vec2.add(
            vec2.create(),
            starVecWithoutZVec,
            canvasCenterVec,
          ),
        })

        /* starの大きさを更新する */
        const size =
          (DISTANCE_Z - star.position[2]) / (star.position[2] * sizeRatio)
        Object.assign(star, { size })

        /* starを回転させる */
        const x =
          star.position[0] * Math.cos(0.003) -
          star.position[1] * Math.sin(0.003)
        const y =
          star.position[0] * Math.sin(0.003) +
          star.position[1] * Math.cos(0.003)
        star.position[0] = x
        star.position[1] = y
      })
    }

    const draw = () => {
      stars
        .sort((a, b) => b.position[2] - a.position[2])
        .forEach((star) => {
          const { color, screenPosition, size } = star

          const gradient = ctx.createRadialGradient(
            screenPosition[0],
            screenPosition[1],
            size * 0.15,
            screenPosition[0],
            screenPosition[1],
            size,
          )

          gradient.addColorStop(0, color)
          gradient.addColorStop(1, 'transparent')

          /* setting */
          ctx.fillStyle = gradient
          ctx.globalAlpha = size / DISTANCE_Z

          /*  star path */
          ctx.beginPath()
          ctx.arc(
            screenPosition[0],
            screenPosition[1],
            size,
            0,
            2 * Math.PI,
            false,
          )
          ctx.closePath()
          /* render */
          ctx.fill()
        })
    }

    let handle = 0
    const frame = () => {
      update()
      ctx.clearRect(0, 0, width, height)
      draw()
      handle = requestAnimationFrame(frame)
    }

    frame()

    return () => {
      cancelAnimationFrame(handle)
    }
  }, [canvasCenterVec, height, width])
  return <canvas ref={ref}></canvas>
}
