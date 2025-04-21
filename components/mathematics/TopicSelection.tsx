"use client";

import { useLanguage } from "@/context/language-context";
import { TopicCard } from "./TopicCard";
import { grades } from "@/data/mathematics";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface TopicSelectionProps {
	selectedGrade: string;
	onSelectTopic: (topic: string) => void;
	onBack: () => void;
}

export function TopicSelection({
	selectedGrade,
	onSelectTopic,
	onBack,
}: TopicSelectionProps) {
	const { t } = useLanguage();
	const grade = grades.find((g) => g.id === selectedGrade);

	if (!grade) return null;

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
						{t(grade.nameKey)}
					</h1>
					<p className="text-muted-foreground">{t("select_topic")}</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{grade.topics.map((topic) => (
					<TopicCard
						key={topic.id}
						topic={topic}
						onSelect={onSelectTopic}
					/>
				))}
			</div>
		</div>
	);
}
