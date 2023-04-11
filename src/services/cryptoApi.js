import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = '95502d54e7msh4d789d92679426bp164070jsnff7e34c9ebe6'

export const cryptoApi = createApi({
	reducerPath: 'coinRankingApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://coinranking1.p.rapidapi.com/',
		headers: {
			'X-RapidAPI-Key': rapidApiKey,
			'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
		}
	}),
	endpoints: builder => ({
		getCryptos: builder.query({
			query: ({
				referenceCurrencyUuid,
				timePeriod,
				tiers,
				orderBy,
				orderDirection,
				limit,
				offset
			}) => ({
				url: 'coins',
				method: 'GET',
				params: {
					referenceCurrencyUuid,
					timePeriod,
					'tiers[0]': tiers,
					orderBy,
					orderDirection,
					limit,
					offset
				}
			})
		})
	})
})

export const { useGetCryptosQuery } = cryptoApi

