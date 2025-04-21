export interface NavItem {
	href: string;
	labelKey: string;
	exact?: boolean;
}

export const mainNavItems: NavItem[] = [
	{
		href: "/",
		labelKey: "home",
		exact: true,
	},
	{
		href: "/subjects",
		labelKey: "subjects",
	},
	{
		href: "/subjects/mathematics",
		labelKey: "mathematics",
	},
	{
		href: "/#how-it-works",
		labelKey: "how_it_works",
	},
	{
		href: "/about",
		labelKey: "about",
	},
];
