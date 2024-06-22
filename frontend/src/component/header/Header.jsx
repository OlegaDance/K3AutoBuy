import React, { useState, useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/image/logo.png'
import NewMessage from '../../assets/svg/NewMessage'
import { useNavigate } from 'react-router-dom'

function Header({ onLogin }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const storedUserInfo = localStorage.getItem('user-info')
		setIsLoggedIn(!!storedUserInfo)

		// Оновлюємо стан кожні 60 секунд
		const interval = setInterval(() => {
			const storedUserInfo = localStorage.getItem('user-info')
			setIsLoggedIn(!!storedUserInfo)
		}, 500) // Оновлюємо кожні 60 секунд

		return () => clearInterval(interval) // Прибираємо інтервал при знищенні компонента
	}, [])

	const handleLogout = () => {
		localStorage.removeItem('user-info')
		setIsLoggedIn(false)
		navigate('/')
		onLogin(false) // Оновлюємо стан у батьківському компоненті
	}

	return (
		<div className='headerBlock'>
			<nav className='navigatorSite'>
				<img src={logo} className='headerLogo' alt='logo' />
				<Link className='navigatorTarget' to={'./'}>
					Головна
				</Link>
				<Link className='navigatorTarget' to={'./KatalogCar'}>
					Всі авто
				</Link>
				<Link className='navigatorTarget' to={'./MyProfile'}>
					Профіль
				</Link>
				<Link className='navigatorTarget' to={`./chatPage`}>
					Повідомлення
				</Link>
			</nav>
			<div className='headerBtn'>
				<NewMessage />
				<Link to={'./addCarPage'}>
					<button className='btnAddCar'>Додати авто</button>
				</Link>
				{isLoggedIn ? (
					<button onClick={handleLogout} className='btnLogReg'>
						Вийти
					</button>
				) : (
					<Link to={'/Singin'}>
						<button className='btnLogReg'>Увійти</button>
					</Link>
				)}
			</div>
		</div>
	)
}

export default Header
