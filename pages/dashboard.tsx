import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { FormAddVideo } from '../components/FormAddVideo'
import { MainContainer } from '../components/MainContainer'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
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
		props: {
			data: 'Running on the server'
		}
	}
}

function Dashboard() {
	const user = useUser()
	const supabase = useSupabaseClient()

	const { data: videos, refetch } = useQuery(
		'user-videos',
		async () => {
			const { data, error } = await supabase.from('videos').select('*').eq('user_id', user?.id)
			if (error) {
				return
			} else {
				return data as Video[]
			}
		},
		{
			retry: 3,
			retryDelay: 1000,
			enabled: !!user?.id
		}
	)

	async function handleRefetch() {
		await refetch()
	}

	async function deleteVideo(id: number) {
		const { data, error } = await supabase.from('videos').delete().match({ id })
		await refetch()
	}

	return (
		<>
			<Head>
				<title>Dashboard</title>
			</Head>
			<MainContainer>
				<h1 className='mb-10 border-b text-3xl font-bold'>Adicionar Vídeos</h1>

				<FormAddVideo refetch={handleRefetch} />

				{videos?.length === 0 ? (
					<h1 className='mt-10 mb-5 border-b text-3xl font-bold'>Você não tem vídeos</h1>
				) : (
					<h1 className='mt-10 mb-5 border-b text-3xl font-bold'>Seus vídeos</h1>
				)}

				<div className='mb-10'>
					<p className='text-lg'>Não está vendo seus vídeos?</p>
					<button
						className='rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600'
						onClick={handleRefetch}>
						Atualizar
					</button>
				</div>

				<section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{videos?.map((video) => (
						<article key={video.id} className='relative'>
							<button
								className='absolute right-0 top-0 bg-red-500 px-2 py-1 text-sm font-semibold text-white hover:bg-red-600'
								onClick={() => deleteVideo(video.id)}>
								Excluir
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

export default Dashboard
