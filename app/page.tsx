"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, Clock, Medal, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-pink-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {t("hero_title")}
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">{t("hero_description")}</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/subjects">
                    <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                      {t("explore_subjects")}
                    </Button>
                  </Link>
                  <Link href="/grades">
                    <Button size="lg" variant="outline">
                      {t("explore_grades")}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 relative">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Happy children learning"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("why_choose_us")}</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("platform_description")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-2 border-pink-100">
                <CardHeader className="pb-2">
                  <Medal className="h-12 w-12 text-pink-500" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl">{t("expert_content")}</CardTitle>
                  <CardDescription className="mt-2">{t("expert_content_desc")}</CardDescription>
                </CardContent>
              </Card>
              <Card className="border-2 border-blue-100">
                <CardHeader className="pb-2">
                  <Users className="h-12 w-12 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl">{t("interactive_learning")}</CardTitle>
                  <CardDescription className="mt-2">{t("interactive_learning_desc")}</CardDescription>
                </CardContent>
              </Card>
              <Card className="border-2 border-green-100">
                <CardHeader className="pb-2">
                  <BookOpen className="h-12 w-12 text-green-500" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl">{t("comprehensive_topics")}</CardTitle>
                  <CardDescription className="mt-2">{t("comprehensive_topics_desc")}</CardDescription>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-100">
                <CardHeader className="pb-2">
                  <Clock className="h-12 w-12 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl">{t("learn_at_your_pace")}</CardTitle>
                  <CardDescription className="mt-2">{t("learn_at_your_pace_desc")}</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("popular_subjects")}</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("popular_subjects_desc")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={subject.image || "/placeholder.svg"}
                      alt={t(subject.nameKey)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{t(subject.nameKey)}</CardTitle>
                    <CardDescription>{t(subject.descKey)}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href={subject.link} className="w-full">
                      <Button className="w-full" variant="outline">
                        {t("learn_more")}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8 gap-4">
              <Link href="/subjects">
                <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                  {t("view_all_subjects")}
                </Button>
              </Link>
              <Link href="/grades">
                <Button size="lg" variant="outline">
                  {t("browse_by_grade")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("how_it_works_title")}
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("how_it_works_desc")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                  1
                </div>
                <h3 className="text-xl font-bold">{t("step1_title")}</h3>
                <p className="text-muted-foreground">{t("step1_desc")}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                  2
                </div>
                <h3 className="text-xl font-bold">{t("step2_title")}</h3>
                <p className="text-muted-foreground">{t("step2_desc")}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-500">
                  3
                </div>
                <h3 className="text-xl font-bold">{t("step3_title")}</h3>
                <p className="text-muted-foreground">{t("step3_desc")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("cta_title")}</h2>
                  <p className="max-w-[600px] text-pink-100 md:text-xl">{t("cta_desc")}</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="bg-white text-pink-500 hover:bg-gray-100">
                      {t("start_learning_now")}
                    </Button>
                  </Link>
                  <Link href="/subjects/mathematics">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-pink-600">
                      {t("try_mathematics")}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mr-0">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  width={500}
                  height={400}
                  alt="Happy child learning"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

const subjects = [
  {
    nameKey: "mathematics_name",
    descKey: "mathematics_desc",
    image: "/placeholder.svg?height=200&width=400",
    link: "/subjects/mathematics",
  },
  {
    nameKey: "english_name",
    descKey: "english_desc",
    image: "/placeholder.svg?height=200&width=400",
    link: "/subjects/english",
  },
  {
    nameKey: "science_name",
    descKey: "science_desc",
    image: "/placeholder.svg?height=200&width=400",
    link: "/subjects/science",
  },
  {
    nameKey: "coding_name",
    descKey: "coding_desc",
    image: "/placeholder.svg?height=200&width=400",
    link: "/subjects/coding",
  },
  {
    nameKey: "art_name",
    descKey: "art_desc",
    image: "/placeholder.svg?height=200&width=400",
    link: "/subjects/art",
  },
  {
    nameKey: "music_name",
    descKey: "music_desc",
    image: "/placeholder.svg?height=200&width=400",
    link: "/subjects/music",
  },
]

