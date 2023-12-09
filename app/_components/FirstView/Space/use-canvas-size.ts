import { useEffect, useState } from 'react'

export const useCanvasSize = (
  ref: React.RefObject<HTMLCanvasElement>,
): number[] => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current?.parentElement) {
        return
      }
      const { clientHeight, clientWidth } = ref.current.parentElement

      setWidth(clientWidth)
      setHeight(clientHeight)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [ref])

  return [width, height]
}
