import { useState, useEffect } from 'react'
import './GlowingOrb.css'

const GlowingOrb = ({ size = 200, colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'] }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const moveOrb = () => {
      setPosition({
        x: Math.random() * (window.innerWidth - size),
        y: Math.random() * (window.innerHeight - size)
      })
    }

    const interval = setInterval(moveOrb, 3000)
    moveOrb() // Initial position

    return () => clearInterval(interval)
  }, [size])

  return (
    <div 
      className="glowing-orb"
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
        background: `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
        boxShadow: `0 0 ${size}px ${colors[1]}40`
      }}
    />
  )
}

export default GlowingOrb