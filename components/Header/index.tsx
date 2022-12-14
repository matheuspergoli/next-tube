import React from 'react'
import Link from 'next/link'
import { useMedia } from '../../hooks/useMedia'
import { MdClose as CloseIcon } from 'react-icons/md'
import { AiOutlineMenu as MenuIcon } from 'react-icons/ai'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

export const Header = () => {
	const user = useUser()
	const supabaseClient = useSupabaseClient()
	const isMobile = useMedia('(max-width: 640px)')
	const modalRef = React.useRef<HTMLDialogElement>(null)
	const [isMenuMobileActive, setIsMenuMobileActive] = React.useState(false)

	function showMenu() {
		setIsMenuMobileActive((prev) => !prev)
	}

	function closeMenu() {
		setIsMenuMobileActive(false)
	}

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
			<header className='flex items-center justify-between px-6 py-4 shadow-md'>
				<figure className='w-40'>
					<img src='/logo.jpg' alt='Next Tube Logo' className='w-full max-w-full' />
				</figure>
				{isMobile ? (
					<>
						<button onClick={showMenu} className='rounded-md bg-zinc-800 p-2 text-xl text-white'>
							{isMenuMobileActive ? <CloseIcon /> : <MenuIcon />}
						</button>
						<nav
							className={`${
								isMenuMobileActive ? 'flex' : 'hidden'
							} absolute right-6 top-16 flex-col items-center gap-5 rounded-md bg-zinc-800 p-3 text-white`}>
							{user ? (
								<>
									<Link href='/' onClick={closeMenu} className='text-xl font-semibold'>
										Home
									</Link>
									<Link href='/dashboard' onClick={closeMenu} className='text-xl font-semibold'>
										Dashboard
									</Link>
								</>
							) : null}
							<button
								onClick={() => {
									closeMenu()
									openModal()
								}}
								className='text-xl font-semibold'>
								{user ? 'Perfil' : 'Login'}
							</button>
						</nav>
					</>
				) : (
					<nav className='flex gap-5'>
						{user ? (
							<>
								<Link href='/' className='text-xl font-semibold'>
									Home
								</Link>
								<Link href='/dashboard' className='text-xl font-semibold'>
									Dashboard
								</Link>
							</>
						) : null}
						<button onClick={openModal} className='text-xl font-semibold'>
							{user ? 'Perfil' : 'Login'}
						</button>
					</nav>
				)}
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
