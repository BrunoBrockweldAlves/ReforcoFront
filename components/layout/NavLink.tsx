"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
	exact?: boolean;
}

export function NavLink({ href, children, exact }: NavLinkProps) {
	const pathname = usePathname();
	const isActive = exact
		? pathname === href
		: pathname.startsWith(href) && href !== "/";

	return (
		<Link
			href={href}
			className={cn(
				"text-sm font-medium transition-colors hover:text-primary",
				isActive && "text-pink-500",
			)}>
			{children}
		</Link>
	);
}
