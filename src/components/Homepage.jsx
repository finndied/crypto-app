import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import {Cryptocurrencies, News} from '../components' 

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
	}, 10)

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
			<div className='home-heading-container'>
				<Title level={3} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
				<Title level={5} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
			</div>
			<Cryptocurrencies simplefied/>
			<div className='home-heading-container'>
				<Title level={3} className='home-title'>Latest Crypto News</Title>
				<Title level={5} className='show-more'><Link to='/news'>Show More</Link></Title>
			</div>
			<News simplified/>
		</>
	)
}

export default Homepage
