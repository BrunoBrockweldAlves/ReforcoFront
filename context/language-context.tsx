"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type LanguageContextType = {
  language: string
  setLanguage: (language: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState("en")

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language
      if (browserLang.startsWith("pt")) {
        setLanguageState("pt-BR")
      }
    }
  }, [])

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Translation function
  const t = (key: string) => {
    const translation = translations[language] || translations.en
    return translation[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)

// Add new translations for topic description page
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    subjects: "Subjects",
    how_it_works: "How It Works",
    about: "About",
    contact: "Contact",
    grades: "Grades",
    profile: "Profile",
    dashboard: "Dashboard",
    logout: "Logout",
    login: "Login",
    signup: "Sign Up",

    // Topic description page
    topic_description: "Topic Description",
    examples: "Examples",
    video_lesson: "Video Lesson",
    click_to_play_video: "Click to play video",
    practice_exercises: "Practice Exercises",
    practice_description: "Test your understanding with these exercises",
    total: "total",
    start_exercises: "Start Exercises",
    continue_exercises: "Continue Exercises",
    back_to_topic: "Back to Topic",
    return_to_topic: "Return to Topic",
    next_exercise: "Next Exercise",

    // Login page
    welcome_to: "Welcome to",
    login_subtitle: "Sign in to your account to continue your learning journey",
    email: "Email",
    password: "Password",
    forgot_password: "Forgot password?",
    your_name: "Your name",
    password_requirements: "Password must be at least 6 characters long",
    logging_in: "Logging in...",
    signing_up: "Signing up...",
    sending: "Sending...",
    send_reset_link: "Send Reset Link",
    back_to_login: "Back to Login",
    continue_without_account: "Don't have an account yet?",
    explore_as_guest: "Explore as guest",
    fill_all_fields: "Please fill in all fields",
    login_error: "Login failed. Please check your credentials.",
    signup_error: "Signup failed. Please try again.",
    password_too_short: "Password must be at least 6 characters long",
    enter_email: "Please enter your email",
    reset_email_sent: "Password reset email has been sent",
    reset_error: "Failed to send reset email. Please try again.",
    name: "Name",
    or_continue_with: "Or continue with",
    or_signup_with: "Or sign up with",

    // Homepage
    hero_title: "Fun Learning Journey For Your Child",
    hero_description:
      "Interactive online learning that makes education enjoyable and effective. Help your child excel in their studies.",
    explore_subjects: "Explore Subjects",
    explore_grades: "Explore Grades",
    why_choose_us: "Why Choose Us?",
    platform_description: "Our platform is designed to make learning fun and effective for children of all ages.",
    expert_content: "Expert Content",
    expert_content_desc: "Curriculum designed by experienced educators with years of teaching experience.",
    interactive_learning: "Interactive Learning",
    interactive_learning_desc: "Engaging activities and exercises that make learning fun and effective.",
    comprehensive_topics: "Comprehensive Topics",
    comprehensive_topics_desc: "Wide range of subjects and topics covering the full curriculum.",
    learn_at_your_pace: "Learn at Your Pace",
    learn_at_your_pace_desc: "Self-paced learning that adapts to each child's individual needs.",
    popular_subjects: "Popular Subjects",
    popular_subjects_desc: "Explore our wide range of subjects designed for effective learning.",
    learn_more: "Learn More",
    view_all_subjects: "View All Subjects",
    browse_by_grade: "Browse by Grade",
    how_it_works_title: "How It Works",
    how_it_works_desc: "Our platform makes learning simple, engaging, and effective.",
    step1_title: "Choose a Subject",
    step1_desc: "Browse our wide range of subjects and select the one you want to learn.",
    step2_title: "Select Your Grade",
    step2_desc: "Pick the appropriate grade level for your learning needs.",
    step3_title: "Start Learning",
    step3_desc: "Dive into interactive lessons, exercises, and track your progress.",
    cta_title: "Ready to Start Your Child's Learning Journey?",
    cta_desc: "Join thousands of happy children who are already benefiting from our free, open-source platform.",
    start_learning_now: "Start Learning Now",
    try_mathematics: "Try Mathematics",

    // Subjects page
    all_subjects: "All Subjects",
    choose_subject: "Choose a subject to start learning.",
    grade_levels: "grade levels",
    topics: "topics",
    explore: "Explore",

    // Mathematics page
    mathematics: "Mathematics",
    select_grade: "Select your grade level to begin learning mathematics.",
    back_to_grades: "Back to Grades",
    select_topic: "Select a topic to start learning.",
    progress: "Progress",
    exercises: "exercises",
    continue: "Continue",
    back_to_topics: "Back to Topics",
    exercise: "Exercise",
    of: "of",
    complete: "Complete",
    choose_answer: "Choose the correct answer",
    check_answer: "Check Answer",
    next_question: "Next Question",
    previous: "Previous",
    complete_btn: "Complete",
    correct: "Correct! Well done!",
    incorrect: "Incorrect. The correct answer is",
    topic_completed: "Topic Completed!",
    completed_message: "You've completed all exercises in this topic. Great job!",
    your_score: "Your score",
    return_to_topics: "Return to Topics",

    // Grades page
    all_grades: "All Grades",
    choose_grade: "Choose a grade to see all subjects for that level.",
    subjects: "subjects",

    // Profile page
    manage_your_account: "Manage your account and learning progress",
    account_info: "Account Information",
    edit_profile: "Edit Profile",
    achievements: "Achievements",
    unlocked: "unlocked",
    no_achievements_yet: "No achievements unlocked yet",
    view_all_achievements: "View All Achievements",
    progress_overview: "Progress Overview",
    completed_topics: "completed topics",
    in_progress_topics: "topics in progress",
    no_progress_yet: "No progress yet",
    reset_progress: "Reset Progress",
    reset_progress_warning: "This action cannot be undone. Your progress will be permanently deleted.",
    reset_type: "Reset Type",
    all_progress: "All Progress",
    specific_grade: "Specific Grade",
    specific_topic: "Specific Topic",
    cancel: "Cancel",
    confirm_reset: "Confirm Reset",
    resetting: "Resetting...",
    progress_reset: "Progress Reset",
    progress_reset_success: "Your progress has been reset successfully. You can restore it within the next 10 seconds.",
    restore_progress: "Restore Progress",
    favorites: "Favorites",
    favorite_topics: "Favorite Topics",
    no_favorites: "No favorite topics yet",
    continue_learning: "Continue Learning",
    your_progress: "Your Progress",
    score: "Score",
    last_accessed: "Last Accessed",
    review: "Review",
    unlocked_achievements: "Unlocked Achievements",
    locked_achievements: "Locked Achievements",
    unlocked_on: "Unlocked on",
    all_achievements_unlocked: "All achievements unlocked!",

    // Dashboard
    welcome_back: "Welcome back, {{name}}",
    learning_progress: "Learning Progress",
    topics_completed: "topics completed",
    achievements_unlocked: "achievements unlocked",
    learning_streak: "Learning Streak",
    days_in_a_row: "days in a row",
    recent_progress: "Recent Progress",
    continue_where_you_left_off: "Continue where you left off",
    view_all_progress: "View All Progress",
    recommended_for_you: "Recommended for You",
    based_on_your_interests: "Based on your interests and progress",
    start: "Start",
    explore_all_subjects: "Explore All Subjects",
    recent_achievements: "Recent Achievements",
    manage_favorites: "Manage Favorites",
    learning_path: "Learning Path",
    current_level: "Current Level",
    beginner: "Beginner",
    next_milestone: "Next Milestone",
    complete_5_topics: "Complete 5 topics",
    view_learning_path: "View Learning Path",

    // Footer
    all_rights_reserved: "All rights reserved.",
    terms: "Terms",
    privacy: "Privacy",

    // General
    loading: "Loading...",
    grade: "Grade",
    completed: "Completed",
    in_progress: "In Progress",

    // New translations
    take_exercises_to_practice: "Take some exercises to practice the concept below:",
  },
  "pt-BR": {
    // Navigation
    home: "Início",
    subjects: "Disciplinas",
    how_it_works: "Como Funciona",
    about: "Sobre",
    contact: "Contato",
    grades: "Séries",
    profile: "Perfil",
    dashboard: "Painel",
    logout: "Sair",
    login: "Entrar",
    signup: "Cadastrar",

    // Topic description page
    topic_description: "Descrição do Tópico",
    examples: "Exemplos",
    video_lesson: "Vídeo Aula",
    click_to_play_video: "Clique para reproduzir o vídeo",
    practice_exercises: "Exercícios Práticos",
    practice_description: "Teste seu entendimento com estes exercícios",
    total: "total",
    start_exercises: "Iniciar Exercícios",
    continue_exercises: "Continuar Exercícios",
    back_to_topic: "Voltar para o Tópico",
    return_to_topic: "Retornar ao Tópico",
    next_exercise: "Próximo Exercício",

    // Login page
    welcome_to: "Bem-vindo ao",
    login_subtitle: "Entre na sua conta para continuar sua jornada de aprendizado",
    email: "Email",
    password: "Senha",
    forgot_password: "Esqueceu a senha?",
    your_name: "Seu nome",
    password_requirements: "A senha deve ter pelo menos 6 caracteres",
    logging_in: "Entrando...",
    signing_up: "Cadastrando...",
    sending: "Enviando...",
    send_reset_link: "Enviar Link de Redefinição",
    back_to_login: "Voltar para Login",
    continue_without_account: "Ainda não tem uma conta?",
    explore_as_guest: "Explorar como convidado",
    fill_all_fields: "Por favor, preencha todos os campos",
    login_error: "Falha no login. Verifique suas credenciais.",
    signup_error: "Falha no cadastro. Por favor, tente novamente.",
    password_too_short: "A senha deve ter pelo menos 6 caracteres",
    enter_email: "Por favor, digite seu email",
    reset_email_sent: "Email de redefinição de senha foi enviado",
    reset_error: "Falha ao enviar email de redefinição. Por favor, tente novamente.",
    name: "Nome",
    or_continue_with: "Ou continue com",
    or_signup_with: "Ou cadastre-se com",

    // Homepage
    hero_title: "Uma Jornada de Aprendizado Divertida Para Seu Filho",
    hero_description:
      "Aprendizado online interativo que torna a educação agradável e eficaz. Ajude seu filho a se destacar nos estudos.",
    explore_subjects: "Explorar Disciplinas",
    explore_grades: "Explorar Séries",
    why_choose_us: "Por Que Nos Escolher?",
    platform_description:
      "Nossa plataforma foi projetada para tornar o aprendizado divertido e eficaz para crianças de todas as idades.",
    expert_content: "Conteúdo Especializado",
    expert_content_desc: "Currículo desenvolvido por educadores experientes com anos de experiência em ensino.",
    interactive_learning: "Aprendizado Interativo",
    interactive_learning_desc: "Atividades e exercícios envolventes que tornam o aprendizado divertido e eficaz.",
    comprehensive_topics: "Tópicos Abrangentes",
    comprehensive_topics_desc: "Ampla variedade de disciplinas e tópicos cobrindo todo o currículo.",
    learn_at_your_pace: "Aprenda no Seu Ritmo",
    learn_at_your_pace_desc:
      "Aprendizado no seu próprio ritmo que se adapta às necessidades individuais de cada criança.",
    popular_subjects: "Disciplinas Populares",
    popular_subjects_desc: "Explore nossa ampla variedade de disciplinas projetadas para um aprendizado eficaz.",
    learn_more: "Saiba Mais",
    view_all_subjects: "Ver Todas as Disciplinas",
    browse_by_grade: "Navegar por Série",
    how_it_works_title: "Como Funciona",
    how_it_works_desc: "Nossa plataforma torna o aprendizado simples, envolvente e eficaz.",
    step1_title: "Escolha uma Disciplina",
    step1_desc: "Navegue por nossa ampla variedade de disciplinas e selecione a que deseja aprender.",
    step2_title: "Selecione Sua Série",
    step2_desc: "Escolha o nível escolar apropriado para suas necessidades de aprendizado.",
    step3_title: "Comece a Aprender",
    step3_desc: "Mergulhe em lições interativas, exercícios e acompanhe seu progresso.",
    cta_title: "Pronto para Iniciar a Jornada de Aprendizado do Seu Filho?",
    cta_desc:
      "Junte-se a milhares de crianças felizes que já estão se beneficiando de nossa plataforma gratuita e de código aberto.",
    start_learning_now: "Comece a Aprender Agora",
    try_mathematics: "Experimente Matemática",

    // Subjects page
    all_subjects: "Todas as Disciplinas",
    choose_subject: "Escolha uma disciplina para começar a aprender.",
    grade_levels: "níveis escolares",
    topics: "tópicos",
    explore: "Explorar",

    // Mathematics page
    mathematics: "Matemática",
    select_grade: "Selecione seu nível escolar para começar a aprender matemática.",
    back_to_grades: "Voltar para Séries",
    select_topic: "Selecione um tópico para começar a aprender.",
    progress: "Progresso",
    exercises: "exercícios",
    continue: "Continuar",
    back_to_topics: "Voltar para Tópicos",
    exercise: "Exercício",
    of: "de",
    complete: "Completo",
    choose_answer: "Escolha a resposta correta",
    check_answer: "Verificar Resposta",
    next_question: "Próxima Questão",
    previous: "Anterior",
    complete_btn: "Concluir",
    correct: "Correto! Muito bem!",
    incorrect: "Incorreto. A resposta correta é",
    topic_completed: "Tópico Concluído!",
    completed_message: "Você completou todos os exercícios neste tópico. Ótimo trabalho!",
    your_score: "Sua pontuação",
    return_to_topics: "Voltar para Tópicos",

    // Grades page
    all_grades: "Todas as Séries",
    choose_grade: "Escolha uma série para ver todas as disciplinas desse nível.",
    subjects: "disciplinas",

    // Profile page
    manage_your_account: "Gerencie sua conta e progresso de aprendizado",
    account_info: "Informações da Conta",
    edit_profile: "Editar Perfil",
    achievements: "Conquistas",
    of: "de",
    unlocked: "desbloqueadas",
    no_achievements_yet: "Nenhuma conquista desbloqueada ainda",
    view_all_achievements: "Ver Todas as Conquistas",
    progress_overview: "Visão Geral do Progresso",
    completed_topics: "tópicos concluídos",
    in_progress_topics: "tópicos em andamento",
    no_progress_yet: "Nenhum progresso ainda",
    reset_progress: "Redefinir Progresso",
    reset_progress_warning: "Esta ação não pode ser desfeita. Seu progresso será excluído permanentemente.",
    reset_type: "Tipo de Redefinição",
    all_progress: "Todo o Progresso",
    specific_grade: "Série Específica",
    specific_topic: "Tópico Específico",
    select_grade: "Selecionar Série",
    select_topic: "Selecionar Tópico",
    cancel: "Cancelar",
    confirm_reset: "Confirmar Redefinição",
    resetting: "Redefinindo...",
    progress_reset: "Progresso Redefinido",
    progress_reset_success: "Seu progresso foi redefinido com sucesso. Você pode restaurá-lo nos próximos 10 segundos.",
    restore_progress: "Restaurar Progresso",
    favorites: "Favoritos",
    favorite_topics: "Tópicos Favoritos",
    no_favorites: "Nenhum tópico favorito ainda",
    continue_learning: "Continuar Aprendendo",
    your_progress: "Seu Progresso",
    score: "Pontuação",
    last_accessed: "Último Acesso",
    review: "Revisar",
    continue: "Continuar",
    unlocked_achievements: "Conquistas Desbloqueadas",
    locked_achievements: "Conquistas Bloqueadas",
    unlocked_on: "Desbloqueada em",
    all_achievements_unlocked: "Todas as conquistas desbloqueadas!",

    // Dashboard
    welcome_back: "Bem-vindo de volta, {{name}}",
    learning_progress: "Progresso de Aprendizado",
    topics_completed: "tópicos concluídos",
    achievements_unlocked: "conquistas desbloqueadas",
    learning_streak: "Sequência de Aprendizado",
    days_in_a_row: "dias consecutivos",
    recent_progress: "Progresso Recente",
    continue_where_you_left_off: "Continue de onde parou",
    view_all_progress: "Ver Todo o Progresso",
    recommended_for_you: "Recomendado para Você",
    based_on_your_interests: "Baseado em seus interesses e progresso",
    start: "Iniciar",
    explore_all_subjects: "Explorar Todas as Disciplinas",
    recent_achievements: "Conquistas Recentes",
    manage_favorites: "Gerenciar Favoritos",
    learning_path: "Caminho de Aprendizado",
    current_level: "Nível Atual",
    beginner: "Iniciante",
    next_milestone: "Próximo Marco",
    complete_5_topics: "Completar 5 tópicos",
    view_learning_path: "Ver Caminho de Aprendizado",

    // Footer
    all_rights_reserved: "Todos os direitos reservados.",
    terms: "Termos",
    privacy: "Privacidade",

    // General
    loading: "Carregando...",
    grade: "Série",
    completed: "Concluído",
    in_progress: "Em Andamento",

    // New translations
    take_exercises_to_practice: "Faça alguns exercícios para praticar o conceito abaixo:",
  },
}

