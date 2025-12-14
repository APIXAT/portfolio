'use client'

import { useRouter } from 'next/navigation'
import { useBrands } from '@/contexts/BrandsContext'

export default function BrandsMarquee() {
  const { brands } = useBrands()
  const router = useRouter()

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands]

  const handleBrandClick = (brandId: string) => {
    router.push(`/brand/${brandId}`)
  }

  if (brands.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-discord-text-secondary">No brands added yet</p>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="absolute inset-0 bg-gradient-to-r from-discord-bg via-transparent to-discord-bg z-10 pointer-events-none" />
      
      <div className="flex marquee-container">
        {duplicatedBrands.map((brand, index) => (
          <button
            key={`${brand.id}-${index}`}
            onClick={() => handleBrandClick(brand.id)}
            className="flex-shrink-0 mx-8 h-20 w-32 md:h-24 md:w-40 flex items-center justify-center bg-discord-card border border-discord-border rounded-lg p-4 hover:border-discord-accent hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {brand.logoUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <span className="text-discord-text-secondary text-sm font-medium">
                {brand.name}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

