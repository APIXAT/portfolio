'use client'

import { useState } from 'react'
import Card from './Card'

interface SkillCardProps {
  name: string
  icon: string
  description: string[]
}

export default function SkillCard({ name, icon, description }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col items-center">
      {/* Skill Card */}
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className={`relative aspect-square w-full flex flex-col items-center justify-center p-4 transition-all duration-300 ${
          isHovered ? 'border-discord-accent/50 shadow-lg' : ''
        }`}
      >
        {/* Skill Icon - Centered */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-4xl md:text-5xl lg:text-6xl">
            {icon}
          </div>
        </div>

        {/* Skill Name - Displayed Clearly */}
        <div className="pb-2">
          <h3 className="text-sm md:text-base font-semibold text-discord-text-primary text-center">
            {name}
          </h3>
        </div>
      </Card>

      {/* Description Below Card */}
      <div className="mt-4 w-full">
        <ul className="space-y-1.5">
          {description.map((item, index) => (
            <li
              key={index}
              className="text-sm text-discord-text-secondary flex items-start"
            >
              <span className="text-discord-accent mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

