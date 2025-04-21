"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Home } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function GradeSubjectsPage() {
  const { t } = useLanguage()
  const params = useParams()
  const gradeId = params.gradeId as string
  const [grade, setGrade] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll just find the grade in our static data
    const foundGrade = grades.find((g) => g.id === gradeId)
    if (foundGrade) {
      setGrade(foundGrade)
    }
  }, [gradeId])

  if (!grade) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex items-center justify-center flex-1">
          <p>{t("loading")}</p>
        </div>
        <Footer />
      </div>
    )
  }

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
          <Link href="/grades" className="hover:text-primary">
            {t("grades")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{t(grade.nameKey)}</span>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">{t(grade.nameKey)}</h1>
            <p className="text-muted-foreground">{t(grade.descKey)}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grade.subjects.map((subject: any) => (
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
                      {subject.topics} {t("topics")}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/grades/${gradeId}/${subject.id}`} className="w-full">
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

      <Footer />
    </div>
  )
}

const grades = [
  {
    id: "grade1",
    nameKey: "grade1_name",
    descKey: "grade1_desc",
    subjects: [
      {
        id: "mathematics",
        nameKey: "mathematics_name",
        descKey: "mathematics_desc",
        image: "/placeholder.svg?height=200&width=400",
        topics: 8,
      },
      {
        id: "english",
        nameKey: "english_name",
        descKey: "english_desc",
        image: "/placeholder.svg?height=200&width=400",
        topics: 6,
      },
      {
        id: "science",
        nameKey: "science_name",
        descKey: "science_desc",
        image: "/placeholder.svg?height=200&width=400",
        topics: 5,
      },
      {
        id: "art",
        nameKey: "art_name",
        descKey: "art_desc",
        image: "/placeholder.svg?height=200&width=400",
        topics: 4,
      },
    ],
  },
  {
    id: "grade2",
    nameKey: "grade2_name",
    descKey: "grade2_desc",
    subjects: [
      {
        id: "mathematics",
        nameKey: "mathematics_name",
        descKey: "mathematics_desc",
        image: "/placeholder.svg?height=200&width=400",
        topics: 8,
      },
      {
        id: "english",
        nameKey: "english_name",
        descKey: "english_desc",
        image: "/placeholder.svg?height=200&width=400",
        topics: 6,
      },
      {
        id: "science",
        nameKey: "science_name",
        descKey: "science_desc",
        image: "/placeholder.svg?height=200&width=400",
        topics: 5,
      },
    ],
  },
  // Other grades would be defined similarly
]
