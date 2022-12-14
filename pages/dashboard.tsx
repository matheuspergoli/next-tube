import React from 'react'
import Head from 'next/head'
import { MainContainer } from '../components/MainContainer'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	const supabase = createServerSupabaseClient(context)

	const {
		data: { session }
	} = await supabase.auth.getSession()

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}

function Dashboard() {
	return (
		<>
			<Head>
				<title>Dashboard</title>
			</Head>
			<MainContainer>
				<h1>Dashboard</h1>
			</MainContainer>
		</>
	)
}

export default Dashboard
