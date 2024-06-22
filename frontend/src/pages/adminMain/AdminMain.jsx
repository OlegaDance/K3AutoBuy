import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './AdminMain.module.scss'
import ItemBlockAdmin from '../../component/itemBlockAdmin/ItemBlockAdmin'
import ModalWindowAdmin from '../../component/modalWindowAdmin/ModalWindowAdmin'

function AdminMain() {
	const [isModalOpen, setModalOpen] = useState(false)
	const [cars, setCars] = useState([])
	const [loading, setLoading] = useState(true)
	const [selectedCar, setSelectedCar] = useState(null) // Стан для обраного автомобіля

	const openModal = car => {
		setSelectedCar(car) // Встановлюємо обраний автомобіль
		setModalOpen(true)
	}

	const closeModal = () => {
		setSelectedCar(null) // Очищуємо обраний автомобіль
		setModalOpen(false)
	}

	useEffect(() => {
		const fetchCars = async () => {
			try {
				const response = await axios.get(
					'http://127.0.0.1:8000/api/list?verified_vin=0'
				)
				setCars(response.data)
				setLoading(false) 
			} catch (error) {
				console.error('Помилка при отриманні списку машин:', error)
				setLoading(false) 
			}
		}

		fetchCars()
	}, [])

	return (
		<>
			<div className={styles.root}>
				<div className={styles.header}>
					<div>
						<button>Admin</button>
						<p>Перевірка VIN коду</p>
						<p>Продані авто</p>
					</div>
				</div>
				<div className={styles.collection}>
					{loading ? (
						<p>Завантаження...</p>
					) : (
						cars.map(car => (
							<ItemBlockAdmin
								key={car.id}
								car={car}
								onClick={() => openModal(car)}
							/>
						))
					)}
				</div>
			</div>
			<ModalWindowAdmin isOpen={isModalOpen} onClose={closeModal}>
				{selectedCar ? (
					<div className={styles.block}>
						<div className={styles.photo}>
							<img
								src={`http://127.0.0.1:8000/products/${selectedCar.photo_paths}`}
								alt='123'
							/>
						</div>
						<div className={styles.carTitle}>
							<h1>
								{selectedCar.brand} | {selectedCar.year}
							</h1>
							<div className={styles.carInfo}>
								<h3>{selectedCar.price}</h3>
								<p>Модель: {selectedCar.model} </p>
								<p>Розташування: {selectedCar.region} </p>
								<p>Кількість власників: {selectedCar.number_of_owners} </p>
								<p>Колір: {selectedCar.color} </p>
								<p>Паливо: {selectedCar.fuel_type} </p>
								<p>Тип кузову: {selectedCar.body_type} </p>
								<p>Місто: {selectedCar.city} </p>
								<p>VIN: {selectedCar.vin_code} </p>

								<h2>Опис для авто</h2>
								<p>{selectedCar.description}</p>
							</div>
						</div>
						<div className={styles.button}>
							<button>{selectedCar.phone_owner}</button>
						
						</div>
					</div>
				) : (
					<p>Немає даних для відображення</p>
				)}
			</ModalWindowAdmin>
		</>
	)
}

export default AdminMain
