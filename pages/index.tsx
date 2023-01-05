import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { MainContainer } from '../components/MainContainer'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

function Home() {
	const router = useRouter()
	const supabase = useSupabaseClient()
	const { data: videos } = useQuery('videos', async () => {
		const { data, error } = await supabase.from('videos').select('*')
		if (error) {
			return
		} else {
			return data as Video[]
		}
	})

	async function downloadVideo(url: string) {
		router.push(`/api/download/${url.replace('/video/', '')}`)
	}

	return (
		<>
			<Head>
				<title>Next Tube</title>
			</Head>
			<MainContainer>
				{videos?.length === 0 && (
					<h1 className='text-center text-3xl font-bold'>Ainda não temos vídeos, adicione um!.</h1>
				)}
				<section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{videos?.map((video) => (
						<article key={video.id} className='relative'>
							<button
								className='absolute right-0 top-0 bg-blue-500 px-2 py-1 text-sm font-semibold text-white hover:bg-blue-600'
								onClick={() => downloadVideo(video.link)}>
								Download
							</button>
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
