"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Home, Search, X, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/context/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { grades } from "../data"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type Exercise = {
  id: string
  question: string
  image?: string
  answers: string[]
  correctAnswer: number
  explanation: string
  difficulty: string
  category: string
  translations?: Record<string, any>
}

export default function ExercisesPage() {
  const { t, language } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const topicId = params.topicId as string
  const gradeId = searchParams.get("grade") || "grade1"

  const [selectedGrade, setSelectedGrade] = useState<any>(null)
  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    // Find the grade and topic data
    const grade = grades.find((g) => g.id === gradeId)
    if (grade) {
      setSelectedGrade(grade)
      const topic = grade.topics.find((t) => t.id === topicId)
      if (topic) {
        setSelectedTopic(topic)
        setExercises(topic.exercises)
        setFilteredExercises(topic.exercises)
      } else {
        // Topic not found, redirect to grade page
        router.push(`/subjects/mathematics?grade=${gradeId}`)
      }
    } else {
      // Grade not found, redirect to mathematics page
      router.push("/subjects/mathematics")
    }
  }, [gradeId, topicId, router])

  // Apply filters when any filter changes
  useEffect(() => {
    if (!exercises.length) return

    let filtered = [...exercises]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((exercise) => {
        const questionText =
          language === "pt-BR" && exercise.translations?.["pt-BR"]?.question
            ? exercise.translations["pt-BR"].question.toLowerCase()
            : exercise.question.toLowerCase()

        return questionText.includes(query)
      })
    }

    // Apply difficulty filter
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter((exercise) => selectedDifficulties.includes(exercise.difficulty))
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((exercise) => selectedCategories.includes(exercise.category))
    }

    setFilteredExercises(filtered)
  }, [searchQuery, selectedDifficulties, selectedCategories, exercises, language])

  // Get unique categories and difficulties
  const categories = Array.from(new Set(exercises.map((exercise) => exercise.category)))
  const difficulties = Array.from(new Set(exercises.map((exercise) => exercise.difficulty)))

  // Toggle a filter value
  const toggleFilter = (
    value: string,
    currentSelected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (currentSelected.includes(value)) {
      setSelected(currentSelected.filter((item) => item !== value))
    } else {
      setSelected([...currentSelected, value])
    }
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedDifficulties([])
    setSelectedCategories([])
  }

  // Get translated exercise content
  const getExerciseContent = (exercise: Exercise) => {
    if (language === "pt-BR" && exercise.translations?.["pt-BR"]) {
      return {
        question: exercise.translations["pt-BR"].question || exercise.question,
        answers: exercise.translations["pt-BR"].answers || exercise.answers,
        explanation: exercise.translations["pt-BR"].explanation || exercise.explanation,
      }
    }
    return {
      question: exercise.question,
      answers: exercise.answers,
      explanation: exercise.explanation,
    }
  }

  if (!selectedGrade || !selectedTopic) {
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

      <div className="container px-0 md:px-6 py-6">
        <div className="px-4 md:px-0">
          <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 overflow-x-auto">
            <Link href="/" className="flex items-center gap-1 hover:text-primary">
              <Home className="h-3 w-3 sm:h-4 sm:w-4" />
              {t("home")}
            </Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <Link href="/subjects" className="hover:text-primary">
              {t("subjects")}
            </Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <Link href="/subjects/mathematics" className="hover:text-primary">
              {t("mathematics")}
            </Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <Link href={`/grades/${selectedGrade.id}`} className="hover:text-primary">
              {selectedGrade.nameKey ? t(selectedGrade.nameKey) : selectedGrade.name}
            </Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <Link href={`/subjects/mathematics/${topicId}?grade=${gradeId}`} className="hover:text-primary">
              {selectedTopic.nameKey ? t(selectedTopic.nameKey) : selectedTopic.name}
            </Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-foreground">{t("exercises")}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-0 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter">
              {selectedTopic.nameKey ? t(selectedTopic.nameKey) : selectedTopic.name} - {t("exercises")}
            </h1>
            <p className="text-muted-foreground">{t("practice_and_learn")}</p>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/subjects/mathematics/${topicId}?grade=${gradeId}`}>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t("back_to_topic")}
              </Button>
            </Link>
          </div>
        </div>

        <SidebarProvider>
          <div className="flex flex-col md:flex-row">
            <Sidebar className="hidden md:flex border-r h-auto" variant="sidebar" collapsible="none">
              <SidebarHeader className="px-4 py-2 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{t("filters")}</h2>
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-xs">
                    {t("reset_filters")}
                  </Button>
                </div>
              </SidebarHeader>
              <SidebarContent className="px-4 py-4">
                {/* Search */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-sm font-medium">{t("search")}</h3>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder={t("search_exercises")}
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-sm font-medium">{t("difficulty")}</h3>
                  <div className="space-y-2">
                    {difficulties.map((difficulty) => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox
                          id={`difficulty-${difficulty}`}
                          checked={selectedDifficulties.includes(difficulty)}
                          onCheckedChange={() =>
                            toggleFilter(difficulty, selectedDifficulties, setSelectedDifficulties)
                          }
                        />
                        <label
                          htmlFor={`difficulty-${difficulty}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {t(`difficulty_${difficulty}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">{t("categories")}</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {t(`category_${category}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </SidebarContent>
              <SidebarFooter className="px-4 py-2 border-t mt-auto">
                <div className="text-sm text-muted-foreground">
                  {filteredExercises.length} {t("exercises_found")}
                </div>
              </SidebarFooter>
            </Sidebar>

            {/* Mobile Filters */}
            <div className="md:hidden mb-6 px-4">
              <div className="flex flex-wrap gap-2">
                {selectedDifficulties.map((difficulty) => (
                  <Badge key={difficulty} variant="secondary" className="flex items-center gap-1">
                    {t(`difficulty_${difficulty}`)}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => setSelectedDifficulties(selectedDifficulties.filter((d) => d !== difficulty))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}

                {selectedCategories.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {t(`category_${category}`)}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}

                {(selectedDifficulties.length > 0 || selectedCategories.length > 0) && (
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
                    {t("clear_all")}
                  </Button>
                )}
              </div>
            </div>

            <div className="flex-1 px-4 md:px-6">
              {/* Exercise Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {filteredExercises.map((exercise) => {
                  const exerciseContent = getExerciseContent(exercise)

                  return (
                    <Card key={exercise.id} className="overflow-hidden hover:border-primary transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base sm:text-lg">{exerciseContent.question}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="capitalize">
                            {t(`difficulty_${exercise.difficulty}`)}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {t(`category_${exercise.category}`)}
                          </Badge>
                        </div>

                        {exercise.image && (
                          <div className="mb-3">
                            <Image
                              src={exercise.image || "/placeholder.svg"}
                              alt="Exercise illustration"
                              width={300}
                              height={150}
                              className="rounded-md w-full object-cover"
                            />
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Link
                          href={`/subjects/mathematics/${topicId}/exercises/${exercise.id}?grade=${gradeId}`}
                          className="w-full"
                        >
                          <Button className="w-full">{t("start_exercise")}</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>

              {filteredExercises.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{t("no_exercises_found")}</h3>
                  <p className="text-muted-foreground mb-4">{t("try_adjusting_filters")}</p>
                  <Button variant="outline" onClick={resetFilters}>
                    {t("reset_filters")}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Add the SidebarTrigger inside the SidebarProvider */}
          <div className="md:hidden fixed bottom-4 right-4 z-50">
            <SidebarTrigger className="bg-primary text-primary-foreground shadow-lg" />
          </div>
        </SidebarProvider>
      </div>

      <Footer />
    </div>
  )
}
