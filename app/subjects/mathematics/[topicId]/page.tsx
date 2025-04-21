"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Home, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VideoPlayer } from "@/components/video-player"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { grades } from "./data"

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

  const translatedContent = getTranslatedContent(selectedTopic)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container px-4 py-4 sm:py-6 md:px-6">
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
          <span className="text-foreground truncate">
            {selectedTopic.nameKey ? t(selectedTopic.nameKey) : selectedTopic.name}
          </span>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Topic Header */}
          <div className="space-y-2 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter">
              {selectedTopic.nameKey ? t(selectedTopic.nameKey) : selectedTopic.name}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xl">{selectedTopic.icon}</span>
              <span className="text-muted-foreground">
                {selectedTopic.exercises.length} {t("exercises")}
              </span>
            </div>
          </div>

          {/* Topic Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">{translatedContent.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-sm sm:text-base">{translatedContent.description}</p>
              </div>

              {selectedTopic.examples && selectedTopic.examples.length > 0 && (
                <div className="mt-4 sm:mt-6 space-y-4">
                  <h3 className="text-base sm:text-lg font-medium">{t("examples")}</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedTopic.examples.map((example: any, index: number) => (
                      <Card key={index} className="bg-muted/50">
                        <CardContent className="p-3 sm:p-4">
                          <p className="font-medium text-sm sm:text-base">{example.question}</p>
                          <p className="mt-2 text-sm">{example.solution}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Video Section */}
          {selectedTopic.videoId && (
            <Card>
              <CardHeader>
                <CardTitle>{translatedContent.videoTitle || t("video_lesson")}</CardTitle>
              </CardHeader>
              <CardContent>
                <VideoPlayer
                  videoId={selectedTopic.videoId}
                  title={translatedContent.videoTitle || t("video_lesson")}
                />
              </CardContent>
            </Card>
          )}

          {/* Exercises Link */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>{t("practice_exercises")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm sm:text-base">{t("practice_description")}</p>
              <Link href={`/subjects/mathematics/${topicId}/exercises?grade=${gradeId}`}>
                <Button className="w-full sm:w-auto flex items-center gap-2">
                  {t("view_all_exercises")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
