'use client'

import Card from './Card'

interface ProjectCardProps {
  name: string
  imageUrl: string
}

export default function ProjectCard({ name, imageUrl }: ProjectCardProps) {
  return (
    <Card className="p-0 overflow-hidden aspect-square cursor-pointer hover:border-discord-accent transition-all duration-300 hover:scale-105">
      <div className="relative w-full h-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-discord-bg-secondary flex items-center justify-center">
            <span className="text-discord-text-secondary text-sm font-medium">
              {name}
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-discord-bg/90 to-transparent p-4">
          <h3 className="text-discord-text-primary font-semibold text-sm md:text-base">
            {name}
          </h3>
        </div>
      </div>
    </Card>
  )
}

