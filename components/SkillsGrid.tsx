'use client'

import { useState, useEffect } from 'react'
import { useSkills } from '@/contexts/SkillsContext'
import InteractiveSkillCard from './InteractiveSkillCard'

export default function SkillsGrid() {
  const { skills } = useSkills()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [gridCols, setGridCols] = useState(3)

  // Calculate grid columns based on screen size
  useEffect(() => {
    const updateGridCols = () => {
      if (window.innerWidth < 1024) setGridCols(2) // Mobile/Tablet: 2 columns
      else setGridCols(4) // Desktop: 4 columns
    }

    updateGridCols()
    window.addEventListener('resize', updateGridCols)
    return () => window.removeEventListener('resize', updateGridCols)
  }, [])

  if (skills.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 md:gap-1.5 lg:gap-2">
      {skills.map((skill, index) => {
        const hoveredIndex = hoveredId ? skills.findIndex(s => s.id === hoveredId) : -1
        return (
          <InteractiveSkillCard
            key={skill.id}
            id={skill.id}
            name={skill.name}
            icon={skill.icon}
            description={skill.description}
            isHovered={hoveredId === skill.id}
            hoveredId={hoveredId}
            hoveredIndex={hoveredIndex}
            onHover={setHoveredId}
            index={index}
            totalItems={skills.length}
            gridCols={gridCols}
          />
        )
      })}
    </div>
  )
}

