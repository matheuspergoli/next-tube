import React from 'react'

export const MainContainer = (props: { children: React.ReactNode }) => {
	return <main className='mx-auto mt-10 w-full max-w-7xl px-3'>{props.children}</main>
}
