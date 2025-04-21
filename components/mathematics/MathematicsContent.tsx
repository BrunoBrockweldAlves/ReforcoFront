"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/mathematics/Breadcrumb";
import { GradeSelection } from "@/components/mathematics/GradeSelection";
import { TopicSelection } from "@/components/mathematics/TopicSelection";
import { ExercisePage } from "@/components/mathematics/ExercisePage";

export function MathematicsContent() {
	const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
	const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

	const handleGradeSelect = (grade: string) => {
		setSelectedGrade(grade);
		setSelectedTopic(null);
	};

	const handleBack = () => {
		if (selectedTopic) {
			setSelectedTopic(null);
		} else if (selectedGrade) {
			setSelectedGrade(null);
		}
	};

	const content = !selectedGrade ? (
		<GradeSelection onSelectGrade={handleGradeSelect} />
	) : !selectedTopic ? (
		<TopicSelection
			selectedGrade={selectedGrade}
			onBack={handleBack}
			onSelectTopic={setSelectedTopic}
		/>
	) : (
		<ExercisePage
			selectedGrade={selectedGrade}
			selectedTopic={selectedTopic}
			onBack={handleBack}
		/>
	);

	return (
		<div className="space-y-6">
			<Breadcrumb />
			{content}
		</div>
	);
}
