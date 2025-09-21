import { useCanGoBack } from '@tanstack/react-router'

import { Button } from './ui/button'

export const DefaultNotFound: React.FC = () => {
	const canGoBack = useCanGoBack()

	return (
		<div
			className="max-w-lg mx-auto mt-16 p-8 border border-gray-300 rounded-xl shadow-lg text-center"
			role="alert"
		>
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
				<h2 className="text-2xl font-bold text-gray-700">Page Not Found</h2>
				<p className="text-gray-600 text-sm">
					The page you are looking for does not exist. Please check the URL or
					go back to the previous page.
				</p>
				<div className="flex gap-4 mt-6">
					<Button
						onClick={() => {
							window.location.href = '/'
						}}
					>
						Go to Homepage
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
				</div>
			</div>
		</div>
	)
}
