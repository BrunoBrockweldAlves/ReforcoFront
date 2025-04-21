"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Theme = "pink" | "blue" | "green" | "purple" | "orange" | "dark" | "pastel"

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "pink",
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("pink")
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage if available
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme && isValidTheme(savedTheme)) {
      setThemeState(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    if (isValidTheme(newTheme)) {
      setThemeState(newTheme)
      localStorage.setItem("theme", newTheme)
      document.documentElement.setAttribute("data-theme", newTheme)
    }
  }

  // Only render children when mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

// Helper function to validate theme
function isValidTheme(theme: string): theme is Theme {
  return ["pink", "blue", "green", "purple", "orange", "dark", "pastel"].includes(theme)
}
