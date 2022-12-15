import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MainContainer } from '../../components/MainContainer'

function Video() {
	const router = useRouter()
	const id = router.query.id

	return (
		<>
			<Head>
				<title>Video</title>
			</Head>
			<MainContainer>
				<button
					onClick={() => router.push('/')}
					className='mb-10 rounded-md bg-zinc-800 px-3 py-2 text-white'>
					Voltar
				</button>
				<iframe
					src={`https://youtube.com/embed/${id}`}
					allowFullScreen
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					className='mx-auto mb-10 h-iframe-video w-full max-w-4xl'></iframe>
			</MainContainer>
		</>
	)
}

export default Video
