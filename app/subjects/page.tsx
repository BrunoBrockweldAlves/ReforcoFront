"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ChevronRight, Home, Search, Filter, X, Tag, GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useLanguage } from "@/context/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Define a Topic type for better type safety
type Topic = {
  id: string
  nameKey: string
  name: string
  descKey: string
  description?: string
  icon: string
  progress: number
  title: string
  gradeId?: string
  gradeName?: string
  subjectId?: string
  subjectName?: string
  topicType?: string
}

export default function SubjectsPage() {
  const { t } = useLanguage()
  const [viewMode, setViewMode] = useState<"subject" | "grade">("subject")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGrades, setSelectedGrades] = useState<string[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedTopicTypes, setSelectedTopicTypes] = useState<string[]>([])
  const [allTopics, setAllTopics] = useState<Topic[]>([])
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Prepare all topics on component mount
  useEffect(() => {
    const topics: Topic[] = []

    // Extract all topics from grades and subjects
    grades.forEach((grade) => {
      subjects.forEach((subject) => {
        // Find the corresponding subject data in the grade
        const subjectInGrade = grade.subjects.find((s) => s.id === subject.id)

        if (subjectInGrade) {
          // For each topic in the grade's subject
          getAllTopics(grade.id, subject.id).forEach((topic) => {
            topics.push({
              ...topic,
              gradeId: grade.id,
              gradeName: grade.nameKey ? t(grade.nameKey) : grade.name,
              subjectId: subject.id,
              subjectName: subject.nameKey ? t(subject.nameKey) : subject.name,
              topicType: getTopicType(topic.id),
            })
          })
        }
      })
    })

    setAllTopics(topics)
    setFilteredTopics(topics)
  }, [t])

  // Apply filters when any filter changes
  useEffect(() => {
    let filtered = [...allTopics]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (topic) =>
          topic.name.toLowerCase().includes(query) || (topic.nameKey && t(topic.nameKey).toLowerCase().includes(query)),
      )
    }

    // Apply grade filter
    if (selectedGrades.length > 0) {
      filtered = filtered.filter((topic) => selectedGrades.includes(topic.gradeId || ""))
    }

    // Apply subject filter
    if (selectedSubjects.length > 0) {
      filtered = filtered.filter((topic) => selectedSubjects.includes(topic.subjectId || ""))
    }

    // Apply topic type filter
    if (selectedTopicTypes.length > 0) {
      filtered = filtered.filter((topic) => selectedTopicTypes.includes(topic.topicType || ""))
    }

    setFilteredTopics(filtered)
  }, [searchQuery, selectedGrades, selectedSubjects, selectedTopicTypes, allTopics, t])

  // Helper function to get all topics for a grade and subject
  const getAllTopics = (gradeId: string, subjectId: string): Topic[] => {
    // Find the grade
    const grade = grades.find((g) => g.id === gradeId)
    if (!grade) return []

    // For mathematics, we have the topics directly in the grade
    if (subjectId === "mathematics") {
      return grade.topics || []
    }

    // For other subjects, we would need to implement similar logic
    // This is a placeholder for other subjects
    return []
  }

  // Helper function to determine topic type based on topic id
  const getTopicType = (topicId: string): string => {
    const topicTypeMap: Record<string, string> = {
      counting: "counting",
      addition: "addition",
      addition2: "addition",
      subtraction: "subtraction",
      subtraction2: "subtraction",
      "intro-multiplication": "multiplication",
      multiplication: "multiplication",
      division: "division",
      fractions: "fractions",
      decimals: "decimals",
      geometry: "geometry",
      ratios: "ratios",
      "intro-algebra": "algebra",
      "algebraic-expressions": "algebra",
      "linear-equations": "algebra",
      "linear-functions": "functions",
      "pythagorean-theorem": "geometry",
      "quadratic-equations": "algebra",
      "systems-of-equations": "algebra",
    }

    return topicTypeMap[topicId] || "other"
  }

  // Get unique topic types for filter
  const topicTypes = Array.from(new Set(allTopics.map((topic) => topic.topicType))).filter(Boolean) as string[]

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedGrades([])
    setSelectedSubjects([])
    setSelectedTopicTypes([])
  }

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

  // Get curated collections
  const collections = [
    {
      id: "beginner-math",
      name: t("beginner_math"),
      description: t("beginner_math_desc"),
      image: "/placeholder.svg?height=200&width=400",
      topics: allTopics.filter((topic) => topic.gradeId === "grade1" || topic.gradeId === "grade2").slice(0, 6),
    },
    {
      id: "addition-subtraction",
      name: t("addition_subtraction"),
      description: t("addition_subtraction_desc"),
      image: "/placeholder.svg?height=200&width=400",
      topics: allTopics
        .filter((topic) => topic.topicType === "addition" || topic.topicType === "subtraction")
        .slice(0, 6),
    },
  ]

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
          <span className="text-foreground">{t("subjects")}</span>
        </div>

        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">{t("explore_topics")}</h1>
              <p className="text-muted-foreground">{t("find_topics_to_learn")}</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("search_topics")}
                className="pl-10"
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

            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {t("filters")}
                  {(selectedGrades.length > 0 || selectedSubjects.length > 0 || selectedTopicTypes.length > 0) && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedGrades.length + selectedSubjects.length + selectedTopicTypes.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>{t("filters")}</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  {/* Grade Filter */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">{t("grades")}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {grades.map((grade) => (
                        <div key={grade.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`grade-${grade.id}`}
                            checked={selectedGrades.includes(grade.id)}
                            onCheckedChange={() => toggleFilter(grade.id, selectedGrades, setSelectedGrades)}
                          />
                          <label
                            htmlFor={`grade-${grade.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {grade.nameKey ? t(grade.nameKey) : grade.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subject Filter */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">{t("subjects")}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {subjects.map((subject) => (
                        <div key={subject.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subject-${subject.id}`}
                            checked={selectedSubjects.includes(subject.id)}
                            onCheckedChange={() => toggleFilter(subject.id, selectedSubjects, setSelectedSubjects)}
                          />
                          <label
                            htmlFor={`subject-${subject.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {subject.nameKey ? t(subject.nameKey) : subject.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Topic Type Filter */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">{t("topic_types")}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {topicTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedTopicTypes.includes(type)}
                            onCheckedChange={() => toggleFilter(type, selectedTopicTypes, setSelectedTopicTypes)}
                          />
                          <label
                            htmlFor={`type-${type}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {t(`topic_type_${type}`)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={resetFilters}>
                      {t("reset_filters")}
                    </Button>
                    <SheetClose asChild>
                      <Button>{t("apply_filters")}</Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active Filters */}
          {(selectedGrades.length > 0 || selectedSubjects.length > 0 || selectedTopicTypes.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {selectedGrades.map((gradeId) => {
                const grade = grades.find((g) => g.id === gradeId)
                return (
                  <Badge key={gradeId} variant="secondary" className="flex items-center gap-1">
                    {grade?.nameKey ? t(grade.nameKey) : grade?.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => setSelectedGrades(selectedGrades.filter((id) => id !== gradeId))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              })}

              {selectedSubjects.map((subjectId) => {
                const subject = subjects.find((s) => s.id === subjectId)
                return (
                  <Badge key={subjectId} variant="secondary" className="flex items-center gap-1">
                    {subject?.nameKey ? t(subject.nameKey) : subject?.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              })}

              {selectedTopicTypes.map((type) => (
                <Badge key={type} variant="secondary" className="flex items-center gap-1">
                  {t(`topic_type_${type}`)}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setSelectedTopicTypes(selectedTopicTypes.filter((t) => t !== type))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
                {t("clear_all")}
              </Button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {filteredTopics.length} {t("topics_found")}
          </div>

          {/* View Toggle and Content */}
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "subject" | "grade")}
            className="w-full"
          >
            <div className="flex justify-end mb-4">
              <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                <TabsTrigger value="subject" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {t("by_subject")}
                </TabsTrigger>
                <TabsTrigger value="grade" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  {t("by_grade")}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Topic Grid - Subject View */}
            <TabsContent value="subject" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTopics.map((topic) => (
                  <Card
                    key={`${topic.gradeId}-${topic.id}`}
                    className="overflow-hidden hover:border-pink-300 transition-colors"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{topic.icon}</span>
                          <CardTitle className="text-lg">{topic.nameKey ? t(topic.nameKey) : topic.name}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {topic.gradeName}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {topic.subjectName}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {t(`topic_type_${topic.topicType}`)}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {topic.descKey ? t(topic.descKey) : topic.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/subjects/${topic.subjectId}/${topic.id}?grade=${topic.gradeId}`} className="w-full">
                        <Button className="w-full">{t("start_learning")}</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Topic Grid - Grade View */}
            <TabsContent value="grade" className="mt-0">
              <div className="space-y-8">
                {grades.map((grade) => {
                  const gradeTopics = filteredTopics.filter((topic) => topic.gradeId === grade.id)
                  if (gradeTopics.length === 0) return null

                  return (
                    <div key={grade.id} className="space-y-4">
                      <h2 className="text-2xl font-bold">{grade.nameKey ? t(grade.nameKey) : grade.name}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gradeTopics.map((topic) => (
                          <Card
                            key={`${grade.id}-${topic.id}`}
                            className="overflow-hidden hover:border-pink-300 transition-colors"
                          >
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl">{topic.icon}</span>
                                  <CardTitle className="text-lg">
                                    {topic.nameKey ? t(topic.nameKey) : topic.name}
                                  </CardTitle>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" />
                                  {topic.subjectName}
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Tag className="h-3 w-3" />
                                  {t(`topic_type_${topic.topicType}`)}
                                </Badge>
                              </div>
                              <CardDescription className="line-clamp-2">
                                {topic.descKey ? t(topic.descKey) : topic.description}
                              </CardDescription>
                            </CardContent>
                            <CardFooter>
                              <Link
                                href={`/subjects/${topic.subjectId}/${topic.id}?grade=${topic.gradeId}`}
                                className="w-full"
                              >
                                <Button className="w-full">{t("start_learning")}</Button>
                              </Link>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Curated Collections */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold">{t("curated_collections")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collections.map((collection) => (
                <Card key={collection.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-xl font-bold">{collection.name}</h3>
                        <p className="text-sm text-white/80">{collection.description}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {collection.topics.slice(0, 4).map((topic) => (
                        <Badge key={`${topic.gradeId}-${topic.id}`} variant="outline">
                          {topic.nameKey ? t(topic.nameKey) : topic.name}
                        </Badge>
                      ))}
                      {collection.topics.length > 4 && (
                        <Badge variant="outline">
                          +{collection.topics.length - 4} {t("more")}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      {t("explore_collection")}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Sample data for subjects
const subjects = [
  {
    id: "mathematics",
    nameKey: "mathematics_name",
    name: "Mathematics",
    descKey: "mathematics_desc",
    description: "Learn mathematics concepts from counting to algebra.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "english",
    nameKey: "english_name",
    name: "English",
    descKey: "english_desc",
    description: "Develop reading, writing, and language skills.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "science",
    nameKey: "science_name",
    name: "Science",
    descKey: "science_desc",
    description: "Explore the natural world through scientific inquiry.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "coding",
    nameKey: "coding_name",
    name: "Coding",
    descKey: "coding_desc",
    description: "Learn programming concepts and computational thinking.",
    image: "/placeholder.svg?height=200&width=400",
  },
]

// Sample data for grades
const grades = [
  {
    id: "grade1",
    nameKey: "grade1_name",
    name: "Grade 1",
    descKey: "grade1_desc",
    description: "Basic number sense, counting, addition and subtraction within 20.",
    difficulty: "beginner",
    image: "/placeholder.svg?height=160&width=320",
    subjects: [{ id: "mathematics" }, { id: "english" }, { id: "science" }],
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
          "Counting is one of the first math skills children learn. It involves assigning a number to each object in a group, one by one, to determine the total quantity.",
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Introduction to Counting",
        examples: [
          {
            question: "How do we count a group of 5 apples?",
            solution: 'Point to each apple one by one while saying: "1, 2, 3, 4, 5". The total number of apples is 5.',
          },
        ],
        exercises: [
          {
            question: "Count the apples. How many are there?",
            image: "/placeholder.svg?height=200&width=400",
            answers: ["5", "6", "7", "8"],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: "addition",
        nameKey: "addition_name",
        name: "Addition within 10",
        descKey: "addition_desc",
        icon: "➕",
        progress: 30,
        title: "Learning Addition within 10",
        description:
          "Addition is the process of combining two or more numbers to find their total. When we add numbers, we are finding out how many items we have in all.",
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Introduction to Addition",
        exercises: [
          {
            question: "What is 3 + 4?",
            answers: ["6", "7", "8", "5"],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: "subtraction",
        nameKey: "subtraction_name",
        name: "Subtraction within 10",
        descKey: "subtraction_desc",
        icon: "➖",
        progress: 0,
        title: "Understanding Subtraction within 10",
        description:
          "Subtraction is the process of taking away or removing a number from another number. It's the opposite of addition.",
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Introduction to Subtraction",
        exercises: [
          {
            question: "What is 7 - 3?",
            answers: ["3", "4", "5", "2"],
            correctAnswer: 1,
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
    description: "Addition and subtraction within 100, introduction to multiplication.",
    difficulty: "beginner",
    image: "/placeholder.svg?height=160&width=320",
    subjects: [{ id: "mathematics" }, { id: "english" }, { id: "science" }],
    topics: [
      {
        id: "addition2",
        nameKey: "addition2_name",
        name: "Addition within 100",
        descKey: "addition2_desc",
        icon: "➕",
        progress: 50,
        title: "Addition with Two-Digit Numbers",
        description:
          "Adding two-digit numbers builds on your understanding of basic addition. When adding larger numbers, we can break them down into tens and ones to make the process easier.",
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Adding Two-Digit Numbers",
        exercises: [
          {
            question: "What is 25 + 13?",
            answers: ["38", "37", "28", "35"],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: "subtraction2",
        nameKey: "subtraction2_name",
        name: "Subtraction within 100",
        descKey: "subtraction2_desc",
        icon: "➖",
        progress: 25,
        title: "Subtraction with Two-Digit Numbers",
        description:
          "Subtracting two-digit numbers builds on your understanding of basic subtraction. Similar to addition, we can break down larger numbers into tens and ones to make subtraction easier.",
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Subtracting Two-Digit Numbers",
        exercises: [
          {
            question: "What is 57 - 24?",
            answers: ["33", "23", "43", "13"],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: "intro-multiplication",
        nameKey: "intro_multiplication_name",
        name: "Introduction to Multiplication",
        descKey: "intro_multiplication_desc",
        icon: "✖️",
        progress: 0,
        title: "Introduction to Multiplication",
        description:
          "Multiplication is a mathematical operation that represents repeated addition of the same number. It's a faster way to add the same number multiple times.",
        videoUrl: "/placeholder-video.mp4",
        videoTitle: "Understanding Multiplication",
        exercises: [
          {
            question: "What is 3 × 4?",
            image: "/placeholder.svg?height=200&width=400",
            answers: ["7", "10", "12", "15"],
            correctAnswer: 2,
          },
        ],
      },
    ],
  },
]
