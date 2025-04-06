"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, ChevronRight, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/context/language-context"

export default function SubjectsPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold">Kids Learning Hub</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              {t("home")}
            </Link>
            <Link href="/subjects" className="text-sm font-medium text-pink-500">
              {t("subjects")}
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium hover:text-primary">
              {t("how_it_works")}
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              {t("about")}
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              {t("contact")}
            </Link>
          </nav>
          <LanguageSelector />
        </div>
      </header>

      <div className="container px-4 py-6 md:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-primary">
            <Home className="h-4 w-4" />
            {t("home")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{t("subjects")}</span>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">{t("all_subjects")}</h1>
            <p className="text-muted-foreground">{t("choose_subject")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={subject.image || "/placeholder.svg?height=200&width=400"}
                    alt={t(subject.nameKey)}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{t(subject.nameKey)}</CardTitle>
                  <CardDescription>{t(subject.descKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {subject.grades} {t("grade_levels")}
                    </span>
                    <span>•</span>
                    <span>
                      {subject.topics} {t("topics")}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={subject.href} className="w-full">
                    <Button className="w-full">
                      {t("explore")} {t(subject.nameKey)}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-pink-500" />
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Kids Learning Hub. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const subjects = [
  {
    id: "mathematics",
    nameKey: "mathematics_name",
    descKey: "mathematics_desc",
    image: "/placeholder.svg?height=200&width=400",
    grades: 9,
    topics: 36,
    href: "/subjects/mathematics",
  },
  {
    id: "english",
    nameKey: "english_name",
    descKey: "english_desc",
    image: "/placeholder.svg?height=200&width=400",
    grades: 9,
    topics: 27,
    href: "/subjects/english",
  },
  {
    id: "science",
    nameKey: "science_name",
    descKey: "science_desc",
    image: "/placeholder.svg?height=200&width=400",
    grades: 9,
    topics: 30,
    href: "/subjects/science",
  },
  {
    id: "coding",
    nameKey: "coding_name",
    descKey: "coding_desc",
    image: "/placeholder.svg?height=200&width=400",
    grades: 6,
    topics: 18,
    href: "/subjects/coding",
  },
  {
    id: "art",
    nameKey: "art_name",
    descKey: "art_desc",
    image: "/placeholder.svg?height=200&width=400",
    grades: 9,
    topics: 24,
    href: "/subjects/art",
  },
  {
    id: "music",
    nameKey: "music_name",
    descKey: "music_desc",
    image: "/placeholder.svg?height=200&width=400",
    grades: 7,
    topics: 21,
    href: "/subjects/music",
  },
]

