import { useState, useEffect } from 'react'

export function useToolCards() {
  const [loading, setLoading] = useState(true)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const header = document.querySelector('.header') as HTMLElement
      const tool = document.querySelector('.tool') as HTMLElement

      if (header && tool) {
        const headerRect = header.getBoundingClientRect()
        const toolRect = tool.getBoundingClientRect()

        if (
          e.clientY <= headerRect.bottom &&
          e.clientX >= headerRect.left - 28 &&
          e.clientX <= headerRect.right
        ) {
          document.body.style.cursor = 'default'
        } else if (
          e.clientX >= toolRect.left &&
          e.clientX <= toolRect.right &&
          e.clientY >= toolRect.top + 100 &&
          e.clientY <= toolRect.bottom + 15
        ) {
          document.body.style.cursor = 'default'
        } else {
          switch (selectedCard) {
            case 8:
              document.body.style.cursor = 'url(/Cursor.svg), auto'
              break
            case 6:
            case 7:
            case 4:
            case 11:
              document.body.style.cursor = 'url(/ResizerCursor.svg), auto'
              break
            default:
              document.body.style.cursor = 'default'
          }
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [selectedCard])

  const handleSelect = (id: number, selection: boolean) => {
    if (selection) {
      setSelectedCard((prev) => (prev === id ? id : id))
    }
  }

  return { loading, selectedCard, handleSelect, setSelectedCard }
}

