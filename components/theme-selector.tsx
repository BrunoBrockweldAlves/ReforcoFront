"use client"

import { useEffect } from "react"

import { useState } from "react"

import { Check, Palette } from "lucide-react"
import { useTheme, type Theme } from "@/context/theme-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const themes: { value: Theme; label: string; color: string }[] = [
  { value: "pink", label: "theme_pink", color: "#ec4899" },
  { value: "blue", label: "theme_blue", color: "#3b82f6" },
  { value: "green", label: "theme_green", color: "#10b981" },
  { value: "purple", label: "theme_purple", color: "#8b5cf6" },
  { value: "orange", label: "theme_orange", color: "#f97316" },
  { value: "dark", label: "theme_dark", color: "#1f2937" },
  { value: "pastel", label: "theme_pastel", color: "#f9a8d4" },
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8 px-2">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline-block">{t("theme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => setTheme(item.value)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
            <span>{t(item.label)}</span>
            {theme === item.value && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
