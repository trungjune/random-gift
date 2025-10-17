import { useEffect, useState } from 'react'
import './CursorTrail.css'

const CursorTrail = () => {
  const [trail, setTrail] = useState([])
  let pointId = 0; // Counter để tạo unique ID

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: `trail-${Date.now()}-${++pointId}` // Unique ID
      }

      setTrail(prevTrail => {
        const newTrail = [newPoint, ...prevTrail.slice(0, 9)]
        return newTrail
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="cursor-trail">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="trail-point"
          style={{
            left: point.x,
            top: point.y,
            opacity: 1 - (index * 0.1),
            transform: `scale(${1 - (index * 0.1)})`,
            animationDelay: `${index * 0.05}s`
          }}
        />
      ))}
    </div>
  )
}

export default CursorTrail