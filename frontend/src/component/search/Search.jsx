import { useState } from 'react'
import SearchSvg from '../../assets/svg/SearchSvg'
import './Search.css'

function Search() {
   const [yearFrom, setYearFrom] = useState()
		const [yearTo, setYearTo] = useState()

		const handleYearFromChange = event => {
			setYearFrom(event.target.value)
		}

		const handleYearToChange = event => {
			setYearTo(event.target.value)
		}

		const [priceFrom, setPriceFrom] = useState()
		const [priceTo, setPriceTo] = useState()

		const handlePriceFromChange = event => {
			setPriceFrom(event.target.value)
		}

		const handlePriceToChange = event => {
			setPriceTo(event.target.value)
		}
	return (
		<div className='searchBlock'>
			<div className='formBlock'>
				<select name='type' className='selects' id='typeOfCarSelect'>
					<option value=''>Легкові</option>
					<option value='anyType'>Будь-який</option>
					<option value='moto'>Мото</option>
					<option value='trucks'>Вантажівки</option>
					<option value='trailers'>Причепи</option>
					<option value='specialEquipment'>Спецтехніка</option>
					<option value='bus'>Автобуси</option>
				</select>
				<span className='verifiedVINCheck'>
					<p>Перевіреній VIN</p>
					<input className='checkboxInput' type='checkbox' />
				</span>
				<select name='region' className='selects' id='regionSelect'>
					<option value=''>Регіон</option>
					<option value='anyRegion'>Будь-який</option>
					<option value='odesa'>Одеса</option>
					<option value='lviv'>Львів</option>
					<option value='kharkiv'>Харків</option>
					<option value='ivanoFrankivsk'>Івано-Франківськ</option>
				</select>
				<select name='brand' className='selects' id='brandSelect'>
					<option value=''>Марка</option>
					<option value='anyBrand'>Будь-який</option>
					<option value='bmw'>BMW</option>
					<option value='audi'>Audi</option>
					<option value='mercedesBenz'>Mercedes-Benz</option>
					<option value='opel'>Opel</option>
					<option value='porche'>Porche</option>
					<option value='volkswagen'>Volkswagen</option>
				</select>
				<div className='verifiedYear'>
					<p>Рік</p>
					<div className='inputVidDo'>
						<input
							id='VidYear'
							onChange={handleYearFromChange}
							type='number'
							placeholder='Від'
							value={yearFrom}
						/>
						<input
							id='doYear'
							onChange={handleYearToChange}
							type='number'
							placeholder='До'
							value={yearTo}
						/>
					</div>
				</div>
				<select name='model' className='selects' id='modelSelect'>
					<option value=''>Модель</option>
					<option value='anyBrand'>Спочатку виберіть марку</option>
					<option value='bmw'>A6</option>
					<option value='audi'>5 Series</option>
					<option value='mercedesBenz'>Golf</option>
					<option value='opel'>Insignia</option>
					<option value='porche'>Passat</option>
				</select>
				<span className='verifiedPrice'>
					<p>Ціна</p>
					<div className='inputVidDo'>
						<input
							id='VidPrice'
							onChange={handlePriceFromChange}
							type='number'
							placeholder='Від'
							value={priceFrom}
						/>
						<input
							id='doPrice'
							onChange={handlePriceToChange}
							type='number'
							placeholder='До'
							value={priceTo}
						/>
					</div>
				</span>

				<button className='buttonSearch'>
					<p className='svgSearch'>
						<SearchSvg />
					</p>
					Пошук
				</button>
			</div>
		</div>
	)
}

export default Search
