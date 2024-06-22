import React from 'react'
import axios from 'axios'
import Search from '../../component/search/Search'
import Heading from '../../component/heading/Heading'
import ItemBlock from '../../component/itemBlock/ItemBlock'
import Catolagy from '../../component/catology/Catolagy'
import Header from '../../component/header/Header'
import './Main.css'

const LoadingSpinner = () => (
	<svg
		className='loadingSpinner'
		width='250px'
		height='250px'
		viewBox='0 0 100 100'
		preserveAspectRatio='xMidYMid'
		
	>
		<circle
			cx='50'
			cy='50'
			fill='none'
			stroke='#007bff'
			strokeWidth='10'
			r='35'
			strokeDasharray='164.93361431346415 56.97787143782138'
		>
			<animateTransform
				attributeName='transform'
				type='rotate'
				repeatCount='indefinite'
				dur='1s'
				keyTimes='0;1'
				values='0 50 50;360 50 50'
			></animateTransform>
		</circle>
	</svg>
)

function Main() {
	const [cars, setCars] = React.useState([])
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		const fetchCars = async () => {
			try {
				const response = await axios.get(
					'http://127.0.0.1:8000/api/list?verified_vin=1'
				)
				setCars(response.data)
				setLoading(false) 
			} catch (error) {
				console.error('Помилка при отриманні списку машин:', error)
			}
		}

		fetchCars()
	}, [])

	return (
		<div>
			<Search />
			<Heading title={'Найкращі пропозиції'} />
			{loading ? (
				<div className='loadingContainer'>
					<LoadingSpinner />
				</div>
			) : (
				<div className='collectionCard'>
					<div className='card'>
						{cars.map(obj => (
							<ItemBlock key={obj.id} {...obj} />
						))}
					</div>
				</div>
			)}
			<Heading title='Каталог марок' />
			<Catolagy />
		</div>
	)
}

export default Main
