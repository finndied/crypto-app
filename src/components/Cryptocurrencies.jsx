import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplefied }) => {
	const count = simplefied ? 10 : 100
	const {
		data: cryptoList,
		isLoading,
		error
	} = useGetCryptosQuery({
		referenceCurrencyUuid: 'yhjMzLPhuIDl',
		timePeriod: '24h',
		tiers: '1',
		orderBy: 'marketCap',
		orderDirection: 'desc',
		limit: count,
		offset: '0'
	})
	const [cryptos, setCryptos] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		setCryptos(cryptoList?.data?.coins)
	}, [cryptoList?.data?.coins])

	useEffect(() => {
		const filteredData = cryptoList?.data?.coins.filter(coin =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setCryptos(filteredData)
	}, [cryptoList, searchTerm])

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>
	
	return (
		<>
			{!simplefied && (
				<div className='search-crypto'>
					<Input
						placeholder='Search Cryptocurrency'
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
			)}
			<Row gutter={[22, 22]} className='crypto-card-container'>
				{cryptos?.map(currency => (
					<Col
						xs={24}
						sm={12}
						lg={6}
						className='crypto-card'
						key={currency.uuid}
					>
						<Link to={`/crypto/${currency.uuid}`}>
							<Card
								title={`${currency.rank}. ${currency.name}`}
								extra={<img className='crypto-image' src={currency.iconUrl} />}
								hoverable
							>
								<p>Price: {millify(currency.price)}</p>
								<p>Market Cap: {millify(currency.marketCap)}</p>
								<p>Daily Change: {millify(currency.change)}%</p>
								<p>Symbol: {currency.symbol}</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	)
}

export default Cryptocurrencies
