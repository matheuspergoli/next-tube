import React from 'react'
import { Formik, Form, Field } from 'formik'
import { AddItemValidation } from '../../validation/AddVideoValidation'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

export const FormAddVideo = () => {
	const user = useUser()
	const supabase = useSupabaseClient()

	function getIdFromURL(url: string) {
		const getIdRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
		const id = url.match(getIdRegExp)

		if (id && id[7].length == 11 ? id[7] : false) {
			return id?.[7]
		}
	}

	async function addVideo(values: { title: string; url: string }) {
		const { data, error } = await supabase.from('videos').insert([
			{
				title: values.title,
				link: `/video/${getIdFromURL(values.url)}`,
				thumb: `https://i.ytimg.com/vi/${getIdFromURL(values.url)}/hqdefault.jpg`,
				user_id: user?.id
			}
		])
	}

	return (
		<Formik
			initialValues={{
				title: '',
				url: ''
			}}
			validationSchema={AddItemValidation}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				setSubmitting(true)
				await addVideo(values)
				setSubmitting(false)
				resetForm()
			}}>
			{({ isSubmitting, errors, touched }) => (
				<Form className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<label htmlFor='title'>Título</label>
						<Field
							type='text'
							name='title'
							id='title'
							className={`rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${
								touched.title && errors.title ? 'border-red-500' : ''
							}`}
						/>
						{touched.title && errors.title ? <p className='text-red-500'>{errors.title}</p> : null}
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='url'>URL do vídeo</label>
						<Field
							type='text'
							name='url'
							id='url'
							className={`rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${
								touched.url && errors.url ? 'border-red-500' : ''
							}`}
						/>
						{touched.url && errors.url ? <p className='text-red-500'>{errors.url}</p> : null}
					</div>
					<button
						type='submit'
						disabled={isSubmitting}
						className='rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600'>
						Adicionar
					</button>
				</Form>
			)}
		</Formik>
	)
}
