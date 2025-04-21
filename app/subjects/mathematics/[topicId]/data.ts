// Create a shared data file to ensure consistency across all topic pages
export const grades = [
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
        videoId: "DR-cfDsHCGA", // YouTube Kids video ID for counting
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
            id: "counting-1",
            question: "Count the apples. How many are there?",
            image: "/placeholder.svg?height=200&width=400",
            answers: ["5", "6", "7", "8"],
            correctAnswer: 2,
            explanation: "There are 7 apples in the image. You can count them one by one.",
            difficulty: "easy",
            category: "visual-counting",
            translations: {
              "pt-BR": {
                question: "Conte as maçãs. Quantas existem?",
                answers: ["5", "6", "7", "8"],
                explanation: "Existem 7 maçãs na imagem. Você pode contá-las uma a uma.",
              },
            },
          },
          {
            id: "counting-2",
            question: "What number comes after 9?",
            answers: ["8", "10", "11", "7"],
            correctAnswer: 1,
            explanation: "In the number sequence, 10 comes right after 9.",
            difficulty: "easy",
            category: "number-sequence",
            translations: {
              "pt-BR": {
                question: "Qual número vem depois do 9?",
                answers: ["8", "10", "11", "7"],
                explanation: "Na sequência numérica, o 10 vem logo após o 9.",
              },
            },
          },
          {
            id: "counting-3",
            question: "Count by 2s: 2, 4, 6, __, 10",
            answers: ["7", "8", "9", "12"],
            correctAnswer: 1,
            explanation: "When counting by 2s, we add 2 each time. After 6, we add 2 to get 8.",
            difficulty: "medium",
            category: "skip-counting",
            translations: {
              "pt-BR": {
                question: "Conte de 2 em 2: 2, 4, 6, __, 10",
                answers: ["7", "8", "9", "12"],
                explanation:
                  "Quando contamos de 2 em 2, adicionamos 2 cada vez. Depois do 6, adicionamos 2 para obter 8.",
              },
            },
          },
          {
            id: "counting-4",
            question: "How many fingers do you have on both hands?",
            answers: ["8", "9", "10", "12"],
            correctAnswer: 2,
            explanation: "You have 5 fingers on each hand, so 5 + 5 = 10 fingers total.",
            difficulty: "easy",
            category: "real-life-counting",
            translations: {
              "pt-BR": {
                question: "Quantos dedos você tem nas duas mãos?",
                answers: ["8", "9", "10", "12"],
                explanation: "Você tem 5 dedos em cada mão, então 5 + 5 = 10 dedos no total.",
              },
            },
          },
          {
            id: "counting-5",
            question: "What number is 3 more than 7?",
            answers: ["9", "10", "11", "12"],
            correctAnswer: 1,
            explanation: "To find 3 more than 7, we add 3 to 7: 7 + 3 = 10.",
            difficulty: "medium",
            category: "addition-counting",
            translations: {
              "pt-BR": {
                question: "Que número é 3 a mais que 7?",
                answers: ["9", "10", "11", "12"],
                explanation: "Para encontrar 3 a mais que 7, adicionamos 3 a 7: 7 + 3 = 10.",
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
        icon: "➕",
        progress: 30,
        title: "Learning Addition within 10",
        description:
          "Addition is the process of combining two or more numbers to find their total. When we add numbers, we are finding out how many items we have in all.\n\nAddition is one of the fundamental operations in mathematics. It helps us solve many real-life problems, like figuring out how many toys we have in total or how much money we have saved.\n\nWhen we add numbers, we use the plus sign (+) and the equals sign (=). For example, 3 + 4 = 7 means that when we combine 3 items and 4 items, we have 7 items in total.",
        videoId: "AuX7nPBqDts", // YouTube Kids video ID for addition
        videoTitle: "Introduction to Addition",
        examples: [
          {
            question: "How do we add 2 + 3?",
            solution:
              "We can count 2 objects, then count 3 more objects, and then count all the objects together: 1, 2, 3, 4, 5. So 2 + 3 = 5.",
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
              "Adição é o processo de combinar dois ou mais números para encontrar o total. Quando adicionamos números, estamos descobrindo quantos itens temos no total.\n\nAdição é uma das operações fundamentais da matemática. Ela nos ajuda a resolver muitos problemas da vida real, como descobrir quantos brinquedos temos no total ou quanto dinheiro economizamos.\n\nQuando adicionamos números, usamos o sinal de mais (+) e o sinal de igual (=). Por exemplo, 3 + 4 = 7 significa que quando combinamos 3 itens e 4 itens, temos 7 itens no total.",
            videoTitle: "Introdução à Adição",
          },
        },
        exercises: [
          {
            id: "addition-1",
            question: "What is 3 + 4?",
            answers: ["6", "7", "8", "5"],
            correctAnswer: 1,
            explanation: "To find 3 + 4, you can count 3 objects and then 4 more, giving you 7 total.",
            difficulty: "easy",
            category: "basic-addition",
            translations: {
              "pt-BR": {
                question: "Quanto é 3 + 4?",
                answers: ["6", "7", "8", "5"],
                explanation: "Para encontrar 3 + 4, você pode contar 3 objetos e depois mais 4, dando um total de 7.",
              },
            },
          },
          {
            id: "addition-2",
            question: "What is 2 + 5?",
            answers: ["5", "6", "7", "8"],
            correctAnswer: 2,
            explanation: "2 + 5 = 7. You can count up from 2: 3, 4, 5, 6, 7.",
            difficulty: "easy",
            category: "basic-addition",
            translations: {
              "pt-BR": {
                question: "Quanto é 2 + 5?",
                answers: ["5", "6", "7", "8"],
                explanation: "2 + 5 = 7. Você pode contar a partir de 2: 3, 4, 5, 6, 7.",
              },
            },
          },
          {
            id: "addition-3",
            question: "If you have 4 apples and get 3 more, how many do you have now?",
            image: "/placeholder.svg?height=200&width=400",
            answers: ["6", "7", "8", "5"],
            correctAnswer: 1,
            explanation: "You start with 4 apples and get 3 more, so 4 + 3 = 7 apples total.",
            difficulty: "easy",
            category: "word-problem",
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
        icon: "➖",
        progress: 0,
        title: "Understanding Subtraction within 10",
        description:
          "Subtraction is the process of taking away or removing a number from another number. It's the opposite of addition.\n\nWhen we subtract, we use the minus sign (-) and the equals sign (=). For example, 7 - 3 = 4 means that when we take away 3 from 7, we have 4 left.\n\nSubtraction helps us solve many real-life problems, like figuring out how many cookies are left after eating some or how much money we have left after spending some.",
        videoId: "GdXClek-05I", // YouTube Kids video ID for subtraction
        videoTitle: "Introduction to Subtraction",
        examples: [
          {
            question: "How do we subtract 5 - 2?",
            solution: "We start with 5 objects and take away 2 of them. We are left with 3 objects. So 5 - 2 = 3.",
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
              "Subtração é o processo de tirar ou remover um número de outro número. É o oposto da adição.\n\nQuando subtraímos, usamos o sinal de menos (-) e o sinal de igual (=). Por exemplo, 7 - 3 = 4 significa que quando tiramos 3 de 7, temos 4 restantes.\n\nA subtração nos ajuda a resolver muitos problemas da vida real, como descobrir quantos biscoitos sobraram depois de comer alguns ou quanto dinheiro temos depois de gastar um pouco.",
            videoTitle: "Introdução à Subtração",
          },
        },
        exercises: [
          {
            id: "subtraction-1",
            question: "What is 7 - 3?",
            answers: ["3", "4", "5", "2"],
            correctAnswer: 1,
            explanation: "To find 7 - 3, you start with 7 and take away 3, leaving you with 4.",
            difficulty: "easy",
            category: "basic-subtraction",
            translations: {
              "pt-BR": {
                question: "Quanto é 7 - 3?",
                answers: ["3", "4", "5", "2"],
                explanation: "Para encontrar 7 - 3, você começa com 7 e retira 3, ficando com 4.",
              },
            },
          },
          {
            id: "subtraction-2",
            question: "If you have 8 candies and eat 5, how many do you have left?",
            image: "/placeholder.svg?height=200&width=400",
            answers: ["2", "3", "4", "5"],
            correctAnswer: 1,
            explanation: "You start with 8 candies and eat 5, so 8 - 5 = 3 candies left.",
            difficulty: "easy",
            category: "word-problem",
            translations: {
              "pt-BR": {
                question: "Se você tem 8 doces e come 5, quantos sobram?",
                answers: ["2", "3", "4", "5"],
                explanation: "Você começa com 8 doces e come 5, então 8 - 5 = 3 doces restantes.",
              },
            },
          },
          {
            id: "subtraction-3",
            question: "What is 6 - 2?",
            answers: ["2", "3", "4", "5"],
            correctAnswer: 2,
            explanation: "6 - 2 = 4. You can count down from 6: 5, 4.",
            difficulty: "easy",
            category: "basic-subtraction",
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
  // Other grades...
]
