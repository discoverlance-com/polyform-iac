import type { ErrorComponentProps } from '@tanstack/react-router'
import { useCanGoBack } from '@tanstack/react-router'

import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'

export interface DefaultCatchBoundaryProps extends ErrorComponentProps {}

export const DefaultCatchBoundary: React.FC<DefaultCatchBoundaryProps> = ({
	error,
	reset,
}) => {
	const canGoBack = useCanGoBack()

	return (
		<div className="h-svh flex items-center justify-center relative">
			<Card className="max-w-md mx-auto" role="alert">
				<CardContent className="flex flex-col items-center gap-6">
					<svg
						className="w-16 h-16 text-red-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<title>Error</title>
						<circle cx="12" cy="12" r="10" strokeWidth="2" />
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 8v4m0 4h.01"
						/>
					</svg>
					<h2 className="text-2xl font-bold text-destructive">
						Oops! Something went wrong
					</h2>
					<p className="text-gray-600 text-sm">
						We encountered an unexpected error. Please try again or go back to
						the previous page.
					</p>
					<div className="bg-gray-50 rounded-lg p-4 w-full text-left text-gray-800 border border-gray-200">
						<pre className="whitespace-pre-wrap break-words text-sm">
							{error instanceof Error ? error.message : String(error)}
						</pre>
					</div>
				</CardContent>

				<CardFooter>
					<Button onClick={reset}>Try Again</Button>
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
