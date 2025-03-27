"use client"

import { useEffect, useState } from "react"

type Props = {
  minWidth?: number
  maxWidth?: number
  children: React.ReactNode
}

const ResponsiveDisplay = ({ minWidth, maxWidth, children }: Props) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsVisible(
        (!minWidth || width >= minWidth) && (!maxWidth || width <= maxWidth)
      )
    }

    handleResize() // Run on mount
    window.addEventListener("resize", handleResize) // Update on resize

    return () => window.removeEventListener("resize", handleResize) // Cleanup
  }, [minWidth, maxWidth])

  return isVisible ? <>{children}</> : null
}

export default ResponsiveDisplay
