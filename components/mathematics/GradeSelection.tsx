"use client";

import { useLanguage } from "@/context/language-context";
import { GradeCard } from "./GradeCard";
import { grades } from "@/data/mathematics";

interface GradeSelectionProps {
	onSelectGrade: (grade: string) => void;
}

export function GradeSelection({ onSelectGrade }: GradeSelectionProps) {
	const { t } = useLanguage();

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tighter">
					{t("mathematics")}
				</h1>
				<p className="text-muted-foreground">{t("select_grade")}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{grades.map((grade) => (
					<GradeCard
						key={grade.id}
						grade={grade}
						onSelect={onSelectGrade}
					/>
				))}
			</div>
		</div>
	);
}
