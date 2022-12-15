import ytdl from 'ytdl-core'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { url } = req.query as { url: string }
	console.log(url)

	const info = await ytdl.getInfo(url as string)
	const format = ytdl.chooseFormat(info.formats, { quality: 'lowest', filter: 'audioonly' })

	res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp3"`)
	res.setHeader('Content-Type', 'video/mp3')
	ytdl(url, { format: format }).pipe(res)
}

export const config = {
	api: {
		responseLimit: false
	}
}

export default handler
