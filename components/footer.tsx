"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-pink-500" />
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Kids Learning Hub. {t("all_rights_reserved")}
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-gray-500 hover:text-primary">
            {t("terms")}
          </Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-primary">
            {t("privacy")}
          </Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-primary">
            {t("contact")}
          </Link>
        </div>
      </div>
    </footer>
  )
}

