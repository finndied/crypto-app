import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'

const { Title } = Typography

const Homepage = () => {
	const { data, isLoading, error } = useGetCryptosQuery({
		referenceCurrencyUuid: 'yhjMzLPhuIDl',
		timePeriod: '24h',
		tiers: '1',
		orderBy: 'marketCap',
		orderDirection: 'desc',
		limit: '50',
		offset: '0'
	})

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<>
			<Title level={2} className='heading'>
				Global Crypto Stats
			</Title>
			<Row>
				<Col span={12}>
					<Statistic
						title='Total Cryptocurrencies'
						value={data?.data?.stats?.total}
					/>
				</Col>
				<Col span={12}>
					<Statistic title='Total Exchanges' value={millify(data?.data?.stats?.totalExchanges)} />
				</Col>
				<Col span={12}>
					<Statistic title='Total Market Cap' value={millify(data?.data?.stats?.totalMarketCap)} />
				</Col>
				<Col span={12}>
					<Statistic title='Total 24 hour Volume' value={millify(data?.data?.stats?.total24hVolume)} />
				</Col>
				<Col span={12}>
					<Statistic title='Total Markets' value={millify(data?.data?.stats?.totalMarkets)} />
				</Col>
			</Row>
		</>
	)
}

export default Homepage
