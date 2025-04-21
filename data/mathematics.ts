export interface Exercise {
	question: string;
	image?: string;
	answers: string[];
	correctAnswer: number;
	explanation: string;
	translations: {
		[key: string]: {
			question: string;
			answers: string[];
			explanation: string;
		};
	};
}

export interface Topic {
	id: string;
	nameKey: string;
	name: string;
	descKey: string;
	description: string;
	icon: string;
	progress: number;
	exercises: Exercise[];
}

export interface Grade {
	id: string;
	nameKey: string;
	name: string;
	descKey: string;
	description: string;
	difficulty: "beginner" | "intermediate" | "advanced";
	image: string;
	topics: Topic[];
}

export const grades: Grade[] = [
	{
		id: "grade1",
		nameKey: "grade1_name",
		name: "Grade 1 Mathematics",
		descKey: "grade1_desc",
		description:
			"Basic number sense, counting, addition and subtraction within 20.",
		difficulty: "beginner",
		image: "/placeholder.svg?height=160&width=320",
		topics: [
			{
				id: "counting",
				nameKey: "counting_name",
				name: "Counting and Numbers",
				descKey: "counting_desc",
				description:
					"Learn to count objects and recognize numbers from 1 to 20.",
				icon: "🔢",
				progress: 75,
				exercises: [
					{
						question: "Count the apples. How many are there?",
						image: "/placeholder.svg?height=200&width=400",
						answers: ["5", "6", "7", "8"],
						correctAnswer: 2,
						explanation:
							"There are 7 apples in the image. You can count them one by one.",
						translations: {
							"pt-BR": {
								question: "Conte as maçãs. Quantas existem?",
								answers: ["5", "6", "7", "8"],
								explanation:
									"Existem 7 maçãs na imagem. Você pode contá-las uma a uma.",
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
						explanation:
							"When counting by 2s, we add 2 each time. After 6, we add 2 to get 8.",
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
						explanation:
							"To find 3 + 4, you can count 3 objects and then 4 more, giving you 7 total.",
						translations: {
							"pt-BR": {
								question: "Quanto é 3 + 4?",
								answers: ["6", "7", "8", "5"],
								explanation:
									"Para encontrar 3 + 4, você pode contar 3 objetos e depois mais 4, dando um total de 7.",
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
								explanation:
									"2 + 5 = 7. Você pode contar a partir de 2: 3, 4, 5, 6, 7.",
							},
						},
					},
					{
						question:
							"If you have 4 apples and get 3 more, how many do you have now?",
						image: "/placeholder.svg?height=200&width=400",
						answers: ["6", "7", "8", "5"],
						correctAnswer: 1,
						explanation:
							"You start with 4 apples and get 3 more, so 4 + 3 = 7 apples total.",
						translations: {
							"pt-BR": {
								question:
									"Se você tem 4 maçãs e ganha mais 3, quantas você tem agora?",
								answers: ["6", "7", "8", "5"],
								explanation:
									"Você começa com 4 maçãs e ganha mais 3, então 4 + 3 = 7 maçãs no total.",
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
						explanation:
							"To find 7 - 3, you start with 7 and take away 3, leaving you with 4.",
						translations: {
							"pt-BR": {
								question: "Quanto é 7 - 3?",
								answers: ["3", "4", "5", "2"],
								explanation:
									"Para encontrar 7 - 3, você começa com 7 e retira 3, ficando com 4.",
							},
						},
					},
					{
						question:
							"If you have 8 candies and eat 5, how many do you have left?",
						image: "/placeholder.svg?height=200&width=400",
						answers: ["2", "3", "4", "5"],
						correctAnswer: 1,
						explanation:
							"You start with 8 candies and eat 5, so 8 - 5 = 3 candies left.",
						translations: {
							"pt-BR": {
								question: "Se você tem 8 doces e come 5, quantos sobram?",
								answers: ["2", "3", "4", "5"],
								explanation:
									"Você começa com 8 doces e come 5, então 8 - 5 = 3 doces restantes.",
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
								explanation:
									"6 - 2 = 4. Você pode contar regressivamente a partir de 6: 5, 4.",
							},
						},
					},
				],
			},
		],
	},
	// ... Add the rest of the grades data here
];
