'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import DropdownMenu from './DropdownMenu'

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const touchStartTime = useRef<number>(0)
  const touchHoldTimer = useRef<NodeJS.Timeout | null>(null)
  const clickTimer = useRef<NodeJS.Timeout | null>(null)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Only add touchstart for outside clicks, not for gesture handling
      if (!isMobile) {
        document.addEventListener('touchstart', handleClickOutside)
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isDropdownOpen, isMobile])

  const handleBrandClick = (e: React.MouseEvent) => {
    // Always navigate to Home on click
    e.preventDefault()
    e.stopPropagation()
    
    // Visual feedback animation
    setIsAnimating(true)
    
    // Navigate to home
    router.push('/')
    
    // Reset animation after duration
    if (clickTimer.current) {
      clearTimeout(clickTimer.current)
    }
    clickTimer.current = setTimeout(() => {
      setIsAnimating(false)
    }, 150)
  }

  const handleBrandHover = () => {
    // Desktop: hover opens dropdown (subtle highlight via CSS)
    if (!isMobile) {
      setIsDropdownOpen(true)
    }
  }

  const handleBrandLeave = () => {
    // Desktop: hover closes dropdown
    if (!isMobile) {
      setTimeout(() => {
        if (!dropdownRef.current?.matches(':hover')) {
          setIsDropdownOpen(false)
        }
      }, 100)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return
    
    touchStartTime.current = Date.now()
    
    // Start touch and hold timer for dropdown
    touchHoldTimer.current = setTimeout(() => {
      setIsDropdownOpen(true)
    }, 300) // 300ms hold time for long press
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return
    
    const touchDuration = Date.now() - touchStartTime.current
    
    // If it was a short tap (not a long press), navigate to home
    if (touchHoldTimer.current && touchDuration < 300) {
      clearTimeout(touchHoldTimer.current)
      touchHoldTimer.current = null
      
      // Visual feedback animation
      setIsAnimating(true)
      
      // Navigate to home
      router.push('/')
      
      // Reset animation after duration
      if (clickTimer.current) {
        clearTimeout(clickTimer.current)
      }
      clickTimer.current = setTimeout(() => {
        setIsAnimating(false)
      }, 150)
    } else {
      // Long press completed, dropdown is already open
      if (touchHoldTimer.current) {
        clearTimeout(touchHoldTimer.current)
        touchHoldTimer.current = null
      }
    }
  }

  const handleTouchCancel = () => {
    if (touchHoldTimer.current) {
      clearTimeout(touchHoldTimer.current)
      touchHoldTimer.current = null
    }
  }

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (touchHoldTimer.current) {
        clearTimeout(touchHoldTimer.current)
      }
      if (clickTimer.current) {
        clearTimeout(clickTimer.current)
      }
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-discord-bg-secondary border-b border-discord-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="relative" ref={dropdownRef}>
            <motion.button
              onClick={handleBrandClick}
              onMouseEnter={handleBrandHover}
              onMouseLeave={handleBrandLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
              animate={{
                scale: isAnimating ? 0.96 : 1,
                opacity: isAnimating ? 0.85 : 1,
              }}
              transition={{
                duration: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-discord-text-primary text-xl font-semibold hover:text-discord-accent transition-colors duration-200 cursor-pointer relative px-2 py-1 -mx-2 -my-1"
            >
              <span className="relative z-10">APIXAT</span>
              {isAnimating && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-discord-accent/30 pointer-events-none"
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                />
              )}
            </motion.button>
            <AnimatePresence>
              {isDropdownOpen && (
                <DropdownMenu
                  isMobile={isMobile}
                  onClose={() => setIsDropdownOpen(false)}
                  onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
                  onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  )
}

