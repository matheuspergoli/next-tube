import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
	const [supabaseClient] = React.useState(() => createBrowserSupabaseClient())

	return (
		<SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
			<Header />
			<Component {...pageProps} />
		</SessionContextProvider>
	)
}
