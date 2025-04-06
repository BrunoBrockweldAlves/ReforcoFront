"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function GradesPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container px-4 py-6 md:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-primary">
            <Home className="h-4 w-4" />
            {t("home")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{t("grades")}</span>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">{t("all_grades")}</h1>
            <p className="text-muted-foreground">{t("choose_grade")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grades.map((grade) => (
              <Card key={grade.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={grade.image || "/placeholder.svg?height=200&width=400"}
                    alt={t(grade.nameKey)}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{t(grade.nameKey)}</CardTitle>
                  <CardDescription>{t(grade.descKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {grade.subjects} {t("subjects")}
                    </span>
                    <span>•</span>
                    <span>
                      {grade.topics} {t("topics")}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/grades/${grade.id}`} className="w-full">
                    <Button className="w-full">
                      {t("explore")} {t(grade.nameKey)}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

const grades = [
  {
    id: "grade1",
    nameKey: "grade1_name",
    descKey: "grade1_desc",
    image: "/placeholder.svg?height=200&width=400",
    subjects: 6,
    topics: 24,
  },
  {
    id: "grade2",
    nameKey: "grade2_name",
    descKey: "grade2_desc",
    image: "/placeholder.svg?height=200&width=400",
    subjects: 6,
    topics: 28,
  },
  {
    id: "grade3",
    nameKey: "grade3_name",
    descKey: "grade3_desc",
    image: "/placeholder.svg?height=200&width=400",
    subjects: 6,
    topics: 30,
  },
  {
    id: "grade4",
    nameKey: "grade4_name",
    descKey: "grade4_desc",
    image: "/placeholder.svg?height=200&width=400",
    subjects: 6,
    topics: 32,
  },
  {
    id: "grade5",
    nameKey: "grade5_name",
    descKey: "grade5_desc",
    image: "/placeholder.svg?height=200&width=400",
    subjects: 6,
    topics: 34,
  },
  {
    id: "grade6",
    nameKey: "grade6_name",
    descKey: "grade6_desc",
    image: "/placeholder.svg?height=200&width=400",
    subjects: 6,
    topics: 36,
  },
  {
    id: "grade7",
    nameKey: "grade7_name",
    descKey: "grade7_desc",
    image: "/placeholder.svg?height=200&width=400",
    subjects: 6,
    topics: 36,
  },
  {
    id: "grade8",
    nameKey: "grade8_name",
    descKey: "grade8_desc",
    image: "/placeholder.svg?height=200&width=400",
    subjects: 6,
    topics: 36,
  },
  {
    id: "grade9",
    nameKey: "grade9_name",
    descKey: "grade9_desc",
    image: "/placeholder.svg?height=200&width=400",
    subjects: 6,
    topics: 36,
  },
]

