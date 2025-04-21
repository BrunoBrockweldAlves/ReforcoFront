interface PageContainerProps {
	children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
	return <main className="container py-8">{children}</main>;
}
