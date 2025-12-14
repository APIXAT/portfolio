'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface InteractiveSkillCardProps {
  id: string
  name: string
  icon: string
  description: string[]
  isHovered: boolean
  hoveredId: string | null
  hoveredIndex: number
  onHover: (id: string | null) => void
  index: number
  totalItems: number
  gridCols: number
}

export default function InteractiveSkillCard({
  id,
  name,
  icon,
  description,
  isHovered,
  hoveredId,
  hoveredIndex,
  onHover,
  index,
  totalItems,
  gridCols,
}: InteractiveSkillCardProps) {
  const row = Math.floor(index / gridCols)
  const col = index % gridCols

  // Calculate if this item should be pushed away
  const shouldPushAway = hoveredId !== null && hoveredId !== id
  const hoveredRow = hoveredIndex >= 0 ? Math.floor(hoveredIndex / gridCols) : -1
  const hoveredCol = hoveredIndex >= 0 ? hoveredIndex % gridCols : -1

  // Calculate distance and push direction
  const rowDiff = Math.abs(row - hoveredRow)
  const colDiff = Math.abs(col - hoveredCol)
  const isAdjacent = (rowDiff <= 1 && colDiff <= 1) && (rowDiff + colDiff > 0)

  // Calculate push direction - reduced for compact layout
  let pushX = 0
  let pushY = 0
  if (shouldPushAway && isAdjacent) {
    if (col < hoveredCol) pushX = -4 // Push left
    if (col > hoveredCol) pushX = 4  // Push right
    if (row < hoveredRow) pushY = -4 // Push up
    if (row > hoveredRow) pushY = 4  // Push down
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-start"
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onHover(id)}
      onTouchEnd={() => onHover(null)}
      animate={{
        scale: isHovered ? 1.08 : shouldPushAway && isAdjacent ? 0.97 : 1,
        x: pushX,
        y: pushY,
        zIndex: isHovered ? 10 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Icon Container - Larger and more compact */}
      <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center">
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="w-full h-full bg-discord-card border border-discord-border rounded-lg flex items-center justify-center p-2 hover:border-discord-accent/50 transition-colors duration-300">
            <Image
              src={icon}
              alt={name}
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      </div>

      {/* Title and Description - Only visible on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-2 w-full max-w-[200px]"
          >
            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-sm md:text-base font-semibold text-discord-text-primary text-center mb-2"
            >
              {name}
            </motion.h3>

            {/* Description */}
            <motion.ul
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-1"
            >
              {description.map((item, idx) => (
                <li
                  key={idx}
                  className="text-xs md:text-sm text-discord-text-secondary flex items-start"
                >
                  <span className="text-discord-accent mr-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

