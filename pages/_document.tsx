import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
	return (
		<Html lang='pt-br'>
			<Head>
				<meta name='description' content='Next Tube - Baixe seus Vídeos' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
