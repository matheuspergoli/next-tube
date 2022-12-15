import React from 'react'
import { useRouter } from 'next/router'

function PageError500() {
	const router = useRouter()

	React.useEffect(() => {
		setTimeout(() => {
			router.push('/')
		}, 3000)
	}, [router])

	return (
		<main className='flex h-screen w-screen flex-col items-center justify-center'>
			<h1 className='text-2xl font-bold'>
				Parece que você tentou fazer o download de um arquivo muito pesado, e infelizmente não conseguimos
				liberar ele pre você.
			</h1>
			<h2 className='text-xl font-bold'>Iremos redirecionar você em instantes!</h2>
		</main>
	)
}

export default PageError500
