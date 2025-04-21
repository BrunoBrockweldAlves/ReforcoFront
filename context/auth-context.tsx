"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  favorites: string[]
  achievements: Achievement[]
  progress: {
    [key: string]: {
      grade: string
      topic: string
      completed: boolean
      score: number
      lastAccessed: string
    }
  }
}

export type Achievement = {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  resetPassword: (email: string) => Promise<void>
  addToFavorites: (topicId: string) => void
  removeFromFavorites: (topicId: string) => void
  resetProgress: (gradeId?: string, topicId?: string) => Promise<{ success: boolean; backup: any }>
  restoreProgress: (backup: any) => void
  updateProgress: (gradeId: string, topicId: string, score: number, completed: boolean) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  resetPassword: async () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  resetProgress: async () => ({ success: false, backup: null }),
  restoreProgress: () => {},
  updateProgress: () => {},
})

// Mock achievements
const defaultAchievements: Achievement[] = [
  {
    id: "first-login",
    title: "First Steps",
    description: "Logged in for the first time",
    icon: "🎉",
    unlocked: true,
    unlockedAt: new Date().toISOString(),
  },
  {
    id: "complete-topic",
    title: "Topic Master",
    description: "Completed your first topic",
    icon: "🏆",
    unlocked: false,
  },
  {
    id: "perfect-score",
    title: "Perfect Score",
    description: "Got 100% on a topic",
    icon: "⭐",
    unlocked: false,
  },
  {
    id: "five-topics",
    title: "Knowledge Seeker",
    description: "Completed 5 different topics",
    icon: "📚",
    unlocked: false,
  },
  {
    id: "all-math-grade1",
    title: "Math Wizard: Grade 1",
    description: "Completed all Grade 1 Math topics",
    icon: "🧙",
    unlocked: false,
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user])

  // Update the login function to accept "admin" credentials
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock login - allow "admin" credentials for demo purposes
    if (email === "admin" && password === "admin") {
      const adminUser: User = {
        id: "admin-user",
        name: "Admin User",
        email: "admin@example.com",
        favorites: ["grade1-mathematics-counting", "grade2-science-plants", "grade3-english-grammar"],
        achievements: [...defaultAchievements],
        progress: {
          "grade1-mathematics-counting": {
            grade: "grade1",
            topic: "counting",
            completed: true,
            score: 90,
            lastAccessed: new Date().toISOString(),
          },
          "grade2-mathematics-addition2": {
            grade: "grade2",
            topic: "addition2",
            completed: false,
            score: 60,
            lastAccessed: new Date().toISOString(),
          },
          "grade3-fractions": {
            grade: "grade3",
            topic: "fractions",
            completed: false,
            score: 30,
            lastAccessed: new Date().toISOString(),
          },
        },
      }
      setUser(adminUser)
      router.push("/dashboard")
      setIsLoading(false)
      return
    }

    // Check if the email exists in localStorage
    const storedUser = localStorage.getItem("user")

    if (storedUser && JSON.parse(storedUser).email === email) {
      setUser(JSON.parse(storedUser))
      router.push("/dashboard")
    } else {
      // Create a new user if not found (for demo purposes)
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: email.split("@")[0],
        email,
        favorites: [],
        achievements: [...defaultAchievements],
        progress: {},
      }
      setUser(newUser)
      router.push("/dashboard")
    }

    setIsLoading(false)
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      favorites: [],
      achievements: [...defaultAchievements],
      progress: {},
    }

    setUser(newUser)
    router.push("/dashboard")
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  const resetPassword = async (email: string) => {
    // In a real app, this would send a password reset email
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // For demo purposes, we'll just log a message
    console.log(`Password reset email sent to ${email}`)
  }

  const addToFavorites = (topicId: string) => {
    if (!user) return

    if (!user.favorites.includes(topicId)) {
      const updatedUser = {
        ...user,
        favorites: [...user.favorites, topicId],
      }
      setUser(updatedUser)
    }
  }

  const removeFromFavorites = (topicId: string) => {
    if (!user) return

    const updatedUser = {
      ...user,
      favorites: user.favorites.filter((id) => id !== topicId),
    }
    setUser(updatedUser)
  }

  const resetProgress = async (gradeId?: string, topicId?: string): Promise<{ success: boolean; backup: any }> => {
    if (!user) return { success: false, backup: null }

    // Create a backup of the current progress
    const backup = { ...user.progress }

    // If both gradeId and topicId are provided, reset only that specific topic
    if (gradeId && topicId) {
      const progressKey = `${gradeId}-${topicId}`
      const updatedProgress = { ...user.progress }
      delete updatedProgress[progressKey]

      setUser({
        ...user,
        progress: updatedProgress,
      })

      return { success: true, backup }
    }

    // If only gradeId is provided, reset all topics for that grade
    if (gradeId) {
      const updatedProgress = { ...user.progress }

      Object.keys(updatedProgress).forEach((key) => {
        if (key.startsWith(`${gradeId}-`)) {
          delete updatedProgress[key]
        }
      })

      setUser({
        ...user,
        progress: updatedProgress,
      })

      return { success: true, backup }
    }

    // If neither is provided, reset all progress
    setUser({
      ...user,
      progress: {},
    })

    return { success: true, backup }
  }

  const restoreProgress = (backup: any) => {
    if (!user || !backup) return

    setUser({
      ...user,
      progress: backup,
    })
  }

  const updateProgress = (gradeId: string, topicId: string, score: number, completed: boolean) => {
    if (!user) return

    const progressKey = `${gradeId}-${topicId}`
    const updatedProgress = { ...user.progress }

    updatedProgress[progressKey] = {
      grade: gradeId,
      topic: topicId,
      completed,
      score,
      lastAccessed: new Date().toISOString(),
    }

    // Check if we need to unlock any achievements
    const updatedAchievements = [...user.achievements]

    // Check for "Topic Master" achievement
    if (completed && !user.achievements.find((a) => a.id === "complete-topic")?.unlocked) {
      const index = updatedAchievements.findIndex((a) => a.id === "complete-topic")
      if (index !== -1) {
        updatedAchievements[index] = {
          ...updatedAchievements[index],
          unlocked: true,
          unlockedAt: new Date().toISOString(),
        }
      }
    }

    // Check for "Perfect Score" achievement
    if (score === 100 && !user.achievements.find((a) => a.id === "perfect-score")?.unlocked) {
      const index = updatedAchievements.findIndex((a) => a.id === "perfect-score")
      if (index !== -1) {
        updatedAchievements[index] = {
          ...updatedAchievements[index],
          unlocked: true,
          unlockedAt: new Date().toISOString(),
        }
      }
    }

    // Check for "Knowledge Seeker" achievement (5 topics)
    const completedTopics = Object.values(updatedProgress).filter((p) => p.completed)
    if (completedTopics.length >= 5 && !user.achievements.find((a) => a.id === "five-topics")?.unlocked) {
      const index = updatedAchievements.findIndex((a) => a.id === "five-topics")
      if (index !== -1) {
        updatedAchievements[index] = {
          ...updatedAchievements[index],
          unlocked: true,
          unlockedAt: new Date().toISOString(),
        }
      }
    }

    setUser({
      ...user,
      progress: updatedProgress,
      achievements: updatedAchievements,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        resetPassword,
        addToFavorites,
        removeFromFavorites,
        resetProgress,
        restoreProgress,
        updateProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
