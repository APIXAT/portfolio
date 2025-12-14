'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'

interface DropdownMenuProps {
  isMobile: boolean
  onClose: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function DropdownMenu({ isMobile, onClose, onMouseEnter, onMouseLeave }: DropdownMenuProps) {
  const router = useRouter()
  const { isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin } = useUser()
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const isDraggingRef = useRef<boolean>(false)

  const menuItems = [
    {
      label: 'Login / Signup',
      action: () => {
        setIsLoggedIn(true)
        setIsAdmin(false)
        onClose()
      },
      visible: !isLoggedIn,
    },
    {
      label: 'Projects',
      action: () => {
        router.push('/projects')
        onClose()
      },
      visible: true,
    },
    {
      label: 'Servers',
      action: () => {
        onClose()
      },
      visible: true,
    },
    {
      label: 'Logout',
      action: () => {
        setIsLoggedIn(false)
        setIsAdmin(false)
        onClose()
      },
      visible: isLoggedIn,
    },
    {
      label: 'Admin Panel',
      action: () => {
        router.push('/admin')
        onClose()
      },
      visible: isAdmin,
    },
  ].filter(item => item.visible)

  // Mobile touch gesture handling
  useEffect(() => {
    if (!isMobile || !menuRef.current) return

    const handleTouchMove = (e: TouchEvent) => {
      if (!menuRef.current) return

      const touch = e.touches[0]
      if (!touch) return

      if (!isDraggingRef.current) {
        isDraggingRef.current = true
      }

      // Prevent scrolling during drag gesture
      if (isDraggingRef.current) {
        e.preventDefault()
      }

      const menuRect = menuRef.current.getBoundingClientRect()
      const touchY = touch.clientY

      // Check if touch is within menu bounds
      if (touchY >= menuRect.top && touchY <= menuRect.bottom) {
        // Find which item is under the finger
        let currentIndex: number | null = null

        itemRefs.current.forEach((itemRef, index) => {
          if (itemRef) {
            const itemRect = itemRef.getBoundingClientRect()
            if (touchY >= itemRect.top && touchY <= itemRect.bottom) {
              currentIndex = index
            }
          }
        })

        setHighlightedIndex(currentIndex)
      } else {
        setHighlightedIndex(null)
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!menuRef.current) return

      const touch = e.changedTouches[0]
      if (!touch) {
        setHighlightedIndex(null)
        isDraggingRef.current = false
        return
      }

      const menuRect = menuRef.current.getBoundingClientRect()
      const touchY = touch.clientY

      // Check if touch ended within menu bounds
      if (touchY >= menuRect.top && touchY <= menuRect.bottom) {
        // Find which item was selected
        let selectedItemIndex: number | null = null

        itemRefs.current.forEach((itemRef, index) => {
          if (itemRef) {
            const itemRect = itemRef.getBoundingClientRect()
            if (touchY >= itemRect.top && touchY <= itemRect.bottom) {
              selectedItemIndex = index
            }
          }
        })

        if (selectedItemIndex !== null) {
          setSelectedIndex(selectedItemIndex)
          // Trigger selection animation (scale down + fade), then execute action
          setTimeout(() => {
            const item = menuItems[selectedItemIndex!]
            if (item) {
              item.action()
            }
            // Reset selection state after animation completes
            setTimeout(() => {
              setSelectedIndex(null)
            }, 100)
          }, 250) // Wait for scale down + fade animation
        } else {
          // Touch ended in menu but not on an item - close smoothly with slide-up + fade
          onClose()
        }
      } else {
        // Touch ended outside menu - close smoothly with slide-up + fade
        onClose()
      }

      setHighlightedIndex(null)
      isDraggingRef.current = false
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      isDraggingRef.current = false
    }
  }, [isMobile, menuItems, onClose])

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: -15, scale: 0.97, x: '-50%' }}
      animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
      exit={{ opacity: 0, y: -10, scale: 0.98, x: '-50%' }}
      transition={{
        duration: isMobile ? 0.25 : 0.3,
        ease: [0.16, 1, 0.3, 1], // iOS-style cubic-bezier ease-out
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-1/2 mt-3 w-56 rounded-xl bg-discord-card border border-discord-border shadow-2xl backdrop-blur-xl bg-opacity-95 overflow-hidden z-50"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="py-1.5">
        {menuItems.map((item, index) => {
          const isHighlighted = highlightedIndex === index
          const isSelected = selectedIndex === index

          // Calculate scale based on state
          const getScale = () => {
            if (isSelected) return 0.95 // Scale down for selection confirmation
            if (isHighlighted && isMobile) return 1.04 // Mobile highlight scale (1.03-1.06 range)
            return 1
          }

          // Calculate background color
          const getBackgroundColor = () => {
            if (isSelected) return 'rgba(24, 24, 27, 0.8)'
            if (isHighlighted && isMobile) return 'rgba(24, 24, 27, 0.6)' // Semi-transparent for mobile
            return 'transparent'
          }

          return (
            <motion.button
              key={item.label}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: getScale(),
                backgroundColor: getBackgroundColor(),
              }}
              transition={{
                delay: index * 0.02,
                duration: isSelected ? 0.25 : 0.2,
                ease: [0.16, 1, 0.3, 1], // iOS-style easing
              }}
              onClick={!isMobile ? item.action : undefined}
              className={`w-full text-left px-4 py-2.5 text-sm ${
                isHighlighted || isSelected
                  ? 'text-discord-text-primary'
                  : 'text-discord-text-secondary'
              } ${!isMobile ? 'hover:text-discord-text-primary hover:bg-discord-bg-secondary transition-colors duration-150' : ''}`}
            >
              {item.label}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

