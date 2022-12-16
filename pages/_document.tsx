import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
	return (
		<Html lang='pt-br'>
			<Head>
				<meta name='application-name' content='Next Tube' />
				<meta name='keywords' content='Next Tube, NextJS' />
				<meta name='author' content='Matheus Pergoli' />
				<meta property='og:title' content='Next Tube' />
				<meta property='og:description' content='Next Tube - Plataforma de Vídeos' />
				<meta property='og:image' content='/next-tube.png' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
