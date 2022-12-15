import * as Yup from 'yup'

const regexYoutubeURL =
	/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/

export const AddItemValidation = Yup.object().shape({
	title: Yup.string().min(10, 'Título deve ter no mínimo 10 caracteres').required('Campo obrigatório'),
	url: Yup.string()
		.min(20, 'Certifique-se de colocar uma URL válida de no mínimo 20 caracteres')
		.matches(regexYoutubeURL, 'Preencha com uma URL válida')
		.required('Campo obrigatório')
})
