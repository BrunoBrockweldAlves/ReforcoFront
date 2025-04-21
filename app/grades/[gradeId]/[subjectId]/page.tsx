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

export default function GradeSubjectPage() {
  const { t } = useLanguage()
  const params = useParams()
  const gradeId = params.gradeId as string
  const subjectId = params.subjectId as string
  const [grade, setGrade] = useState<any>(null)
  const [subject, setSubject] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll just find the grade and subject in our static data
    const foundGrade = grades.find((g) => g.id === gradeId)
    if (foundGrade) {
      setGrade(foundGrade)

      // Find the subject within the grade
      const foundSubject = foundGrade.subjects.find((s: any) => s.id === subjectId)
      if (foundSubject) {
        setSubject(foundSubject)
      }
    }
  }, [gradeId, subjectId])

  if (!grade || !subject) {
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
        <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 overflow-x-auto">
          <Link href="/" className="flex items-center gap-1 hover:text-primary">
            <Home className="h-3 w-3 sm:h-4 sm:w-4" />
            {t("home")}
          </Link>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          <Link href="/grades" className="hover:text-primary">
            {t("grades")}
          </Link>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          <Link href={`/grades/${gradeId}`} className="hover:text-primary">
            {grade.nameKey ? t(grade.nameKey) : grade.name}
          </Link>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-foreground">{subject.nameKey ? t(subject.nameKey) : subject.name}</span>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter">
              {subject.nameKey ? t(subject.nameKey) : subject.name} - {grade.nameKey ? t(grade.nameKey) : grade.name}
            </h1>
            <p className="text-muted-foreground">{subject.descKey ? t(subject.descKey) : subject.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {subject.topics &&
              subject.topics.map((topic: any) => (
                <Card key={topic.id} className="overflow-hidden hover:border-primary transition-colors">
                  <div className="relative h-40 sm:h-48">
                    <Image
                      src={topic.image || "/placeholder.svg?height=200&width=400"}
                      alt={topic.nameKey ? t(topic.nameKey) : topic.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{topic.nameKey ? t(topic.nameKey) : topic.name}</CardTitle>
                    <CardDescription>{topic.descKey ? t(topic.descKey) : topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {topic.exercises ? topic.exercises.length : 0} {t("exercises")}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/subjects/${subjectId}/${topic.id}?grade=${gradeId}`} className="w-full">
                      <Button className="w-full">{t("explore")}</Button>
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

// Sample data for grades with subjects
const grades = [
  {
    id: "grade1",
    nameKey: "grade1_name",
    name: "Grade 1",
    descKey: "grade1_desc",
    subjects: [
      {
        id: "mathematics",
        nameKey: "mathematics_name",
        descKey: "mathematics_desc",
        image: "/placeholder.svg?height=200&width=400",
        topics: [
          {
            id: "counting",
            nameKey: "counting_name",
            name: "Counting and Numbers",
            descKey: "counting_desc",
            description: "Learn to count objects and recognize numbers from 1 to 20.",
            image: "/placeholder.svg?height=200&width=400",
            exercises: 5,
          },
          {
            id: "addition",
            nameKey: "addition_name",
            name: "Addition within 10",
            descKey: "addition_desc",
            description: "Learn to add numbers with sums up to 10.",
            image: "/placeholder.svg?height=200&width=400",
            exercises: 3,
          },
          {
            id: "subtraction",
            nameKey: "subtraction_name",
            name: "Subtraction within 10",
            descKey: "subtraction_desc",
            description: "Learn to subtract numbers within 10.",
            image: "/placeholder.svg?height=200&width=400",
            exercises: 3,
          },
        ],
      },
      {
        id: "english",
        nameKey: "english_name",
        descKey: "english_desc",
        image: "/placeholder.svg?height=200&width=400",
        topics: [
          {
            id: "alphabet",
            nameKey: "alphabet_name",
            name: "Alphabet",
            descKey: "alphabet_desc",
            description: "Learn the letters of the alphabet and their sounds.",
            image: "/placeholder.svg?height=200&width=400",
            exercises: 4,
          },
          {
            id: "sight-words",
            nameKey: "sight_words_name",
            name: "Sight Words",
            descKey: "sight_words_desc",
            description: "Learn common sight words for beginning readers.",
            image: "/placeholder.svg?height=200&width=400",
            exercises: 3,
          },
        ],
      },
    ],
  },
  {
    id: "grade2",
    nameKey: "grade2_name",
    name: "Grade 2",
    descKey: "grade2_desc",
    subjects: [
      {
        id: "mathematics",
        nameKey: "mathematics_name",
        descKey: "mathematics_desc",
        image: "/placeholder.svg?height=200&width=400",
        topics: [
          {
            id: "addition2",
            nameKey: "addition2_name",
            name: "Addition within 100",
            descKey: "addition2_desc",
            description: "Learn strategies for adding two-digit numbers.",
            image: "/placeholder.svg?height=200&width=400",
            exercises: 4,
          },
          {
            id: "subtraction2",
            nameKey: "subtraction2_name",
            name: "Subtraction within 100",
            descKey: "subtraction2_desc",
            description: "Learn strategies for subtracting two-digit numbers.",
            image: "/placeholder.svg?height=200&width=400",
            exercises: 4,
          },
        ],
      },
    ],
  },
]
