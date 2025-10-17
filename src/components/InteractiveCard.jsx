import { useState } from 'react'
import './InteractiveCard.css'

const InteractiveCard = ({ title, description, icon, color = '#4ecdc4' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <div 
      className="interactive-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
        '--color': color
      }}
    >
      <div className="card-background">
        <div className="card-glow-effect" />
        {isHovered && (
          <div 
            className="mouse-glow"
            style={{
              left: mousePosition.x - 50,
              top: mousePosition.y - 50
            }}
          />
        )}
      </div>
      
      <div className="card-content">
        <div className="card-icon">{icon}</div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        
        <div className="card-stats">
          <div className="stat">
            <span className="stat-value">98%</span>
            <span className="stat-label">Success</span>
          </div>
          <div className="stat">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
        
        <button className="card-button">
          <span>Explore</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default InteractiveCard