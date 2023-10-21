import { NextResponse } from 'next/server'

const BASE_URL = 'https://api.mapbox.com/search/searchbox/v1/suggest'
const mapUrl = `https://api.mapbox.com/search/searchbox/v1/suggest?q={search_text}`
const session_token = '5ccce4a4-ab0a-4a7c-943d-580e55542363'

export async function GET(request: NextResponse) {
	const { searchParams } = new URL(request.url)
	// console.log(searchParams)
	const searchText = searchParams.get('q')
	const res = await fetch(
		BASE_URL +
			'?q=' +
			searchText +
			'?language=en&limit=5&session_token=' +
			session_token +
			'&proximity=-83.748708,42.265837&country=AU&access_token=' +
			process.env.MAPBOX_ACCESS_TOKEN,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)

	const searchResult = await res.json()

	return NextResponse.json(searchResult)
}
