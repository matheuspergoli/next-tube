import React from 'react'
import Link from 'next/link'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

export const Header = () => {
	const user = useUser()
	const supabaseClient = useSupabaseClient()
	const modalRef = React.useRef<HTMLDialogElement>(null)

	function closeModal() {
		modalRef.current?.close()
	}

	function openModal() {
		modalRef.current?.showModal()
	}

	async function handleLogin() {
		const { error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google'
		})
	}

	async function handleLogout() {
		const { error } = await supabaseClient.auth.signOut()
	}

	return (
		<>
			<header className='flex justify-between px-6 py-4 shadow-md'>
				<figure className='w-40'>
					<img src='/logo.jpg' alt='Next Tube Logo' className='w-full max-w-full' />
				</figure>
				<div className='flex gap-5'>
					{user ? (
						<Link href='/dashboard' className='text-xl font-semibold'>
							Dashboard
						</Link>
					) : null}
					<button onClick={openModal} className='text-xl font-semibold'>
						{user ? 'Perfil' : 'Login'}
					</button>
				</div>
			</header>
			<dialog ref={modalRef} className='rounded-md backdrop:bg-zinc-800 backdrop:bg-opacity-75'>
				<div className='flex flex-col items-center justify-center gap-5 p-6'>
					<h1 className='text-2xl font-semibold'>{user ? 'Você está logado!' : 'Você não está logado!'}</h1>
					{user ? (
						<div className='flex flex-col items-center justify-center gap-2'>
							<img src={user.user_metadata.avatar_url} alt='Avatar' className='h-20 w-20 rounded-full' />
							<p className='text-xl font-semibold'>{user.user_metadata.name}</p>
							<p className='text-lg font-semibold'>{user.email}</p>
						</div>
					) : null}
					{user ? (
						<button
							onClick={handleLogout}
							className='rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600'>
							Logout
						</button>
					) : (
						<button
							onClick={handleLogin}
							className='rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'>
							Login com Google
						</button>
					)}
					<button
						onClick={closeModal}
						className='rounded bg-zinc-800 px-4 py-2 text-white transition hover:bg-zinc-900'>
						Cancelar
					</button>
				</div>
			</dialog>
		</>
	)
}
