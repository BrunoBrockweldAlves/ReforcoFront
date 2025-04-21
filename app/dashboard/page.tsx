"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BookOpen, GraduationCap, Heart, LayoutDashboard, Star, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  const { t } = useLanguage()
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
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

  // Get user's progress
  const getUserProgress = () => {
    if (!user.progress || Object.keys(user.progress).length === 0) return []

    const progress: any[] = []

    // In a real app, this would be an API call to get the details of each progress item
    // For demo purposes, we'll just create some mock data
    Object.entries(user.progress).forEach(([key, value]) => {
      const [gradeId, topicId] = key.split("-")

      progress.push({
        id: key,
        grade: gradeId,
        topic: topicId,
        score: value.score,
        completed: value.completed,
        lastAccessed: new Date(value.lastAccessed).toLocaleDateString(),
      })
    })

    return progress.sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
  }

  const progressItems = getUserProgress()
  const recentProgress = progressItems.slice(0, 3)
  const unlockedAchievements = user.achievements.filter((a) => a.unlocked)
  const favoriteTopics = user.favorites.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container px-4 py-6 md:px-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">{t("dashboard")}</h1>
              <p className="text-muted-foreground">{t("welcome_back", { name: user.name })}</p>
            </div>
            <Button asChild>
              <Link href="/subjects">{t("continue_learning")}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4 text-pink-500" />
                  {t("learning_progress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {progressItems.filter((p) => p.completed).length}/{progressItems.length}
                </div>
                <p className="text-xs text-muted-foreground">{t("topics_completed")}</p>
                <Progress
                  value={
                    progressItems.length
                      ? (progressItems.filter((p) => p.completed).length / progressItems.length) * 100
                      : 0
                  }
                  className="h-2 mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  {t("achievements")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {unlockedAchievements.length}/{user.achievements.length}
                </div>
                <p className="text-xs text-muted-foreground">{t("achievements_unlocked")}</p>
                <Progress value={(unlockedAchievements.length / user.achievements.length) * 100} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  {t("favorites")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.favorites.length}</div>
                <p className="text-xs text-muted-foreground">{t("favorite_topics")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-500" />
                  {t("learning_streak")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">{t("days_in_a_row")}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t("recent_progress")}</CardTitle>
                <CardDescription>{t("continue_where_you_left_off")}</CardDescription>
              </CardHeader>
              <CardContent>
                {recentProgress.length > 0 ? (
                  <div className="space-y-4">
                    {recentProgress.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">{item.topic}</p>
                          <p className="text-sm text-muted-foreground">
                            {t("grade")} {item.grade.replace("grade", "")} -{" "}
                            {item.completed ? t("completed") : t("in_progress")}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/subjects/${item.topic.toLowerCase()}?grade=${item.grade}`}>
                            {item.completed ? t("review") : t("continue")}
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">{t("no_progress_yet")}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile">{t("view_all_progress")}</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t("recommended_for_you")}</CardTitle>
                <CardDescription>{t("based_on_your_interests")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedTopics.map((topic) => (
                    <div key={topic.id} className="flex items-center gap-4">
                      <div className="relative h-12 w-12 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={topic.image || "/placeholder.svg?height=48&width=48"}
                          alt={topic.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{topic.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {topic.subject} - {topic.grade}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={topic.href}>{t("start")}</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/subjects">{t("explore_all_subjects")}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  {t("favorites")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {favoriteTopics.length > 0 ? (
                  <div className="space-y-4">
                    {favoriteTopics.map((topicId) => {
                      const [gradeId, subjectId, topic] = topicId.split("-")
                      return (
                        <div key={topicId} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">{topic.charAt(0).toUpperCase() + topic.slice(1)}</p>
                            <p className="text-sm text-muted-foreground">
                              {subjectId.charAt(0).toUpperCase() + subjectId.slice(1)} - {t("grade")}{" "}
                              {gradeId.replace("grade", "")}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/subjects/${subjectId}?topic=${topicId}`}>{t("continue")}</Link>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">{t("no_favorites")}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile">{t("manage_favorites")}</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  {t("recent_achievements")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {unlockedAchievements.length > 0 ? (
                  <div className="space-y-4">
                    {unlockedAchievements.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-2">
                        <span className="text-xl">{achievement.icon}</span>
                        <div>
                          <p className="text-sm font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">{t("no_achievements_yet")}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile">{t("view_all_achievements")}</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-500" />
                  {t("learning_path")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{t("current_level")}</p>
                      <p className="text-sm text-green-500">{t("beginner")}</p>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t("next_milestone")}</p>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <p className="text-sm">{t("complete_5_topics")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/learning-path">{t("view_learning_path")}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

const recommendedTopics = [
  {
    id: "fractions",
    name: "Introduction to Fractions",
    subject: "Mathematics",
    grade: "Grade 3",
    image: "/placeholder.svg?height=48&width=48",
    href: "/subjects/mathematics?grade=grade3&topic=fractions",
  },
  {
    id: "reading",
    name: "Reading Comprehension",
    subject: "English",
    grade: "Grade 2",
    image: "/placeholder.svg?height=48&width=48",
    href: "/subjects/english?grade=grade2&topic=reading",
  },
  {
    id: "plants",
    name: "Plant Life Cycles",
    subject: "Science",
    grade: "Grade 3",
    image: "/placeholder.svg?height=48&width=48",
    href: "/subjects/science?grade=grade3&topic=plants",
  },
]
