import React from 'react'
import Head from 'next/head'
import { MainContainer } from '../components/MainContainer'

function Home() {
	return (
		<>
			<Head>
				<title>Next Tube</title>
			</Head>
			<MainContainer>
				<h1>Home</h1>
			</MainContainer>
		</>
	)
}

export default Home
