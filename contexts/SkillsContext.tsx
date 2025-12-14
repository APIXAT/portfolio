'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Skill {
  id: string
  name: string
  icon: string // Icon URL or emoji/character
  description: string[]
}

interface SkillsContextType {
  skills: Skill[]
  addSkill: (name: string, icon: string, description: string[]) => void
  removeSkill: (id: string) => void
  updateSkill: (id: string, name: string, icon: string, description: string[]) => void
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined)

export function SkillsProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: '1',
      name: 'Design',
      icon: '/skills-icons/design.svg',
      description: [
        'Photoshop (UI, Merch, Visual Design)',
        'AI-assisted design workflows',
        'Digital drawing',
      ],
    },
    {
      id: '2',
      name: 'PC & Systems',
      icon: '/skills-icons/pc-systems.svg',
      description: [
        'PC optimization & performance',
        'Hardware repair & upgrades',
        'Software installation & troubleshooting',
      ],
    },
    {
      id: '3',
      name: 'Networks & Surveillance',
      icon: '/skills-icons/networks.svg',
      description: [
        'Network system installation',
        'CCTV & camera surveillance',
        'PBX / telephone central systems',
      ],
    },
    {
      id: '4',
      name: 'Automotive Mechanics',
      icon: '/skills-icons/automotive.svg',
      description: [
        'Car maintenance & diagnostics',
        'Thermal engine systems',
        'Mechanical troubleshooting',
      ],
    },
    {
      id: '5',
      name: 'Cybersecurity',
      icon: '/skills-icons/cybersecurity.svg',
      description: [
        'White-hat security mindset',
        'AI-assisted security tools',
        'Attack & defense knowledge',
        'Hardware & software firewalls',
      ],
    },
    {
      id: '6',
      name: 'Web / Frontend',
      icon: '/skills-icons/web-frontend.svg',
      description: [
        'UI implementation',
        'Responsive layouts',
        'Firebase integration',
      ],
    },
    {
      id: '7',
      name: 'AI Tools & Automation',
      icon: '/skills-icons/ai-automation.svg',
      description: [
        'AI-assisted coding',
        'AI workflows',
        'Productivity automation',
      ],
    },
    {
      id: '8',
      name: 'Gaming & PC Builds',
      icon: '/skills-icons/gaming-pc.svg',
      description: [
        'Custom PC builds',
        'Hardware compatibility',
        'Gaming performance optimization',
      ],
    },
  ])

  const addSkill = (name: string, icon: string, description: string[]) => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name,
      icon,
      description,
    }
    setSkills((prev) => [...prev, newSkill])
  }

  const removeSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id))
  }

  const updateSkill = (id: string, name: string, icon: string, description: string[]) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, name, icon, description } : skill
      )
    )
  }

  return (
    <SkillsContext.Provider value={{ skills, addSkill, removeSkill, updateSkill }}>
      {children}
    </SkillsContext.Provider>
  )
}

export function useSkills() {
  const context = useContext(SkillsContext)
  if (context === undefined) {
    throw new Error('useSkills must be used within a SkillsProvider')
  }
  return context
}

