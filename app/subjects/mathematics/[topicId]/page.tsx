"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Home, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/context/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useParams, useRouter, useSearchParams } from "next/navigation"

// Replace the TopicDescription and ExercisePage components with a combined LessonPage component
// that shows the lesson content, video, and all exercises on the same page

// Replace the above TopicDescription component and the ExercisePage component with this new LessonPage component
function LessonPage({
  grade,
  topic,
}: {
  grade: any
  topic: any
}) {
  const { t, language } = useLanguage()

  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState<Record<number, boolean>>({})

  // Get the translated content
  const getTranslatedContent = (content: any) => {
    if (language === "pt-BR" && content.translations?.["pt-BR"]) {
      return {
        title: content.translations["pt-BR"].title || content.title,
        description: content.translations["pt-BR"].description || content.description,
        videoTitle: content.translations["pt-BR"].videoTitle || content.videoTitle,
      }
    }
    return {
      title: content.title,
      description: content.description,
      videoTitle: content.videoTitle,
    }
  }

  const translatedContent = getTranslatedContent(topic)

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

  const handleAnswerSelect = (exerciseIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [exerciseIndex]: answerIndex,
    })
  }

  const handleCheckAnswer = (exerciseIndex: number) => {
    setShowResults({
      ...showResults,
      [exerciseIndex]: true,
    })
  }

  const isAnswerCorrect = (exerciseIndex: number) => {
    return selectedAnswers[exerciseIndex] === topic.exercises[exerciseIndex].correctAnswer
  }

  // Calculate overall progress
  const completedExercises = Object.keys(showResults).filter((index) => showResults[Number(index)]).length
  const progress = (completedExercises / topic.exercises.length) * 100

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter">{topic.nameKey ? t(topic.nameKey) : topic.name}</h1>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-xl">{topic.icon}</span>
          <span className="text-muted-foreground">
            {topic.exercises.length} {t("exercises")}
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-pink-500">
            {Math.round(progress)}% {t("complete")}
          </span>
        </div>
      </div>

      {/* Lesson Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{topic.nameKey ? t(topic.nameKey) : topic.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line text-base">{translatedContent.description}</p>
          </div>

          {topic.examples && topic.examples.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">{t("examples")}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {topic.examples.map((example: any, index: number) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="p-4">
                      <p className="font-medium">{example.question}</p>
                      <p className="mt-2">{example.solution}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Section */}
      {topic.videoUrl && (
        <Card>
          <CardHeader>
            <CardTitle>{translatedContent.videoTitle || t("video_lesson")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              {/* This would be a real video player in a production app */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-full bg-pink-500 p-4">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-lg font-medium">{t("click_to_play_video")}</p>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Video thumbnail"
                width={800}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exercises Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">{t("take_exercises_to_practice")}</h2>
          <p className="text-muted-foreground mb-4">{t("practice_description")}</p>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">
              {completedExercises}/{topic.exercises.length} {t("completed")}
            </span>
            <Progress value={progress} className="h-2 w-24" />
          </div>
        </div>

        {topic.exercises.map((exercise: any, index: number) => {
          const exerciseContent = getExerciseContent(exercise)

          return (
            <Card
              key={index}
              id={`exercise-${index}`}
              className={`border-2 ${showResults[index] && isAnswerCorrect(index) ? "border-green-200" : ""}`}
            >
              <CardHeader>
                <CardTitle>
                  {t("exercise")} {index + 1}
                </CardTitle>
                <CardDescription>{t("choose_answer")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-lg font-medium">{exerciseContent.question}</div>

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
                  {exerciseContent.answers.map((answer: string, answerIndex: number) => (
                    <Button
                      key={answerIndex}
                      variant={selectedAnswers[index] === answerIndex ? "default" : "outline"}
                      className={`justify-start h-auto py-3 px-4 text-left ${
                        showResults[index] && answerIndex === exercise.correctAnswer
                          ? "border-green-500 bg-green-50 hover:bg-green-50"
                          : showResults[index] &&
                              selectedAnswers[index] === answerIndex &&
                              answerIndex !== exercise.correctAnswer
                            ? "border-red-500 bg-red-50 hover:bg-red-50"
                            : ""
                      }`}
                      onClick={() => !showResults[index] && handleAnswerSelect(index, answerIndex)}
                      disabled={showResults[index]}
                    >
                      <div className="flex items-start gap-2">
                        <div className="rounded-full bg-muted w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                          {String.fromCharCode(65 + answerIndex)}
                        </div>
                        <div>{answer}</div>
                      </div>
                    </Button>
                  ))}
                </div>

                {showResults[index] && (
                  <div
                    className={`p-4 rounded-md ${isAnswerCorrect(index) ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                  >
                    {isAnswerCorrect(index)
                      ? t("correct")
                      : `${t("incorrect")} ${String.fromCharCode(65 + exercise.correctAnswer)}.`}
                    <div className="mt-2 text-sm">{exerciseContent.explanation}</div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {!showResults[index] ? (
                  <Button
                    onClick={() => handleCheckAnswer(index)}
                    disabled={selectedAnswers[index] === undefined}
                    className="w-full"
                  >
                    {t("check_answer")}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // Scroll to next unanswered exercise if available
                      for (let i = index + 1; i < topic.exercises.length; i++) {
                        if (!showResults[i]) {
                          const element = document.getElementById(`exercise-${i}`)
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" })
                            break
                          }
                        }
                      }
                    }}
                  >
                    {index < topic.exercises.length - 1 ? t("next_exercise") : t("complete_btn")}
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}

        {/* Show completion card when all exercises are done */}
        {completedExercises === topic.exercises.length && completedExercises > 0 && (
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
                        ([index, answer]) => answer === topic.exercises[Number(index)].correctAnswer,
                      ).length
                    }{" "}
                    / {topic.exercises.length}
                  </span>
                </div>
                <Progress
                  value={
                    (Object.entries(selectedAnswers).filter(
                      ([index, answer]) => answer === topic.exercises[Number(index)].correctAnswer,
                    ).length /
                      topic.exercises.length) *
                    100
                  }
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Update the main component to use the new LessonPage component
export default function TopicPage() {
  const { t, language } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const topicId = params.topicId as string
  const gradeId = searchParams.get("grade") || "grade1"

  const [selectedGrade, setSelectedGrade] = useState<any>(null)
  const [selectedTopic, setSelectedTopic] = useState<any>(null)

  useEffect(() => {
    // Find the grade and topic data
    const grade = grades.find((g) => g.id === gradeId)
    if (grade) {
      setSelectedGrade(grade)
      const topic = grade.topics.find((t) => t.id === topicId)
      if (topic) {
        setSelectedTopic(topic)
      } else {
        // Topic not found, redirect to grade page
        router.push(`/subjects/mathematics?grade=${gradeId}`)
      }
    } else {
      // Grade not found, redirect to mathematics page
      router.push("/subjects/mathematics")
    }
  }, [gradeId, topicId, router])

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
          <Link href={`/subjects/mathematics?grade=${selectedGrade.id}`} className="hover:text-primary">
            {selectedGrade.nameKey ? t(selectedGrade.nameKey) : selectedGrade.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">
            {selectedTopic.nameKey ? t(selectedTopic.nameKey) : selectedTopic.name}
          </span>
        </div>

        <LessonPage grade={selectedGrade} topic={selectedTopic} />
      </div>

      <Footer />
    </div>
  )
}

// Update the grades data structure to remove the redundant description property
// For example, for the counting topic:

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
        icon: "🔢",
        progress: 75,
        title: "Understanding Counting and Numbers",
        description:
          "Counting is one of the first math skills children learn. It involves assigning a number to each object in a group, one by one, to determine the total quantity.\n\nWhen we count, we follow these important rules:\n\n1. We say one number for each object (one-to-one correspondence)\n2. We count each object only once\n3. The last number we say tells us how many objects there are in total\n\nNumbers from 1 to 20 are the building blocks for all future math learning. Being able to recognize, name, and write these numbers is an essential skill.",
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Introduction to Counting",
        examples: [
          {
            question: "How do we count a group of 5 apples?",
            solution: 'Point to each apple one by one while saying: "1, 2, 3, 4, 5". The total number of apples is 5.',
          },
          {
            question: "What comes after 17 when counting?",
            solution: "When counting in order, after 17 comes 18, then 19, then 20.",
          },
        ],
        translations: {
          "pt-BR": {
            title: "Entendendo Contagem e Números",
            description:
              "A contagem é uma das primeiras habilidades matemáticas que as crianças aprendem. Envolve atribuir um número a cada objeto em um grupo, um por um, para determinar a quantidade total.\n\nQuando contamos, seguimos estas regras importantes:\n\n1. Dizemos um número para cada objeto (correspondência um-a-um)\n2. Contamos cada objeto apenas uma vez\n3. O último número que dizemos nos diz quantos objetos há no total\n\nNúmeros de 1 a 20 são os blocos de construção para todo aprendizado futuro de matemática. Ser capaz de reconhecer, nomear e escrever esses números é uma habilidade essencial.",
            videoTitle: "Introdução à Contagem",
          },
        },
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
        title: "Learning Addition within 10",
        description:
          "Addition is the process of combining two or more numbers to find their total. When we add numbers, we are finding out how many items we have in all.\n\nAddition can be represented in different ways:\n\n• Using the plus sign: 3 + 4 = 7\n• Using words: three plus four equals seven\n• Using objects: combining 3 blocks with 4 blocks gives 7 blocks\n\nWhen adding within 10, we're working with small numbers that add up to no more than 10. This is a fundamental skill that builds the foundation for all future math learning.",
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Introduction to Addition",
        examples: [
          {
            question: "How do we add 2 + 3?",
            solution:
              "We can count 2 objects, then count 3 more objects, and then count all objects together: 1, 2, 3, 4, 5. So 2 + 3 = 5.",
          },
          {
            question: "If you have 4 apples and get 2 more, how many do you have in total?",
            solution: "We add 4 + 2 = 6. You have 6 apples in total.",
          },
        ],
        translations: {
          "pt-BR": {
            title: "Aprendendo Adição até 10",
            description:
              "Adição é o processo de combinar dois ou mais números para encontrar o total. Quando adicionamos números, estamos descobrindo quantos itens temos no total.\n\nA adição pode ser representada de diferentes maneiras:\n\n• Usando o sinal de mais: 3 + 4 = 7\n• Usando palavras: três mais quatro é igual a sete\n• Usando objetos: combinar 3 blocos com 4 blocos dá 7 blocos\n\nQuando adicionamos até 10, estamos trabalhando com números pequenos que somam no máximo 10. Esta é uma habilidade fundamental que constrói a base para todo aprendizado futuro de matemática.",
            videoTitle: "Introdução à Adição",
          },
        },
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
        title: "Understanding Subtraction within 10",
        description:
          "Subtraction is the process of taking away or removing a number from another number. It's the opposite of addition.\n\nSubtraction can be represented in different ways:\n\n• Using the minus sign: 7 - 3 = 4\n• Using words: seven minus three equals four\n• Using objects: starting with 7 blocks and removing 3 blocks leaves 4 blocks\n\nSubtraction can also represent finding the difference between two numbers, or comparing quantities.\n\nWhen subtracting within 10, we're working with small numbers where both the starting number and the answer are no more than 10.",
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Introduction to Subtraction",
        examples: [
          {
            question: "How do we subtract 5 - 2?",
            solution:
              "We start with 5 objects, then take away 2 objects. We count the remaining objects: 1, 2, 3. So 5 - 2 = 3.",
          },
          {
            question: "If you have 8 candies and eat 3, how many do you have left?",
            solution: "We subtract 8 - 3 = 5. You have 5 candies left.",
          },
        ],
        translations: {
          "pt-BR": {
            title: "Entendendo Subtração até 10",
            description:
              "Subtração é o processo de tirar ou remover um número de outro número. É o oposto da adição.\n\nA subtração pode ser representada de diferentes maneiras:\n\n• Usando o sinal de menos: 7 - 3 = 4\n• Usando palavras: sete menos três é igual a quatro\n• Usando objetos: começando com 7 blocos e removendo 3 blocos, sobram 4 blocos\n\nA subtração também pode representar a diferença entre dois números, ou comparar quantidades.\n\nQuando subtraímos até 10, estamos trabalhando com números pequenos onde tanto o número inicial quanto a resposta não são maiores que 10.",
            videoTitle: "Introdução à Subtração",
          },
        },
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
        title: "Addition with Two-Digit Numbers",
        description:
          "Adding two-digit numbers builds on your understanding of basic addition. When adding larger numbers, we can break them down into tens and ones to make the process easier.\n\nThere are several strategies for adding two-digit numbers:\n\n1. Breaking apart numbers by place value\n   Example: 25 + 13\n   • Add the tens: 20 + 10 = 30\n   • Add the ones: 5 + 3 = 8\n   • Combine: 30 + 8 = 38\n\n2. Counting on by tens and ones\n   Example: 46 + 32\n   • Start with 46\n   • Count on by tens: 56, 66, 76\n   • Count on by ones: 77, 78\n   • Result: 78\n\n3. Using a number line\n   Example: 35 + 27\n   • Start at 35\n   • Jump forward 20 (to 55)\n   • Jump forward 7 more (to 62)\n   • Result: 62",
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Adding Two-Digit Numbers",
        examples: [
          {
            question: "How do we add 25 + 13?",
            solution:
              "We can break apart the numbers by place value. First, add the tens: 20 + 10 = 30. Then, add the ones: 5 + 3 = 8. Finally, combine: 30 + 8 = 38.",
          },
          {
            question: "What is 46 + 32?",
            solution: "We can add the tens first: 40 + 30 = 70. Then add the ones: 6 + 2 = 8. So 46 + 32 = 78.",
          },
        ],
        translations: {
          "pt-BR": {
            title: "Adição com Números de Dois Dígitos",
            description:
              "Adicionar números de dois dígitos se baseia na sua compreensão da adição básica. Ao adicionar números maiores, podemos dividi-los em dezenas e unidades para facilitar o processo.\n\nExistem várias estratégias para adicionar números de dois dígitos:\n\n1. Separando números por valor posicional\n   Exemplo: 25 + 13\n   • Some as dezenas: 20 + 10 = 30\n   • Some as unidades: 5 + 3 = 8\n   • Combine: 30 + 8 = 38\n\n2. Contando por dezenas e unidades\n   Exemplo: 46 + 32\n   • Comece com 46\n   • Conte por dezenas: 56, 66, 76\n   • Conte por unidades: 77, 78\n   • Resultado: 78\n\n3. Usando uma reta numérica\n   Exemplo: 35 + 27\n   • Comece em 35\n   • Salte 20 para frente (até 55)\n   • Salte mais 7 para frente (até 62)\n   • Resultado: 62",
            videoTitle: "Adicionando Números de Dois Dígitos",
          },
        },
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
        title: "Subtraction with Two-Digit Numbers",
        description:
          "Subtracting two-digit numbers builds on your understanding of basic subtraction. Similar to addition, we can break down larger numbers into tens and ones to make subtraction easier.\n\nHere are some strategies for subtracting two-digit numbers:\n\n1. Breaking apart numbers by place value\n   Example: 57 - 24\n   • Subtract the tens: 50 - 20 = 30\n   • Subtract the ones: 7 - 4 = 3\n   • Combine: 30 + 3 = 33\n\n2. Counting back by tens and ones\n   Example: 78 - 45\n   • Start with 78\n   • Count back by tens: 68, 58, 48\n   • Count back by ones: 47, 46, 45, 44, 43\n   • Result: 33\n\n3. Using a number line\n   Example: 62 - 27\n   • Start at 62\n   • Jump back 20 (to 42)\n   • Jump back 7 more (to 35)\n   • Result: 35",
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Subtracting Two-Digit Numbers",
        examples: [
          {
            question: "How do we subtract 57 - 24?",
            solution:
              "We can break apart the numbers by place value. First, subtract the tens: 50 - 20 = 30. Then, subtract the ones: 7 - 4 = 3. Finally, combine: 30 + 3 = 33.",
          },
          {
            question: "What is 78 - 45?",
            solution:
              "We can subtract the tens first: 70 - 40 = 30. Then subtract the ones: 8 - 5 = 3. So 78 - 45 = 33.",
          },
        ],
        translations: {
          "pt-BR": {
            title: "Subtração com Números de Dois Dígitos",
            description:
              "Subtrair números de dois dígitos se baseia na sua compreensão da subtração básica. Semelhante à adição, podemos dividir números maiores em dezenas e unidades para facilitar a subtração.\n\nAqui estão algumas estratégias para subtrair números de dois dígitos:\n\n1. Separando números por valor posicional\n   Exemplo: 57 - 24\n   • Subtraia as dezenas: 50 - 20 = 30\n   • Subtraia as unidades: 7 - 4 = 3\n   • Combine: 30 + 3 = 33\n\n2. Contando para trás por dezenas e unidades\n   Exemplo: 78 - 45\n   • Comece com 78\n   • Conte para trás por dezenas: 68, 58, 48\n   • Conte para trás por unidades: 47, 46, 45, 44, 43\n   • Resultado: 33\n\n3. Usando uma reta numérica\n   Exemplo: 62 - 27\n   • Comece em 62\n   • Salte 20 para trás (até 42)\n   • Salte mais 7 para trás (até 35)\n   • Resultado: 35",
            videoTitle: "Subtraindo Números de Dois Dígitos",
          },
        },
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
        title: "Introduction to Multiplication",
        description:
          'Multiplication is a mathematical operation that represents repeated addition of the same number. It\'s a faster way to add the same number multiple times.\n\nFor example, instead of writing 4 + 4 + 4, we can write 3 × 4, which means "3 groups of 4" or "4 added 3 times."\n\nMultiplication can be represented in different ways:\n\n• Using the multiplication symbol: 3 × 4 = 12\n• Using words: three times four equals twelve\n• Using arrays: 3 rows of 4 dots gives 12 dots total\n\nUnderstanding multiplication as repeated addition helps build a foundation for more advanced math concepts.',
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Understanding Multiplication",
        examples: [
          {
            question: "How can we represent 3 × 4 as repeated addition?",
            solution: "3 × 4 means 3 groups of 4, which can be written as 4 + 4 + 4 = 12.",
          },
          {
            question: "If there are 5 rows of chairs with 6 chairs in each row, how many chairs are there in total?",
            solution: "We can multiply 5 × 6 = 30. There are 30 chairs in total.",
          },
        ],
        translations: {
          "pt-BR": {
            title: "Introdução à Multiplicação",
            description:
              'Multiplicação é uma operação matemática que representa a adição repetida do mesmo número. É uma maneira mais rápida de adicionar o mesmo número várias vezes.\n\nPor exemplo, em vez de escrever 4 + 4 + 4, podemos escrever 3 × 4, o que significa "3 grupos de 4" ou "4 adicionado 3 vezes."\n\nA multiplicação pode ser representada de diferentes maneiras:\n\n• Usando o símbolo de multiplicação: 3 × 4 = 12\n• Usando palavras: três vezes quatro é igual a doze\n• Usando matrizes: 3 linhas de 4 pontos dá um total de 12 pontos\n\nEntender a multiplicação como adição repetida ajuda a construir uma base para conceitos matemáticos mais avançados.',
            videoTitle: "Entendendo a Multiplicação",
          },
        },
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
]

