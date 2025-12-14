import type { Metadata } from 'next'
import './globals.css'
import { UserProvider } from '@/contexts/UserContext'
import { BrandsProvider } from '@/contexts/BrandsContext'
import { ProjectsProvider } from '@/contexts/ProjectsContext'
import { SkillsProvider } from '@/contexts/SkillsContext'

export const metadata: Metadata = {
  title: 'APIXAT - Portfolio',
  description: 'Portfolio website of Bourfoun Amine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <BrandsProvider>
            <ProjectsProvider>
              <SkillsProvider>
                {children}
              </SkillsProvider>
            </ProjectsProvider>
          </BrandsProvider>
        </UserProvider>
      </body>
    </html>
  )
}


