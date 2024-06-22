import './MyProfile.css'
import Heading from '../../component/heading/Heading'
import ItemBlock from '../../component/itemBlock/ItemBlock'
import Profile from '../../component/profile/Profile'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DontHaveCar from '../../assets/svg/DontHaveCar'

function MyProfile() {
	const user = localStorage.getItem('user-info')
	const infoUser = JSON.parse(user)
	console.log(infoUser.number)
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

	const [cars, setCars] = useState([])
	const [loading, setLoading] = useState(true) // Стан для відстеження завантаження

	useEffect(() => {
		const fetchCars = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/list')
				const carsMatchingUser = response.data.filter(
					car => car.phone_owner === infoUser.number
				)
				setCars(carsMatchingUser)
				setLoading(false) // Після завершення завантаження даних встановлюємо loading в false
			} catch (error) {
				console.error('Помилка при отриманні списку машин:', error)
			}
		}

		fetchCars()
	}, [infoUser.number])

	return (
		<>
			<Profile />
			{loading ? ( 
				<div className='loadingContainer'>
					<LoadingSpinner /> 
				</div>
			) : (
				<>
					{cars.length > 0 && <Heading title='Виставлені авто' />}
					<div className='exhibitedCarsCollection'>
						{cars.length === 0 ? (
							<DontHaveCar />
						) : (
							cars.map(obj => <ItemBlock key={obj.id} id={obj.id} {...obj} />)
						)}
					</div>
				</>
			)}
		</>
	)
}

export default MyProfile
