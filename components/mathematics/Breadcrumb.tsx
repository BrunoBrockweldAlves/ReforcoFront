"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function Breadcrumb() {
	const { t } = useLanguage();

	return (
		<div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
			<Link
				href="/"
				className="flex items-center gap-1 hover:text-primary">
				<Home className="h-4 w-4" />
				{t("home")}
			</Link>
			<ChevronRight className="h-4 w-4" />
			<Link
				href="/subjects"
				className="hover:text-primary">
				{t("subjects")}
			</Link>
			<ChevronRight className="h-4 w-4" />
			<span className="text-foreground">{t("mathematics")}</span>
		</div>
	);
}
