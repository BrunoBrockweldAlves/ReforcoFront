"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { grades } from "@/data/mathematics";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ExercisePageProps {
	selectedGrade: string;
	selectedTopic: string;
	onBack: () => void;
}

export function ExercisePage({
	selectedGrade,
	selectedTopic,
	onBack,
}: ExercisePageProps) {
	const { t } = useLanguage();
	const [currentExercise, setCurrentExercise] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showExplanation, setShowExplanation] = useState(false);

	const grade = grades.find((g) => g.id === selectedGrade);
	const topic = grade?.topics.find((t) => t.id === selectedTopic);

	if (!grade || !topic) return null;

	const exercise = topic.exercises[currentExercise];
	const isLastExercise = currentExercise === topic.exercises.length - 1;
	const progress = ((currentExercise + 1) / topic.exercises.length) * 100;

	const handleAnswerSelect = (index: number) => {
		if (selectedAnswer !== null) return;
		setSelectedAnswer(index);
		setShowExplanation(true);
	};

	const handleNext = () => {
		if (isLastExercise) {
			onBack();
		} else {
			setCurrentExercise((prev) => prev + 1);
			setSelectedAnswer(null);
			setShowExplanation(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					onClick={onBack}>
					<ArrowLeft className="h-4 w-4 mr-2" />
					{t("back")}
				</Button>
				<div>
					<h1 className="text-3xl font-bold tracking-tighter">
						{t(topic.nameKey)}
					</h1>
					<p className="text-muted-foreground">
						{t("exercise")} {currentExercise + 1} {t("of")}{" "}
						{topic.exercises.length}
					</p>
				</div>
			</div>

			<Progress
				value={progress}
				className="w-full"
			/>

			<Card className="max-w-2xl mx-auto">
				<CardHeader>
					<CardTitle className="text-xl">{exercise.question}</CardTitle>
				</CardHeader>
				{exercise.image && (
					<div className="relative h-48 mx-6">
						<Image
							src={exercise.image}
							alt={exercise.question}
							fill
							className="object-contain"
						/>
					</div>
				)}
				<CardContent className="space-y-4">
					<div className="grid gap-3">
						{exercise.answers.map((answer, index) => (
							<Button
								key={index}
								variant={
									selectedAnswer === null
										? "outline"
										: selectedAnswer === index
										? index === exercise.correctAnswer
											? "secondary"
											: "destructive"
										: index === exercise.correctAnswer
										? "secondary"
										: "outline"
								}
								className={`justify-start h-auto py-4 px-6 ${
									selectedAnswer !== null && index === exercise.correctAnswer
										? "bg-green-100"
										: ""
								}`}
								onClick={() => handleAnswerSelect(index)}>
								<span className="mr-2">{String.fromCharCode(65 + index)}.</span>
								{answer}
								{selectedAnswer !== null &&
									index === exercise.correctAnswer && (
										<CheckCircle2 className="ml-auto h-5 w-5 text-green-600" />
									)}
								{selectedAnswer === index &&
									index !== exercise.correctAnswer && (
										<XCircle className="ml-auto h-5 w-5 text-red-600" />
									)}
							</Button>
						))}
					</div>

					{showExplanation && (
						<CardDescription className="mt-4 p-4 bg-muted rounded-lg">
							{exercise.explanation}
						</CardDescription>
					)}

					{selectedAnswer !== null && (
						<div className="flex justify-end">
							<Button onClick={handleNext}>
								{isLastExercise ? t("finish") : t("next")}
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
