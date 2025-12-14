'use client'

import { useParams } from 'next/navigation'
import { useBrands } from '@/contexts/BrandsContext'
import { useProjects } from '@/contexts/ProjectsContext'
import Navbar from '@/components/Navbar'
import ProjectCard from '@/components/ProjectCard'

export default function BrandDetailsPage() {
  const params = useParams()
  const brandId = params.id as string
  const { brands } = useBrands()
  const { getProjectsByBrand } = useProjects()

  const brand = brands.find((b) => b.id === brandId)
  const projects = brand ? getProjectsByBrand(brandId) : []

  if (!brand) {
    return (
      <div className="h-screen bg-discord-bg overflow-y-auto">
        <Navbar />
        <main className="pt-16 min-h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-discord-text-primary mb-4">
                Brand Not Found
              </h1>
              <p className="text-discord-text-secondary">
                The brand you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="h-screen bg-discord-bg overflow-y-auto">
      <Navbar />
      <main className="pt-16 min-h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Brand Header Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              {/* Brand Logo */}
              <div className="flex-shrink-0">
                {brand.logoUrl ? (
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-discord-card border border-discord-border rounded-lg p-4 flex items-center justify-center">
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-discord-card border border-discord-border rounded-lg flex items-center justify-center">
                    <span className="text-discord-text-secondary text-2xl font-bold">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Brand Name and Description */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-discord-text-primary mb-4">
                  {brand.name}
                </h1>
                {brand.description && (
                  <p className="text-lg md:text-xl text-discord-text-secondary max-w-2xl">
                    {brand.description}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Projects Grid Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-discord-text-primary mb-6">
              Projects
            </h2>
            {projects.length === 0 ? (
              <div className="text-center py-12 bg-discord-card border border-discord-border rounded-lg">
                <p className="text-discord-text-secondary">
                  No projects available for this brand yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    name={project.name}
                    imageUrl={project.imageUrl}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

