import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MainContainer } from '../../components/MainContainer'

function Video() {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>Video</title>
			</Head>
			<MainContainer>
				<h1 className='text-4xl font-bold'>Em construção!</h1>
				<button
					onClick={() => router.push('/')}
					className='mt-10 rounded-md bg-zinc-800 px-3 py-2 text-white'>
					Voltar
				</button>
			</MainContainer>
		</>
	)
}

export default Video
