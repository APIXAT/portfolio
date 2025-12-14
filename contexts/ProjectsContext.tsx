'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Project {
  id: string
  name: string
  imageUrl: string
  brandId: string
  createdAt: number
}

interface ProjectsContextType {
  projects: Project[]
  addProject: (name: string, imageUrl: string, brandId: string) => void
  removeProject: (id: string) => void
  updateProject: (id: string, name: string, imageUrl: string, brandId: string) => void
  getProjectsByBrand: (brandId: string) => Project[]
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])

  const addProject = (name: string, imageUrl: string, brandId: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      imageUrl,
      brandId,
      createdAt: Date.now(),
    }
    setProjects((prev) => [...prev, newProject])
  }

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id))
  }

  const updateProject = (id: string, name: string, imageUrl: string, brandId: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, name, imageUrl, brandId } : project
      )
    )
  }

  const getProjectsByBrand = (brandId: string) => {
    return projects.filter((project) => project.brandId === brandId)
  }

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, removeProject, updateProject, getProjectsByBrand }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }
  return context
}

