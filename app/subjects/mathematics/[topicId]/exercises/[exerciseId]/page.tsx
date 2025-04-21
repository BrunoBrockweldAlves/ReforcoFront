"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Home, ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/context/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useParams, useRouter, useSearchParams } from "next/navigation"
// Update the import to use the shared data file
import { grades } from "../../data"

export default function ExerciseDetailPage() {
  const { t, language } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const topicId = params.topicId as string
  const exerciseId = params.exerciseId as string
  const gradeId = searchParams.get("grade") || "grade1"

  const [selectedGrade, setSelectedGrade] = useState<any>(null)
  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [exercise, setExercise] = useState<any>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [nextExerciseId, setNextExerciseId] = useState<string | null>(null)
  const [prevExerciseId, setPrevExerciseId] = useState<string | null>(null)

  useEffect(() => {
    // Find the grade and topic data
    const grade = grades.find((g) => g.id === gradeId)
    if (grade) {
      setSelectedGrade(grade)
      const topic = grade.topics.find((t) => t.id === topicId)
      if (topic) {
        setSelectedTopic(topic)

        // Find the exercise
        const exerciseIndex = topic.exercises.findIndex((e: any) => e.id === exerciseId)
        if (exerciseIndex !== -1) {
          setExercise(topic.exercises[exerciseIndex])

          // Set next and previous exercise IDs
          if (exerciseIndex > 0) {
            setPrevExerciseId(topic.exercises[exerciseIndex - 1].id)
          } else {
            setPrevExerciseId(null)
          }

          if (exerciseIndex < topic.exercises.length - 1) {
            setNextExerciseId(topic.exercises[exerciseIndex + 1].id)
          } else {
            setNextExerciseId(null)
          }
        } else {
          // Exercise not found, redirect to exercises page
          router.push(`/subjects/mathematics/${topicId}/exercises?grade=${gradeId}`)
        }
      } else {
        // Topic not found, redirect to grade page
        router.push(`/subjects/mathematics?grade=${gradeId}`)
      }
    } else {
      // Grade not found, redirect to mathematics page
      router.push("/subjects/mathematics")
    }
  }, [gradeId, topicId, exerciseId, router])

  // Get translated exercise content
  const getExerciseContent = (exercise: any) => {
    if (!exercise) return { question: "", answers: [], explanation: "" }

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

  const exerciseContent = getExerciseContent(exercise)

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleCheckAnswer = () => {
    setShowResult(true)
  }

  const isAnswerCorrect = selectedAnswer === exercise?.correctAnswer

  if (!selectedGrade || !selectedTopic || !exercise) {
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
          <Link href="/subjects" className="hover:text-primary">
            {t("subjects")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/subjects/mathematics" className="hover:text-primary">
            {t("mathematics")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/grades/${selectedGrade.id}`} className="hover:text-primary">
            {selectedGrade.nameKey ? t(selectedGrade.nameKey) : selectedGrade.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/subjects/mathematics/${topicId}?grade=${gradeId}`} className="hover:text-primary">
            {selectedTopic.nameKey ? t(selectedTopic.nameKey) : selectedTopic.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/subjects/mathematics/${topicId}/exercises?grade=${gradeId}`} className="hover:text-primary">
            {t("exercises")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">
            {t("exercise")} {exerciseId.split("-")[1]}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter">
              {selectedTopic.nameKey ? t(selectedTopic.nameKey) : selectedTopic.name} - {t("exercise")}{" "}
              {exerciseId.split("-")[1]}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="capitalize">
                {t(`difficulty_${exercise.difficulty}`)}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {t(`category_${exercise.category}`)}
              </Badge>
            </div>
          </div>

          <Link href={`/subjects/mathematics/${topicId}/exercises?grade=${gradeId}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("back_to_exercises")}
            </Button>
          </Link>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>{exerciseContent.question}</CardTitle>
            <CardDescription>{t("choose_answer")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {exercise.image && (
              <div className="flex justify-center">
                <Image
                  src={exercise.image || "/placeholder.svg"}
                  alt="Exercise illustration"
                  width={400}
                  height={200}
                  className="rounded-md"
                />
              </div>
            )}

            <div className="grid gap-3">
              {exerciseContent.answers.map((answer: string, index: number) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`justify-start h-auto py-3 px-4 text-left ${
                    showResult && index === exercise.correctAnswer
                      ? "border-green-500 bg-green-50 hover:bg-green-50"
                      : showResult && selectedAnswer === index && index !== exercise.correctAnswer
                        ? "border-red-500 bg-red-50 hover:bg-red-50"
                        : ""
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-muted w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div>{answer}</div>
                  </div>
                </Button>
              ))}
            </div>

            {showResult && (
              <div
                className={`p-4 rounded-md ${isAnswerCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {isAnswerCorrect
                  ? t("correct")
                  : `${t("incorrect")} ${String.fromCharCode(65 + exercise.correctAnswer)}.`}
                <div className="mt-2 text-sm">{exerciseContent.explanation}</div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {prevExerciseId ? (
              <Link href={`/subjects/mathematics/${topicId}/exercises/${prevExerciseId}?grade=${gradeId}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t("previous_exercise")}
                </Button>
              </Link>
            ) : (
              <div></div>
            )}

            <div>
              {!showResult ? (
                <Button onClick={handleCheckAnswer} disabled={selectedAnswer === null}>
                  {t("check_answer")}
                </Button>
              ) : nextExerciseId ? (
                <Link href={`/subjects/mathematics/${topicId}/exercises/${nextExerciseId}?grade=${gradeId}`}>
                  <Button className="flex items-center gap-2">
                    {t("next_exercise")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link href={`/subjects/mathematics/${topicId}/exercises?grade=${gradeId}`}>
                  <Button>{t("complete_exercises")}</Button>
                </Link>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
