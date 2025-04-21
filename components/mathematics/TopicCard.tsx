"use client";

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
import { Progress } from "@/components/ui/progress";

interface Topic {
	id: string;
	nameKey: string;
	name: string;
	descKey: string;
	description: string;
	icon: string;
	progress: number;
	exercises: Array<{
		question: string;
		image?: string;
		answers: string[];
		correctAnswer: number;
		explanation: string;
	}>;
}

interface TopicCardProps {
	topic: Topic;
	onSelect: (topic: string) => void;
}

export function TopicCard({ topic, onSelect }: TopicCardProps) {
	const { t } = useLanguage();

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<span className="text-2xl">{topic.icon}</span>
					<CardTitle>{t(topic.nameKey)}</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<CardDescription>{t(topic.descKey)}</CardDescription>
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">{t("progress")}</span>
						<span className="font-medium">{topic.progress}%</span>
					</div>
					<Progress value={topic.progress} />
				</div>
				<div className="flex justify-end">
					<Button
						variant="ghost"
						onClick={() => onSelect(topic.id)}>
						{t("start_exercises")} <ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
