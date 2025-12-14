'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UserContextType {
  isLoggedIn: boolean
  isAdmin: boolean
  setIsLoggedIn: (value: boolean) => void
  setIsAdmin: (value: boolean) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <UserContext.Provider value={{ isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}


