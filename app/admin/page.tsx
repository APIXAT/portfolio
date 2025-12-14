'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { useBrands } from '@/contexts/BrandsContext'
import Navbar from '@/components/Navbar'
import Card from '@/components/Card'

export default function AdminPanel() {
  const router = useRouter()
  const { isAdmin } = useUser()
  const { brands, addBrand, removeBrand } = useBrands()
  const [brandName, setBrandName] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [description, setDescription] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      router.push('/')
    }
  }, [isAdmin, router])

  if (!isAdmin) {
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Convert to data URL for preview (in real app, upload to server)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault()
    if (brandName.trim() && logoUrl.trim()) {
      addBrand(brandName.trim(), logoUrl, description.trim())
      setBrandName('')
      setLogoUrl('')
      setDescription('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveBrand = (id: string) => {
    if (confirm('Are you sure you want to remove this brand?')) {
      removeBrand(id)
    }
  }

  return (
    <div className="h-screen bg-discord-bg overflow-y-auto">
      <Navbar />
      <main className="pt-16 min-h-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-discord-text-primary mb-8">
            Admin Panel - Brand Management
          </h1>

          {/* Add Brand Form */}
          <Card className="mb-8">
            <h2 className="text-xl font-semibold text-discord-text-primary mb-4">
              Add New Brand
            </h2>
            <form onSubmit={handleAddBrand} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-discord-text-secondary mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-2 bg-discord-bg-secondary border border-discord-border rounded-lg text-discord-text-primary focus:outline-none focus:border-discord-accent"
                  placeholder="Enter brand name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-discord-text-secondary mb-2">
                  Brand Logo
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 bg-discord-bg-secondary border border-discord-border rounded-lg text-discord-text-primary focus:outline-none focus:border-discord-accent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-discord-accent file:text-white hover:file:bg-opacity-80"
                />
                {logoUrl && (
                  <div className="mt-4 w-32 h-20 bg-discord-bg-secondary border border-discord-border rounded-lg p-2">
                    <img
                      src={logoUrl}
                      alt="Logo preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-discord-text-secondary mb-2">
                  About the Brand
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-discord-bg-secondary border border-discord-border rounded-lg text-discord-text-primary focus:outline-none focus:border-discord-accent resize-none"
                  placeholder="Enter a short description about the brand"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-discord-accent text-white font-semibold rounded-lg hover:bg-opacity-80 transition-colors duration-200"
              >
                Add Brand
              </button>
            </form>
          </Card>

          {/* Brands List */}
          <Card>
            <h2 className="text-xl font-semibold text-discord-text-primary mb-4">
              Current Brands ({brands.length})
            </h2>
            {brands.length === 0 ? (
              <p className="text-discord-text-secondary">No brands added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brands.map((brand) => (
                  <div
                    key={brand.id}
                    className="bg-discord-bg-secondary border border-discord-border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      {brand.logoUrl ? (
                        <div className="w-16 h-16 bg-discord-card rounded-lg p-2 flex items-center justify-center">
                          <img
                            src={brand.logoUrl}
                            alt={brand.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-discord-card rounded-lg flex items-center justify-center">
                          <span className="text-discord-text-secondary text-xs">
                            {brand.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-discord-text-primary font-medium">
                          {brand.name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveBrand(brand.id)}
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}

