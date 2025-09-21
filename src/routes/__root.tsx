import { TanstackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { DefaultCatchBoundary } from '@/components/catch-boundary'
import { GlobalSpinner } from '@/components/global-spinner'
import { DefaultNotFound } from '@/components/not-found'
import { siteSEO } from '@/lib/seo'
import { ThemeProvider } from '@/providers/ThemeProvider'
import Header from '../components/Header'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import StoreDevtools from '../lib/demo-store-devtools'
import appCss from '../styles.css?url'

interface MyRouterContext {
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			...siteSEO({}),
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
			{ rel: 'manifest', href: '/manifest.webmanifest', color: '#fffff' },
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossOrigin: '',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
			},
		],
	}),
	errorComponent: (props) => {
		return (
			<HtmlWrapper>
				<DefaultCatchBoundary {...props} />
			</HtmlWrapper>
		)
	},
	notFoundComponent() {
		return (
			<DocumentWrapper>
				<DefaultNotFound />
			</DocumentWrapper>
		)
	},
	shellComponent({ children }) {
		return <DocumentWrapper>{children}</DocumentWrapper>
	},
})

function DocumentWrapper({ children }: React.PropsWithChildren) {
	return (
		<ThemeProvider>
			<HtmlWrapper>{children}</HtmlWrapper>
		</ThemeProvider>
	)
}

function HtmlWrapper({ children }: React.PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<GlobalSpinner />
				<Header />
				{children}
				<TanstackDevtools
					config={{
						position: 'bottom-left',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						StoreDevtools,
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	)
}
