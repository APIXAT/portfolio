'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Brand {
  id: string
  name: string
  logoUrl: string
  description: string
  createdAt: number
}

interface BrandsContextType {
  brands: Brand[]
  addBrand: (name: string, logoUrl: string, description: string) => void
  removeBrand: (id: string) => void
  updateBrand: (id: string, name: string, logoUrl: string, description: string) => void
}

const BrandsContext = createContext<BrandsContextType | undefined>(undefined)

export function BrandsProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([
    // Demo brands - will be managed from admin panel
  ])

  const addBrand = (name: string, logoUrl: string, description: string) => {
    const newBrand: Brand = {
      id: Date.now().toString(),
      name,
      logoUrl,
      description,
      createdAt: Date.now(),
    }
    setBrands((prev) => [...prev, newBrand])
  }

  const removeBrand = (id: string) => {
    setBrands((prev) => prev.filter((brand) => brand.id !== id))
  }

  const updateBrand = (id: string, name: string, logoUrl: string, description: string) => {
    setBrands((prev) =>
      prev.map((brand) =>
        brand.id === id ? { ...brand, name, logoUrl, description } : brand
      )
    )
  }

  return (
    <BrandsContext.Provider value={{ brands, addBrand, removeBrand, updateBrand }}>
      {children}
    </BrandsContext.Provider>
  )
}

export function useBrands() {
  const context = useContext(BrandsContext)
  if (context === undefined) {
    throw new Error('useBrands must be used within a BrandsProvider')
  }
  return context
}

