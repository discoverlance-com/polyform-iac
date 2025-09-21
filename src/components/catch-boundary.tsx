import type { ErrorComponentProps } from '@tanstack/react-router'
import { useCanGoBack } from '@tanstack/react-router'

import { Button } from './ui/button'

export interface DefaultCatchBoundaryProps extends ErrorComponentProps {}

export const DefaultCatchBoundary: React.FC<DefaultCatchBoundaryProps> = ({
	error,
	reset,
}) => {
	const canGoBack = useCanGoBack()

	return (
		<div
			className="max-w-lg mx-auto mt-16 p-8 border border-gray-300 rounded-xl shadow-lg text-center"
			role="alert"
		>
			<div className="flex flex-col items-center gap-6">
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
				<h2 className="text-2xl font-bold text-red-600">
					Oops! Something went wrong
				</h2>
				<p className="text-gray-600 text-sm">
					We encountered an unexpected error. Please try again or go back to the
					previous page.
				</p>
				<div className="bg-gray-50 rounded-lg p-4 w-full text-left text-gray-800 border border-gray-200">
					<pre className="whitespace-pre-wrap break-words text-sm">
						{error instanceof Error ? error.message : String(error)}
					</pre>
				</div>
				<div className="flex gap-4 mt-6">
					<Button
						onClick={reset}
						className="bg-blue-500 text-white hover:bg-blue-600"
					>
						Try Again
					</Button>
					<Button
						disabled={!canGoBack}
						onClick={() => {
							window.history.back()
						}}
						className="border border-gray-300 text-gray-700 hover:bg-gray-100"
					>
						Go Back
					</Button>
				</div>
			</div>
		</div>
	)
}
