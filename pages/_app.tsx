import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient())
	const [supabaseClient] = React.useState(() => createBrowserSupabaseClient())

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
					<Header />
					<Component {...pageProps} />
				</SessionContextProvider>
			</Hydrate>
		</QueryClientProvider>
	)
}
