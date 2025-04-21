"use client";

import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Grade {
	id: string;
	nameKey: string;
	name: string;
	descKey: string;
	description: string;
	difficulty: "beginner" | "intermediate" | "advanced";
	image: string;
}

interface GradeCardProps {
	grade: Grade;
	onSelect: (grade: string) => void;
}

export function GradeCard({ grade, onSelect }: GradeCardProps) {
	const { t } = useLanguage();

	return (
		<Card className="overflow-hidden">
			<CardHeader className="relative h-48">
				<Image
					src={grade.image}
					alt={t(grade.nameKey)}
					fill
					className="object-cover"
					priority
				/>
			</CardHeader>
			<CardContent className="space-y-4 p-6">
				<div>
					<CardTitle className="mb-2">{t(grade.nameKey)}</CardTitle>
					<CardDescription>{t(grade.descKey)}</CardDescription>
				</div>
				<div className="flex items-center justify-between">
					<span
						className={`text-sm font-medium ${
							grade.difficulty === "beginner"
								? "text-green-600"
								: grade.difficulty === "intermediate"
								? "text-yellow-600"
								: "text-red-600"
						}`}>
						{t(grade.difficulty)}
					</span>
					<Button
						variant="ghost"
						onClick={() => onSelect(grade.id)}>
						{t("start_learning")} <ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
