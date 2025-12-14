'use client'

import Navbar from '@/components/Navbar'
import Card from '@/components/Card'
import BrandsMarquee from '@/components/BrandsMarquee'
import SkillsGrid from '@/components/SkillsGrid'
import { useSkills } from '@/contexts/SkillsContext'

export default function Home() {
  const { skills } = useSkills()

  return (
    <div className="h-screen bg-discord-bg overflow-y-auto">
      <Navbar />
      <main className="pt-16 min-h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Text content */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-discord-text-primary">
                  Bourfoun Amine
                </h1>
                <p className="text-xl md:text-2xl text-discord-accent font-medium">
                  @apixat
                </p>
                <p className="text-lg md:text-xl text-discord-text-secondary">
                  Designer • Frontend • PC Specialist
                </p>
              </div>

              {/* Right side - Profile image card */}
              <div className="flex justify-center lg:justify-end">
                <Card className="w-full max-w-md">
                  <div className="aspect-square w-full bg-discord-bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                    {/* Placeholder for profile image */}
                    <div className="w-full h-full bg-gradient-to-br from-discord-accent/20 to-discord-accent/5 flex items-center justify-center">
                      <span className="text-6xl font-bold text-discord-text-secondary">
                        BA
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Brands I Worked With Section */}
          <section className="mt-24 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-discord-text-primary mb-8 text-center">
              Brands I Worked With
            </h2>
            <BrandsMarquee />
          </section>

          {/* Skills Section */}
          {skills.length > 0 && (
            <section className="mt-24 mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-discord-text-primary mb-8 text-center">
                Skills
              </h2>
              <SkillsGrid />
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

