"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ChevronRight, Home, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/context/language-context"

export default function MathematicsPage() {
  const { t } = useLanguage()
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  // Reset topic when grade changes
  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade)
    setSelectedTopic(null)
  }

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
            <Link href="/subjects" className="text-sm font-medium hover:text-primary">
              {t("subjects")}
            </Link>
            <Link href="#" className="text-sm font-medium text-pink-500">
              {t("mathematics")}
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium hover:text-primary">
              {t("how_it_works")}
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              {t("about")}
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
          <Link href="/subjects" className="hover:text-primary">
            {t("subjects")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{t("mathematics")}</span>
        </div>

        <div className="grid gap-6">
          {!selectedGrade ? (
            <GradeSelection onSelectGrade={handleGradeSelect} />
          ) : !selectedTopic ? (
            <TopicSelection
              grade={selectedGrade}
              onBack={() => setSelectedGrade(null)}
              onSelectTopic={setSelectedTopic}
            />
          ) : (
            <ExercisePage grade={selectedGrade} topic={selectedTopic} onBack={() => setSelectedTopic(null)} />
          )}
        </div>
      </div>

      <footer className="w-full border-t py-6 md:py-0 mt-auto">
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

function GradeSelection({ onSelectGrade }: { onSelectGrade: (grade: string) => void }) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">{t("mathematics")}</h1>
        <p className="text-muted-foreground">{t("select_grade")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grades.map((grade) => (
          <Card
            key={grade.id}
            className="cursor-pointer hover:border-pink-300 transition-colors"
            onClick={() => onSelectGrade(grade.id)}
          >
            <CardHeader className="pb-2">
              <div className="w-full h-40 relative rounded-md overflow-hidden">
                <Image
                  src={grade.image || "/placeholder.svg?height=160&width=320"}
                  alt={grade.nameKey ? t(grade.nameKey) : grade.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>{grade.nameKey ? t(grade.nameKey) : grade.name}</CardTitle>
              <CardDescription className="mt-2">{grade.descKey ? t(grade.descKey) : grade.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">{t(grade.difficulty)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">
                  {grade.topics.length} {t("topics")}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TopicSelection({
  grade,
  onBack,
  onSelectTopic,
}: {
  grade: string
  onBack: () => void
  onSelectTopic: (topic: string) => void
}) {
  const { t } = useLanguage()
  const selectedGrade = grades.find((g) => g.id === grade)

  if (!selectedGrade) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tighter">
            {selectedGrade.nameKey ? t(selectedGrade.nameKey) : selectedGrade.name}
          </h1>
          <p className="text-muted-foreground">{t("select_topic")}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          {t("back_to_grades")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedGrade.topics.map((topic) => (
          <Card
            key={topic.id}
            className="cursor-pointer hover:border-pink-300 transition-colors"
            onClick={() => onSelectTopic(topic.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {topic.icon}
                {topic.nameKey ? t(topic.nameKey) : topic.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{topic.descKey ? t(topic.descKey) : topic.description}</CardDescription>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t("progress")}</span>
                  <span className="text-pink-500">{topic.progress}%</span>
                </div>
                <Progress value={topic.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {topic.exercises.length} {t("exercises")}
                </span>
                <Button variant="ghost" size="sm" className="gap-1">
                  {t("continue")} <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ExercisePage({
  grade,
  topic,
  onBack,
}: {
  grade: string
  topic: string
  onBack: () => void
}) {
  const { t, language } = useLanguage()
  const selectedGrade = grades.find((g) => g.id === grade)
  const selectedTopic = selectedGrade?.topics.find((t) => t.id === topic)

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  if (!selectedGrade || !selectedTopic) return null

  const currentExercise = selectedTopic.exercises[currentExerciseIndex]
  const progress = ((currentExerciseIndex + 1) / selectedTopic.exercises.length) * 100

  // Get the translated exercise content
  const getExerciseContent = (exercise: any) => {
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

  const exerciseContent = getExerciseContent(currentExercise)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentExerciseIndex]: answerIndex,
    })
  }

  const handleNext = () => {
    if (currentExerciseIndex < selectedTopic.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setShowResults(false)
    } else {
      // All exercises completed
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
      setShowResults(false)
    }
  }

  const handleCheckAnswer = () => {
    setShowResults(true)
  }

  const isAnswerCorrect = selectedAnswers[currentExerciseIndex] === currentExercise.correctAnswer

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tighter">
            {selectedTopic.nameKey ? t(selectedTopic.nameKey) : selectedTopic.name}
          </h1>
          <p className="text-muted-foreground">
            {selectedGrade.nameKey ? t(selectedGrade.nameKey) : selectedGrade.name}
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          {t("back_to_topics")}
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            {t("exercise")} {currentExerciseIndex + 1} {t("of")} {selectedTopic.exercises.length}
          </span>
          <span className="text-pink-500">
            {Math.round(progress)}% {t("complete")}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>
            {t("exercise")} {currentExerciseIndex + 1}
          </CardTitle>
          <CardDescription>{t("choose_answer")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg font-medium">{exerciseContent.question}</div>

          {currentExercise.image && (
            <div className="flex justify-center">
              <Image
                src={currentExercise.image || "/placeholder.svg"}
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
                variant={selectedAnswers[currentExerciseIndex] === index ? "default" : "outline"}
                className={`justify-start h-auto py-3 px-4 text-left ${
                  showResults && index === currentExercise.correctAnswer
                    ? "border-green-500 bg-green-50 hover:bg-green-50"
                    : showResults &&
                        selectedAnswers[currentExerciseIndex] === index &&
                        index !== currentExercise.correctAnswer
                      ? "border-red-500 bg-red-50 hover:bg-red-50"
                      : ""
                }`}
                onClick={() => !showResults && handleAnswerSelect(index)}
                disabled={showResults}
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

          {showResults && (
            <div
              className={`p-4 rounded-md ${isAnswerCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
            >
              {isAnswerCorrect
                ? t("correct")
                : `${t("incorrect")} ${String.fromCharCode(65 + currentExercise.correctAnswer)}.`}
              <div className="mt-2 text-sm">{exerciseContent.explanation}</div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentExerciseIndex === 0}>
            {t("previous")}
          </Button>

          <div>
            {!showResults ? (
              <Button onClick={handleCheckAnswer} disabled={selectedAnswers[currentExerciseIndex] === undefined}>
                {t("check_answer")}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={currentExerciseIndex === selectedTopic.exercises.length - 1 && showResults}
              >
                {currentExerciseIndex < selectedTopic.exercises.length - 1 ? t("next_question") : t("complete_btn")}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      {showResults && currentExerciseIndex === selectedTopic.exercises.length - 1 && (
        <Card className="border-2 border-pink-200 bg-pink-50">
          <CardHeader>
            <CardTitle>{t("topic_completed")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("completed_message")}</p>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t("your_score")}</span>
                <span className="text-pink-500">
                  {
                    Object.entries(selectedAnswers).filter(
                      ([index, answer]) => answer === selectedTopic.exercises[Number(index)].correctAnswer,
                    ).length
                  }{" "}
                  / {selectedTopic.exercises.length}
                </span>
              </div>
              <Progress
                value={
                  (Object.entries(selectedAnswers).filter(
                    ([index, answer]) => answer === selectedTopic.exercises[Number(index)].correctAnswer,
                  ).length /
                    selectedTopic.exercises.length) *
                  100
                }
                className="h-2"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={onBack}>
              {t("return_to_topics")}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

// Extended grades data with translations
const grades = [
  {
    id: "grade1",
    nameKey: "grade1_name",
    name: "Grade 1 Mathematics",
    descKey: "grade1_desc",
    description: "Basic number sense, counting, addition and subtraction within 20.",
    difficulty: "beginner",
    image: "/placeholder.svg?height=160&width=320",
    topics: [
      {
        id: "counting",
        nameKey: "counting_name",
        name: "Counting and Numbers",
        descKey: "counting_desc",
        description: "Learn to count objects and recognize numbers from 1 to 20.",
        icon: "🔢",
        progress: 75,
        exercises: [
          {
            question: "Count the apples. How many are there?",
            image: "/placeholder.svg?height=200&width=400",
            answers: ["5", "6", "7", "8"],
            correctAnswer: 2,
            explanation: "There are 7 apples in the image. You can count them one by one.",
            translations: {
              "pt-BR": {
                question: "Conte as maçãs. Quantas existem?",
                answers: ["5", "6", "7", "8"],
                explanation: "Existem 7 maçãs na imagem. Você pode contá-las uma a uma.",
              },
            },
          },
          {
            question: "What number comes after 9?",
            answers: ["8", "10", "11", "7"],
            correctAnswer: 1,
            explanation: "In the number sequence, 10 comes right after 9.",
            translations: {
              "pt-BR": {
                question: "Qual número vem depois do 9?",
                answers: ["8", "10", "11", "7"],
                explanation: "Na sequência numérica, o 10 vem logo após o 9.",
              },
            },
          },
          {
            question: "Count by 2s: 2, 4, 6, __, 10",
            answers: ["7", "8", "9", "12"],
            correctAnswer: 1,
            explanation: "When counting by 2s, we add 2 each time. After 6, we add 2 to get 8.",
            translations: {
              "pt-BR": {
                question: "Conte de 2 em 2: 2, 4, 6, __, 10",
                answers: ["7", "8", "9", "12"],
                explanation:
                  "Quando contamos de 2 em 2, adicionamos 2 cada vez. Depois do 6, adicionamos 2 para obter 8.",
              },
            },
          },
        ],
      },
      {
        id: "addition",
        nameKey: "addition_name",
        name: "Addition within 10",
        descKey: "addition_desc",
        description: "Learn to add numbers with sums up to 10.",
        icon: "➕",
        progress: 30,
        exercises: [
          {
            question: "What is 3 + 4?",
            answers: ["6", "7", "8", "5"],
            correctAnswer: 1,
            explanation: "To find 3 + 4, you can count 3 objects and then 4 more, giving you 7 total.",
            translations: {
              "pt-BR": {
                question: "Quanto é 3 + 4?",
                answers: ["6", "7", "8", "5"],
                explanation: "Para encontrar 3 + 4, você pode contar 3 objetos e depois mais 4, dando um total de 7.",
              },
            },
          },
          {
            question: "What is 2 + 5?",
            answers: ["5", "6", "7", "8"],
            correctAnswer: 2,
            explanation: "2 + 5 = 7. You can count up from 2: 3, 4, 5, 6, 7.",
            translations: {
              "pt-BR": {
                question: "Quanto é 2 + 5?",
                answers: ["5", "6", "7", "8"],
                explanation: "2 + 5 = 7. Você pode contar a partir de 2: 3, 4, 5, 6, 7.",
              },
            },
          },
          {
            question: "If you have 4 apples and get 3 more, how many do you have now?",
            image: "/placeholder.svg?height=200&width=400",
            answers: ["6", "7", "8", "5"],
            correctAnswer: 1,
            explanation: "You start with 4 apples and get 3 more, so 4 + 3 = 7 apples total.",
            translations: {
              "pt-BR": {
                question: "Se você tem 4 maçãs e ganha mais 3, quantas você tem agora?",
                answers: ["6", "7", "8", "5"],
                explanation: "Você começa com 4 maçãs e ganha mais 3, então 4 + 3 = 7 maçãs no total.",
              },
            },
          },
        ],
      },
      {
        id: "subtraction",
        nameKey: "subtraction_name",
        name: "Subtraction within 10",
        descKey: "subtraction_desc",
        description: "Learn to subtract numbers within 10.",
        icon: "➖",
        progress: 0,
        exercises: [
          {
            question: "What is 7 - 3?",
            answers: ["3", "4", "5", "2"],
            correctAnswer: 1,
            explanation: "To find 7 - 3, you start with 7 and take away 3, leaving you with 4.",
            translations: {
              "pt-BR": {
                question: "Quanto é 7 - 3?",
                answers: ["3", "4", "5", "2"],
                explanation: "Para encontrar 7 - 3, você começa com 7 e retira 3, ficando com 4.",
              },
            },
          },
          {
            question: "If you have 8 candies and eat 5, how many do you have left?",
            image: "/placeholder.svg?height=200&width=400",
            answers: ["2", "3", "4", "5"],
            correctAnswer: 1,
            explanation: "You start with 8 candies and eat 5, so 8 - 5 = 3 candies left.",
            translations: {
              "pt-BR": {
                question: "Se você tem 8 doces e come 5, quantos sobram?",
                answers: ["2", "3", "4", "5"],
                explanation: "Você começa com 8 doces e come 5, então 8 - 5 = 3 doces restantes.",
              },
            },
          },
          {
            question: "What is 6 - 2?",
            answers: ["2", "3", "4", "5"],
            correctAnswer: 2,
            explanation: "6 - 2 = 4. You can count down from 6: 5, 4.",
            translations: {
              "pt-BR": {
                question: "Quanto é 6 - 2?",
                answers: ["2", "3", "4", "5"],
                explanation: "6 - 2 = 4. Você pode contar regressivamente a partir de 6: 5, 4.",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "grade2",
    nameKey: "grade2_name",
    name: "Grade 2 Mathematics",
    descKey: "grade2_desc",
    description: "Addition and subtraction within 100, introduction to multiplication.",
    difficulty: "beginner",
    image: "/placeholder.svg?height=160&width=320",
    topics: [
      {
        id: "addition2",
        nameKey: "addition2_name",
        name: "Addition within 100",
        descKey: "addition2_desc",
        description: "Learn strategies for adding two-digit numbers.",
        icon: "➕",
        progress: 50,
        exercises: [
          {
            question: "What is 25 + 13?",
            answers: ["38", "37", "28", "35"],
            correctAnswer: 0,
            explanation:
              "To add 25 + 13, you can add the tens (20 + 10 = 30) and then the ones (5 + 3 = 8), giving you 38.",
            translations: {
              "pt-BR": {
                question: "Quanto é 25 + 13?",
                answers: ["38", "37", "28", "35"],
                explanation:
                  "Para somar 25 + 13, você pode somar as dezenas (20 + 10 = 30) e depois as unidades (5 + 3 = 8), resultando em 38.",
              },
            },
          },
          {
            question: "What is 46 + 32?",
            answers: ["68", "78", "76", "86"],
            correctAnswer: 1,
            explanation: "46 + 32 = 78. Add the tens: 40 + 30 = 70. Add the ones: 6 + 2 = 8. So 70 + 8 = 78.",
            translations: {
              "pt-BR": {
                question: "Quanto é 46 + 32?",
                answers: ["68", "78", "76", "86"],
                explanation:
                  "46 + 32 = 78. Some as dezenas: 40 + 30 = 70. Some as unidades: 6 + 2 = 8. Então 70 + 8 = 78.",
              },
            },
          },
        ],
      },
      {
        id: "subtraction2",
        nameKey: "subtraction2_name",
        name: "Subtraction within 100",
        descKey: "subtraction2_desc",
        description: "Learn strategies for subtracting two-digit numbers.",
        icon: "➖",
        progress: 25,
        exercises: [
          {
            question: "What is 57 - 24?",
            answers: ["33", "23", "43", "13"],
            correctAnswer: 0,
            explanation:
              "To subtract 57 - 24, you can subtract the tens (50 - 20 = 30) and then the ones (7 - 4 = 3), giving you 33.",
            translations: {
              "pt-BR": {
                question: "Quanto é 57 - 24?",
                answers: ["33", "23", "43", "13"],
                explanation:
                  "Para subtrair 57 - 24, você pode subtrair as dezenas (50 - 20 = 30) e depois as unidades (7 - 4 = 3), resultando em 33.",
              },
            },
          },
        ],
      },
      {
        id: "intro-multiplication",
        nameKey: "intro_multiplication_name",
        name: "Introduction to Multiplication",
        descKey: "intro_multiplication_desc",
        description: "Learn the concept of multiplication as repeated addition.",
        icon: "✖️",
        progress: 0,
        exercises: [
          {
            question: "What is 3 × 4?",
            image: "/placeholder.svg?height=200&width=400",
            answers: ["7", "10", "12", "15"],
            correctAnswer: 2,
            explanation: "3 × 4 means 3 groups of 4, which is 4 + 4 + 4 = 12.",
            translations: {
              "pt-BR": {
                question: "Quanto é 3 × 4?",
                answers: ["7", "10", "12", "15"],
                explanation: "3 × 4 significa 3 grupos de 4, que é 4 + 4 + 4 = 12.",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "grade3",
    nameKey: "grade3_name",
    name: "Grade 3 Mathematics",
    descKey: "grade3_desc",
    description: "Multiplication and division, fractions, and measurement.",
    difficulty: "intermediate",
    image: "/placeholder.svg?height=160&width=320",
    topics: [
      {
        id: "multiplication",
        nameKey: "multiplication_name",
        name: "Multiplication Facts",
        descKey: "multiplication_desc",
        description: "Learn multiplication facts up to 10 × 10.",
        icon: "✖️",
        progress: 10,
        exercises: [
          {
            question: "What is 7 × 8?",
            answers: ["54", "56", "48", "64"],
            correctAnswer: 1,
            explanation: "7 × 8 = 56. You can think of it as 7 groups of 8 or 8 groups of 7.",
            translations: {
              "pt-BR": {
                question: "Quanto é 7 × 8?",
                answers: ["54", "56", "48", "64"],
                explanation: "7 × 8 = 56. Você pode pensar nisso como 7 grupos de 8 ou 8 grupos de 7.",
              },
            },
          },
        ],
      },
      {
        id: "division",
        nameKey: "division_name",
        name: "Division Basics",
        descKey: "division_desc",
        description: "Learn the concept of division and basic division facts.",
        icon: "➗",
        progress: 0,
        exercises: [
          {
            question: "What is 24 ÷ 6?",
            answers: ["3", "4", "5", "6"],
            correctAnswer: 1,
            explanation: "24 ÷ 6 = 4. This means that 24 can be divided into 6 equal groups with 4 in each group.",
            translations: {
              "pt-BR": {
                question: "Quanto é 24 ÷ 6?",
                answers: ["3", "4", "5", "6"],
                explanation:
                  "24 ÷ 6 = 4. Isso significa que 24 pode ser dividido em 6 grupos iguais com 4 em cada grupo.",
              },
            },
          },
        ],
      },
      {
        id: "fractions",
        nameKey: "fractions_name",
        name: "Introduction to Fractions",
        descKey: "fractions_desc",
        description: "Learn about fractions as parts of a whole.",
        icon: "🍕",
        progress: 0,
        exercises: [
          {
            question: "What fraction of the circle is shaded?",
            image: "/placeholder.svg?height=200&width=400",
            answers: ["1/2", "1/3", "1/4", "3/4"],
            correctAnswer: 3,
            explanation:
              "The circle is divided into 4 equal parts, and 3 of those parts are shaded. So 3/4 of the circle is shaded.",
            translations: {
              "pt-BR": {
                question: "Que fração do círculo está sombreada?",
                answers: ["1/2", "1/3", "1/4", "3/4"],
                explanation:
                  "O círculo está dividido em 4 partes iguais, e 3 dessas partes estão sombreadas. Então 3/4 do círculo está sombreado.",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "grade4",
    nameKey: "grade4_name",
    name: "Grade 4 Mathematics",
    descKey: "grade4_desc",
    description: "Multi-digit multiplication and division, fraction operations.",
    difficulty: "intermediate",
    image: "/placeholder.svg?height=160&width=320",
    topics: [
      {
        id: "multi-digit-multiplication",
        nameKey: "multi_digit_multiplication_name",
        name: "Multi-digit Multiplication",
        descKey: "multi_digit_multiplication_desc",
        description: "Learn to multiply multi-digit numbers.",
        icon: "✖️",
        progress: 0,
        exercises: [
          {
            question: "What is 24 × 3?",
            answers: ["62", "72", "82", "92"],
            correctAnswer: 1,
            explanation: "To multiply 24 × 3, you can multiply 20 × 3 = 60 and 4 × 3 = 12, then add: 60 + 12 = 72.",
            translations: {
              "pt-BR": {
                question: "Quanto é 24 × 3?",
                answers: ["62", "72", "82", "92"],
                explanation:
                  "Para multiplicar 24 × 3, você pode multiplicar 20 × 3 = 60 e 4 × 3 = 12, depois somar: 60 + 12 = 72.",
              },
            },
          },
        ],
      },
      {
        id: "fraction-operations",
        nameKey: "fraction_operations_name",
        name: "Fraction Operations",
        descKey: "fraction_operations_desc",
        description: "Learn to add and subtract fractions with like denominators.",
        icon: "🍕",
        progress: 0,
        exercises: [
          {
            question: "What is 1/4 + 2/4?",
            answers: ["1/2", "3/4", "3/8", "1/8"],
            correctAnswer: 1,
            explanation:
              "To add fractions with the same denominator, add the numerators: 1 + 2 = 3, and keep the denominator: 3/4.",
            translations: {
              "pt-BR": {
                question: "Quanto é 1/4 + 2/4?",
                answers: ["1/2", "3/4", "3/8", "1/8"],
                explanation:
                  "Para somar frações com o mesmo denominador, some os numeradores: 1 + 2 = 3, e mantenha o denominador: 3/4.",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "grade5",
    nameKey: "grade5_name",
    name: "Grade 5 Mathematics",
    descKey: "grade5_desc",
    description: "Decimals, advanced fractions, and introduction to geometry.",
    difficulty: "intermediate",
    image: "/placeholder.svg?height=160&width=320",
    topics: [
      {
        id: "decimals",
        nameKey: "decimals_name",
        name: "Decimals",
        descKey: "decimals_desc",
        description: "Learn about decimal numbers and operations.",
        icon: "🔢",
        progress: 0,
        exercises: [
          {
            question: "What is 0.7 + 0.8?",
            answers: ["0.15", "1.5", "1.15", "1.5"],
            correctAnswer: 2,
            explanation: "0.7 + 0.8 = 1.5. You can add the tenths: 7 tenths + 8 tenths = 15 tenths = 1.5.",
            translations: {
              "pt-BR": {
                question: "Quanto é 0,7 + 0,8?",
                answers: ["0,15", "1,5", "1,15", "1,5"],
                explanation: "0,7 + 0,8 = 1,5. Você pode somar os décimos: 7 décimos + 8 décimos = 15 décimos = 1,5.",
              },
            },
          },
        ],
      },
      {
        id: "geometry",
        nameKey: "geometry_name",
        name: "Introduction to Geometry",
        descKey: "geometry_desc",
        description: "Learn about basic geometric shapes and their properties.",
        icon: "📐",
        progress: 0,
        exercises: [
          {
            question: "How many sides does a pentagon have?",
            answers: ["3", "4", "5", "6"],
            correctAnswer: 2,
            explanation: "A pentagon has 5 sides. The prefix 'penta' means five.",
            translations: {
              "pt-BR": {
                question: "Quantos lados tem um pentágono?",
                answers: ["3", "4", "5", "6"],
                explanation: "Um pentágono tem 5 lados. O prefixo 'penta' significa cinco.",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "grade6",
    nameKey: "grade6_name",
    name: "Grade 6 Mathematics",
    descKey: "grade6_desc",
    description: "Ratios, proportions, and introduction to algebra.",
    difficulty: "advanced",
    image: "/placeholder.svg?height=160&width=320",
    topics: [
      {
        id: "ratios",
        nameKey: "ratios_name",
        name: "Ratios and Proportions",
        descKey: "ratios_desc",
        description: "Learn about ratios and proportional relationships.",
        icon: "⚖️",
        progress: 0,
        exercises: [
          {
            question:
              "If the ratio of red to blue marbles is 3:5, and there are 24 blue marbles, how many red marbles are there?",
            answers: ["10", "12", "14", "16"],
            correctAnswer: 1,
            explanation:
              "If the ratio is 3:5 and there are 24 blue marbles, then 5 parts = 24, so 1 part = 24 ÷ 5 = 4.8. Therefore, 3 parts = 3 × 4.8 = 14.4, which rounds to 14 red marbles.",
            translations: {
              "pt-BR": {
                question:
                  "Se a proporção de bolinhas vermelhas para azuis é 3:5, e há 24 bolinhas azuis, quantas bolinhas vermelhas existem?",
                answers: ["10", "12", "14", "16"],
                explanation:
                  "Se a proporção é 3:5 e há 24 bolinhas azuis, então 5 partes = 24, então 1 parte = 24 ÷ 5 = 4,8. Portanto, 3 partes = 3 × 4,8 = 14,4, que arredonda para 14 bolinhas vermelhas.",
              },
            },
          },
        ],
      },
      {
        id: "intro-algebra",
        nameKey: "intro_algebra_name",
        name: "Introduction to Algebra",
        descKey: "intro_algebra_desc",
        description: "Learn about variables and simple equations.",
        icon: "🧮",
        progress: 0,
        exercises: [
          {
            question: "Solve for x: x + 7 = 12",
            answers: ["4", "5", "6", "7"],
            correctAnswer: 1,
            explanation: "To solve for x, subtract 7 from both sides: x + 7 - 7 = 12 - 7, which gives x = 5.",
            translations: {
              "pt-BR": {
                question: "Resolva para x: x + 7 = 12",
                answers: ["4", "5", "6", "7"],
                explanation: "Para resolver para x, subtraia 7 de ambos os lados: x + 7 - 7 = 12 - 7, o que dá x = 5.",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "grade7",
    nameKey: "grade7_name",
    name: "Grade 7 Mathematics",
    descKey: "grade7_desc",
    description: "Algebraic expressions, equations, and proportional relationships.",
    difficulty: "advanced",
    image: "/placeholder.svg?height=160&width=320",
    topics: [
      {
        id: "algebraic-expressions",
        nameKey: "algebraic_expressions_name",
        name: "Algebraic Expressions",
        descKey: "algebraic_expressions_desc",
        description: "Learn to write and evaluate algebraic expressions.",
        icon: "🧮",
        progress: 0,
        exercises: [
          {
            question: "Evaluate 3x + 2 when x = 4",
            answers: ["10", "12", "14", "16"],
            correctAnswer: 2,
            explanation: "Substitute x = 4 into the expression: 3(4) + 2 = 12 + 2 = 14.",
            translations: {
              "pt-BR": {
                question: "Calcule 3x + 2 quando x = 4",
                answers: ["10", "12", "14", "16"],
                explanation: "Substitua x = 4 na expressão: 3(4) + 2 = 12 + 2 = 14.",
              },
            },
          },
        ],
      },
      {
        id: "linear-equations",
        nameKey: "linear_equations_name",
        name: "Linear Equations",
        descKey: "linear_equations_desc",
        description: "Learn to solve linear equations in one variable.",
        icon: "📊",
        progress: 0,
        exercises: [
          {
            question: "Solve for x: 2x - 3 = 9",
            answers: ["5", "6", "7", "8"],
            correctAnswer: 1,
            explanation: "Add 3 to both sides: 2x - 3 + 3 = 9 + 3, so 2x = 12. Divide both sides by 2: x = 6.",
            translations: {
              "pt-BR": {
                question: "Resolva para x: 2x - 3 = 9",
                answers: ["5", "6", "7", "8"],
                explanation:
                  "Adicione 3 a ambos os lados: 2x - 3 + 3 = 9 + 3, então 2x = 12. Divida ambos os lados por 2: x = 6.",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "grade8",
    nameKey: "grade8_name",
    name: "Grade 8 Mathematics",
    descKey: "grade8_desc",
    description: "Linear functions, Pythagorean theorem, and volume.",
    difficulty: "advanced",
    image: "/placeholder.svg?height=160&width=320",
    topics: [
      {
        id: "linear-functions",
        nameKey: "linear_functions_name",
        name: "Linear Functions",
        descKey: "linear_functions_desc",
        description: "Learn about linear functions and their graphs.",
        icon: "📈",
        progress: 0,
        exercises: [
          {
            question: "What is the slope of the line y = 2x + 3?",
            answers: ["1", "2", "3", "4"],
            correctAnswer: 1,
            explanation: "In the equation y = mx + b, m is the slope. In y = 2x + 3, the slope is 2.",
            translations: {
              "pt-BR": {
                question: "Qual é a inclinação da reta y = 2x + 3?",
                answers: ["1", "2", "3", "4"],
                explanation: "Na equação y = mx + b, m é a inclinação. Em y = 2x + 3, a inclinação é 2.",
              },
            },
          },
        ],
      },
      {
        id: "pythagorean-theorem",
        nameKey: "pythagorean_theorem_name",
        name: "Pythagorean Theorem",
        descKey: "pythagorean_theorem_desc",
        description: "Learn about the relationship between the sides of a right triangle.",
        icon: "📐",
        progress: 0,
        exercises: [
          {
            question: "In a right triangle, if the legs are 3 and 4 units long, how long is the hypotenuse?",
            answers: ["5 units", "6 units", "7 units", "8 units"],
            correctAnswer: 0,
            explanation:
              "By the Pythagorean theorem, a² + b² = c², where c is the hypotenuse. So 3² + 4² = c², 9 + 16 = c², 25 = c², c = 5 units.",
            translations: {
              "pt-BR": {
                question:
                  "Em um triângulo retângulo, se os catetos têm 3 e 4 unidades de comprimento, qual é o comprimento da hipotenusa?",
                answers: ["5 unidades", "6 unidades", "7 unidades", "8 unidades"],
                explanation:
                  "Pelo teorema de Pitágoras, a² + b² = c², onde c é a hipotenusa. Então 3² + 4² = c², 9 + 16 = c², 25 = c², c = 5 unidades.",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: "grade9",
    nameKey: "grade9_name",
    name: "Grade 9 Mathematics",
    descKey: "grade9_desc",
    description: "Quadratic equations, systems of equations, and functions.",
    difficulty: "advanced",
    image: "/placeholder.svg?height=160&width=320",
    topics: [
      {
        id: "quadratic-equations",
        nameKey: "quadratic_equations_name",
        name: "Quadratic Equations",
        descKey: "quadratic_equations_desc",
        description: "Learn to solve quadratic equations using various methods.",
        icon: "📊",
        progress: 0,
        exercises: [
          {
            question: "Solve for x: x² - 5x + 6 = 0",
            answers: ["x = 2 and x = 3", "x = 1 and x = 4", "x = 2 and x = 4", "x = 1 and x = 6"],
            correctAnswer: 0,
            explanation:
              "To solve x² - 5x + 6 = 0, factor it as (x - 2)(x - 3) = 0. So x - 2 = 0 or x - 3 = 0, which gives x = 2 or x = 3.",
            translations: {
              "pt-BR": {
                question: "Resolva para x: x² - 5x + 6 = 0",
                answers: ["x = 2 e x = 3", "x = 1 e x = 4", "x = 2 e x = 4", "x = 1 e x = 6"],
                explanation:
                  "Para resolver x² - 5x + 6 = 0, fatore como (x - 2)(x - 3) = 0. Então x - 2 = 0 ou x - 3 = 0, o que dá x = 2 ou x = 3.",
              },
            },
          },
        ],
      },
      {
        id: "systems-of-equations",
        nameKey: "systems_of_equations_name",
        name: "Systems of Equations",
        descKey: "systems_of_equations_desc",
        description: "Learn to solve systems of linear equations.",
        icon: "🧮",
        progress: 0,
        exercises: [
          {
            question: "Solve the system: x + y = 5, x - y = 1",
            answers: ["x = 2, y = 3", "x = 3, y = 2", "x = 4, y = 1", "x = 1, y = 4"],
            correctAnswer: 1,
            explanation:
              "From x - y = 1, we get x = y + 1. Substitute this into x + y = 5: (y + 1) + y = 5, 2y + 1 = 5, 2y = 4, y = 2. Then x = y + 1 = 2 + 1 = 3. So x = 3, y = 2.",
            translations: {
              "pt-BR": {
                question: "Resolva o sistema: x + y = 5, x - y = 1",
                answers: ["x = 2, y = 3", "x = 3, y = 2", "x = 4, y = 1", "x = 1, y = 4"],
                explanation:
                  "De x - y = 1, obtemos x = y + 1. Substitua isso em x + y = 5: (y + 1) + y = 5, 2y + 1 = 5, 2y = 4, y = 2. Então x = y + 1 = 2 + 1 = 3. Portanto, x = 3, y = 2.",
              },
            },
          },
        ],
      },
    ],
  },
]

