"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Menu, User, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { t } = useLanguage()
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold">Kids Learning Hub</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <Link href="/" className={`text-sm font-medium ${isActive("/") ? "text-pink-500" : "hover:text-primary"}`}>
            {t("home")}
          </Link>
          <Link
            href="/subjects"
            className={`text-sm font-medium ${isActive("/subjects") ? "text-pink-500" : "hover:text-primary"}`}
          >
            {t("subjects")}
          </Link>
          <Link
            href="/grades"
            className={`text-sm font-medium ${isActive("/grades") ? "text-pink-500" : "hover:text-primary"}`}
          >
            {t("grades")}
          </Link>
          <Link href="/#how-it-works" className="text-sm font-medium hover:text-primary">
            {t("how_it_works")}
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            {t("about")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">{t("profile")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">{t("dashboard")}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>{t("logout")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <Link href="/login">
                <LogIn className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 py-4">
                <Link href="/" className={`text-sm font-medium ${isActive("/") ? "text-pink-500" : ""}`}>
                  {t("home")}
                </Link>
                <Link
                  href="/subjects"
                  className={`text-sm font-medium ${isActive("/subjects") ? "text-pink-500" : ""}`}
                >
                  {t("subjects")}
                </Link>
                <Link href="/grades" className={`text-sm font-medium ${isActive("/grades") ? "text-pink-500" : ""}`}>
                  {t("grades")}
                </Link>
                <Link href="/#how-it-works" className="text-sm font-medium">
                  {t("how_it_works")}
                </Link>
                <Link href="#" className="text-sm font-medium">
                  {t("about")}
                </Link>

                {user ? (
                  <>
                    <Link href="/profile" className="text-sm font-medium">
                      {t("profile")}
                    </Link>
                    <Link href="/dashboard" className="text-sm font-medium">
                      {t("dashboard")}
                    </Link>
                    <button onClick={logout} className="text-sm font-medium text-left">
                      {t("logout")}
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="text-sm font-medium">
                    {t("login")}
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

