import { Link, useCanGoBack } from '@tanstack/react-router'

import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'

export const DefaultNotFound: React.FC = () => {
	const canGoBack = useCanGoBack()

	return (
		<div className="h-svh flex items-center justify-center relative">
			<Card className="max-w-md mx-auto text-center" role="alert">
				<CardContent>
					<div className="flex flex-col items-center gap-6">
						<svg
							className="w-16 h-16 text-gray-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Not Found</title>
							<circle cx="12" cy="12" r="10" strokeWidth="2" />
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 8v4m0 4h.01"
							/>
						</svg>
						<h2 className="text-2xl font-bold">Page Not Found</h2>
						<p className="text-muted-foreground text-sm">
							The page you are looking for does not exist. Please check the URL
							or go back to the previous page.
						</p>
					</div>
				</CardContent>
				<CardFooter className="flex gap-4 justify-center flex-wrap">
					<Button
						onClick={() => {
							window.location.href = '/'
						}}
						asChild
					>
						<Link to="/">Go to Homepage</Link>
					</Button>
					<Button
						disabled={!canGoBack}
						onClick={() => {
							window.history.back()
						}}
						variant="outline"
					>
						Go Back
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
