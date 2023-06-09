import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

const { Text, Title } = Typography
const { Option } = Select

const demoImage =
	'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
	const { data } = useGetCryptosQuery({
		referenceCurrencyUuid: 'yhjMzLPhuIDl',
		timePeriod: '24h',
		tiers: '1',
		orderBy: 'marketCap',
		orderDirection: 'desc',
		limit: 100,
		offset: '0'
	})
	const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
	const { data: cryptoNews } = useGetNewsQuery({
		newsCategory,
		count: simplified ? 6 : 20
	})
	if (!cryptoNews?.value) return 'Loading...'

	return (
		<Row gutter={[24, 24]}>
			{!simplified && (
				<Col span={24}>
					<Select
						allowClear 
						disabled={false}
						showSearch
						className='select-news'
						placeholder='Select a Crypto'
						optionFilterProp='children'
						onChange={value => setNewsCategory(value)}
						filterOption={(input, option) =>
							option.children.toLowerCse().indexOf(input.toLowerCase()) >= 0
						}
					>
						<Option value='Cryptocurrency'>Cryptocurrency</Option>
						{data?.data?.coins.map(coin => (
							<Option value={coin.name}>{coin.name}</Option>
						))}
					</Select>
				</Col>
			)}
			{cryptoNews.value.map((news, i) => (
				<Col xs={24} sm={12} lg={8} key={i}>
					<Card hoverable className='news-card'>
						<a href={news?.url} target='_blank'>
							<div className='news-image-container'>
								<Title className='news-title' level={4}>
									{news.name}
								</Title>
								<img
									src={news?.image?.thumbnail?.contentUrl || demoImage}
									alt='news'
								/>
							</div>
							<p>
								{news.description > 100
									? `${news.description.substring(0, 100)}...`
									: news.description}
							</p>
							<div className='provider-container'>
								<Avatar
									src={
										news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
									}
									alt='news'
								/>
								<Text className='provider-name'>{news.provider[0]?.name}</Text>
								<Text className='provider-time'>
									{moment(news.datePublished).startOf('ss').fromNow()}
								</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	)
}

export default News
