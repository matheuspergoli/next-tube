import React from 'react'

export const Header = () => {
	return (
		<header className='flex justify-between px-6 py-4 shadow-md'>
			<figure className='w-40'>
				<img src='/logo.jpg' alt='Next Tube Logo' className='w-full max-w-full' />
			</figure>
			<button className='text-xl font-semibold'>Login</button>
		</header>
	)
}
