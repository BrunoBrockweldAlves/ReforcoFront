"use client";

import Link from "next/link";
import { BookOpen, LogIn } from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/context/language-context";
import { NavLink } from "./NavLink";
import { mainNavItems } from "@/config/navigation";
import { Button } from "@/components/ui/button";

export function Header() {
	const { t } = useLanguage();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				<Link
					href="/"
					className="flex items-center gap-2">
					<BookOpen className="h-6 w-6 text-pink-500" />
					<span className="text-xl font-bold">Kids Learning Hub</span>
				</Link>
				<nav className="hidden md:flex gap-6">
					{mainNavItems.map((item) => (
						<NavLink
							key={item.href}
							href={item.href}
							exact={item.exact}>
							{t(item.labelKey)}
						</NavLink>
					))}
				</nav>
				<div className="flex items-center gap-4">
					<LanguageSelector />
					<Button
						variant="outline"
						size="sm">
						<LogIn className="mr-2 h-4 w-4" />
						{t("login")}
					</Button>
				</div>
			</div>
		</header>
	);
}
