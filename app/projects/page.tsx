'use client'

import { useSearchParams } from 'next/navigation'
import { useBrands } from '@/contexts/BrandsContext'
import Navbar from '@/components/Navbar'
import Card from '@/components/Card'

export default function ProjectsPage() {
  const searchParams = useSearchParams()
  const brandId = searchParams.get('brand')
  const { brands } = useBrands()
  
  const selectedBrand = brands.find((b) => b.id === brandId)

  return (
    <div className="h-screen bg-discord-bg overflow-y-auto">
      <Navbar />
      <main className="pt-16 min-h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            {selectedBrand ? (
              <>
                <h1 className="text-3xl md:text-4xl font-bold text-discord-text-primary mb-2">
                  Projects - {selectedBrand.name}
                </h1>
                <p className="text-discord-text-secondary">
                  Filtered by brand: {selectedBrand.name}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-bold text-discord-text-primary mb-2">
                  Projects
                </h1>
                <p className="text-discord-text-secondary">
                  All projects will be displayed here
                </p>
              </>
            )}
          </div>

          <Card>
            <div className="text-center py-12">
              <p className="text-discord-text-secondary mb-4">
                {selectedBrand
                  ? `Projects for ${selectedBrand.name} will be displayed here.`
                  : 'Project cards will be displayed here.'}
              </p>
              <p className="text-sm text-discord-text-secondary opacity-70">
                This is a placeholder. Project management will be implemented separately.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

