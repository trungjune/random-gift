import { useState, useEffect } from 'react'
import './App.css'
import ParticleSystem from './components/ParticleSystem'
import GlowingOrb from './components/GlowingOrb'
import InteractiveCard from './components/InteractiveCard'
import ScrollReveal from './components/ScrollReveal'
import CursorTrail from './components/CursorTrail'
import GiftRandomizer from './components/GiftRandomizer'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    { icon: '🚀', title: 'Siêu Nhanh', desc: 'Được xây dựng với Vite và React', color: '#ff6b6b' },
    { icon: '✨', title: 'Hiện Đại', desc: 'UI/UX đẹp mắt và responsive', color: '#4ecdc4' },
    { icon: '🎨', title: 'Sáng Tạo', desc: 'Animations và effects lung linh', color: '#45b7d1' },
    { icon: '💎', title: 'Chất Lượng', desc: 'Code clean và performance cao', color: '#96ceb4' }
  ]

  return (
    <div className="app">
      {/* Cursor Trail */}
      <CursorTrail />
      
      {/* Particle System */}
      <ParticleSystem />
      
      {/* Glowing Orbs */}
      <GlowingOrb size={300} colors={['#ff6b6b', '#4ecdc4', '#45b7d1']} />
      <GlowingOrb size={200} colors={['#96ceb4', '#feca57', '#ff9ff3']} />
      <GlowingOrb size={150} colors={['#54a0ff', '#5f27cd', '#00d2d3']} />

      {/* Animated Background */}
      <div className="bg-animation">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`shape shape-${i + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="mouse-follower"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10
        }}
      ></div>

      {/* Gift Randomizer Section */}
      <section className={`hero ${isLoaded ? 'loaded' : ''}`}>
        <GiftRandomizer />
      </section>


    </div>
  )
}

export default App