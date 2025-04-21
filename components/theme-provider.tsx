// Ensure theme persistence across navigation
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { useTheme } from "@/context/theme-context"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { theme } = useTheme()

  // Apply the theme from context to the document element
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme)
    }
  }, [theme])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
