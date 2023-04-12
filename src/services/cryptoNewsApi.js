import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = '95502d54e7msh4d789d92679426bp164070jsnff7e34c9ebe6'

export const cryptoNewsApi = createApi({
	reducerPath: 'bingNewsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://bing-news-search1.p.rapidapi.com/',
		headers: {
			'X-BingApis-SDK': 'true',
			'X-RapidAPI-Key': rapidApiKey,
			'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
		}
	}),
	endpoints: builder => ({
		getNews: builder.query({
			query: ({ newsCategory, count }) => ({
				url: `/news/search?q=${newsCategory}?count=${count}`,
				method: 'GET',
				params: {
					newsCategory,
					freshness: 'Day',
					textFormat: 'Raw',
					safeSearch: 'Off',
					count
				}
			})
		})
	})
})
export const { useGetNewsQuery } = cryptoNewsApi
