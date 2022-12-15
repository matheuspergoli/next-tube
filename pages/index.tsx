import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { MainContainer } from '../components/MainContainer'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

function Home() {
	const supabase = useSupabaseClient()
	const { data: videos } = useQuery('videos', async () => {
		const { data, error } = await supabase.from('videos').select('*')
		if (error) {
			return
		} else {
			return data as Video[]
		}
	})

	return (
		<>
			<Head>
				<title>Next Tube</title>
			</Head>
			<MainContainer>
				{videos?.length === 0 && (
					<h1 className='text-center text-3xl font-bold'>Ainda não temos vídeos, adicione um!</h1>
				)}
				<section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{videos?.map((video) => (
						<article key={video.id}>
							<Link href={video.link}>
								<img src={video.thumb} alt={video.title} className='w-full' />
								<h2 className='text-center font-semibold'>{video.title}</h2>
							</Link>
						</article>
					))}
				</section>
			</MainContainer>
		</>
	)
}

export default Home
