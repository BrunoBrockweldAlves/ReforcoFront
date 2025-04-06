"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, RotateCcw, Star, Trophy, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProfilePage() {
  const { t } = useLanguage()
  const { user, logout, resetProgress, restoreProgress, removeFromFavorites } = useAuth()
  const router = useRouter()

  const [resetType, setResetType] = useState<"all" | "grade" | "topic">("all")
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const [resetBackup, setResetBackup] = useState<any>(null)
  const [showRestoreAlert, setShowRestoreAlert] = useState(false)

  if (!user) {
    // Redirect to login if not authenticated
    router.push("/login")
    return null
  }

  const handleResetProgress = async () => {
    setIsResetting(true)

    try {
      let result

      if (resetType === "topic" && selectedGrade && selectedTopic) {
        result = await resetProgress(selectedGrade, selectedTopic)
      } else if (resetType === "grade" && selectedGrade) {
        result = await resetProgress(selectedGrade)
      } else {
        result = await resetProgress()
      }

      if (result.success) {
        setResetBackup(result.backup)
        setResetSuccess(true)
        setShowRestoreAlert(true)

        // Hide the restore alert after 10 seconds
        setTimeout(() => {
          setShowRestoreAlert(false)
        }, 10000)
      }
    } catch (error) {
      console.error("Error resetting progress:", error)
    } finally {
      setIsResetting(false)
    }
  }

  const handleRestoreProgress = () => {
    if (resetBackup) {
      restoreProgress(resetBackup)
      setShowRestoreAlert(false)
      setResetBackup(null)
    }
  }

  // Get user's favorite topics
  const getFavoriteTopics = () => {
    if (!user.favorites.length) return []

    const favorites: any[] = []

    // In a real app, this would be an API call to get the details of each favorite topic
    // For demo purposes, we'll just create some mock data
    user.favorites.forEach((topicId) => {
      const [gradeId, subjectId, topic] = topicId.split("-")

      favorites.push({
        id: topicId,
        name: `${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
        subject: subjectId.charAt(0).toUpperCase() + subjectId.slice(1),
        grade: `Grade ${gradeId.replace("grade", "")}`,
      })
    })

    return favorites
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

    return progress
  }

  const favoriteTopics = getFavoriteTopics()
  const progressItems = getUserProgress()
  const unlockedAchievements = user.achievements.filter((a) => a.unlocked)
  const lockedAchievements = user.achievements.filter((a) => !a.unlocked)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container px-4 py-6 md:px-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">{t("profile")}</h1>
              <p className="text-muted-foreground">{t("manage_your_account")}</p>
            </div>
            <Button variant="outline" onClick={logout}>
              {t("logout")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-pink-500" />
                  {t("account_info")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t("name")}</p>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t("email")}</p>
                    <p>{user.email}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile/edit">{t("edit_profile")}</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  {t("achievements")}
                </CardTitle>
                <CardDescription>
                  {unlockedAchievements.length} {t("of")} {user.achievements.length} {t("unlocked")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {unlockedAchievements.length > 0 ? (
                    unlockedAchievements.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-2">
                        <span className="text-xl">{achievement.icon}</span>
                        <div>
                          <p className="text-sm font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">{t("no_achievements_yet")}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile/achievements">{t("view_all_achievements")}</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-500" />
                  {t("progress_overview")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {progressItems.length > 0 ? (
                    <div>
                      <p className="text-sm">
                        {progressItems.filter((p) => p.completed).length} {t("completed_topics")}
                      </p>
                      <p className="text-sm">
                        {progressItems.length - progressItems.filter((p) => p.completed).length}{" "}
                        {t("in_progress_topics")}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t("no_progress_yet")}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                      {t("reset_progress")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("reset_progress")}</DialogTitle>
                      <DialogDescription>{t("reset_progress_warning")}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">{t("reset_type")}</p>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant={resetType === "all" ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              setResetType("all")
                              setSelectedGrade(null)
                              setSelectedTopic(null)
                            }}
                          >
                            {t("all_progress")}
                          </Button>
                          <Button
                            variant={resetType === "grade" ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              setResetType("grade")
                              setSelectedTopic(null)
                            }}
                          >
                            {t("specific_grade")}
                          </Button>
                          <Button
                            variant={resetType === "topic" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setResetType("topic")}
                          >
                            {t("specific_topic")}
                          </Button>
                        </div>
                      </div>

                      {(resetType === "grade" || resetType === "topic") && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{t("select_grade")}</p>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "grade1",
                              "grade2",
                              "grade3",
                              "grade4",
                              "grade5",
                              "grade6",
                              "grade7",
                              "grade8",
                              "grade9",
                            ].map((grade) => (
                              <Button
                                key={grade}
                                variant={selectedGrade === grade ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedGrade(grade)}
                              >
                                {t("grade")} {grade.replace("grade", "")}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {resetType === "topic" && selectedGrade && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{t("select_topic")}</p>
                          <div className="flex flex-wrap gap-2">
                            {["mathematics", "english", "science"].map((subject) => (
                              <Button
                                key={subject}
                                variant={selectedTopic === subject ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedTopic(subject)}
                              >
                                {t(`${subject}_name`)}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setResetType("all")
                          setSelectedGrade(null)
                          setSelectedTopic(null)
                        }}
                      >
                        {t("cancel")}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleResetProgress}
                        disabled={
                          isResetting ||
                          (resetType === "grade" && !selectedGrade) ||
                          (resetType === "topic" && (!selectedGrade || !selectedTopic))
                        }
                      >
                        {isResetting ? t("resetting") : t("confirm_reset")}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>

          {showRestoreAlert && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertTitle className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                {t("progress_reset")}
              </AlertTitle>
              <AlertDescription className="flex flex-col gap-2">
                <p>{t("progress_reset_success")}</p>
                <Button variant="outline" size="sm" className="w-fit mt-2" onClick={handleRestoreProgress}>
                  {t("restore_progress")}
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="favorites">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="favorites">{t("favorites")}</TabsTrigger>
              <TabsTrigger value="progress">{t("progress")}</TabsTrigger>
              <TabsTrigger value="achievements">{t("achievements")}</TabsTrigger>
            </TabsList>

            <TabsContent value="favorites" className="space-y-4 mt-4">
              <h2 className="text-xl font-bold">{t("favorite_topics")}</h2>

              {favoriteTopics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteTopics.map((topic) => (
                    <Card key={topic.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{topic.name}</CardTitle>
                        <CardDescription>
                          {topic.subject} - {topic.grade}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/subjects/${topic.subject.toLowerCase()}?topic=${topic.id}`}>
                            {t("continue_learning")}
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => removeFromFavorites(topic.id)}>
                          <Heart className="h-4 w-4 fill-current text-red-500" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">{t("no_favorites")}</p>
              )}
            </TabsContent>

            <TabsContent value="progress" className="space-y-4 mt-4">
              <h2 className="text-xl font-bold">{t("your_progress")}</h2>

              {progressItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {progressItems.map((item) => (
                    <Card key={item.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{item.topic}</CardTitle>
                        <CardDescription>
                          {t("grade")} {item.grade.replace("grade", "")} -{" "}
                          {item.completed ? t("completed") : t("in_progress")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{t("score")}</span>
                            <span className="text-pink-500">{item.score}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>{t("last_accessed")}</span>
                            <span>{item.lastAccessed}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={`/subjects/${item.topic.toLowerCase()}?grade=${item.grade}`}>
                            {item.completed ? t("review") : t("continue")}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">{t("no_progress_yet")}</p>
              )}
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4 mt-4">
              <h2 className="text-xl font-bold">{t("your_achievements")}</h2>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("unlocked_achievements")}</h3>

                  {unlockedAchievements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {unlockedAchievements.map((achievement) => (
                        <Card key={achievement.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base">
                              <span className="text-xl">{achievement.icon}</span>
                              {achievement.title}
                            </CardTitle>
                            <CardDescription>{achievement.description}</CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <p className="text-xs text-muted-foreground">
                              {t("unlocked_on")} {new Date(achievement.unlockedAt || "").toLocaleDateString()}
                            </p>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">{t("no_achievements_yet")}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("locked_achievements")}</h3>

                  {lockedAchievements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lockedAchievements.map((achievement) => (
                        <Card key={achievement.id} className="bg-gray-50 border-dashed">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base text-gray-500">
                              <span className="text-xl opacity-50">{achievement.icon}</span>
                              {achievement.title}
                            </CardTitle>
                            <CardDescription className="text-gray-400">{achievement.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">{t("all_achievements_unlocked")}</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}

