'use client'

import React, { useContext, useState } from 'react'
import { CarList } from '@/data/CarList'
import Image from 'next/image'
import { DirectionDataContext } from '@/context/DirectionDataContext'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'

type Props = {}

const Cars = () => {
	const [selectedCar, setSelectedCar] = useState<any>(0)
	const { directionData, setDirectionData } = useContext(DirectionDataContext)
	const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext)

	//calculating cost for selected car
	//origin:distance->meters, time->seconds
	const calculateCost = (charges: any) => {
		let cost = (charges * directionData?.routes[0]?.distance) / 1000
		return cost.toFixed(2)
	}

	return (
		<div className='mt-3 '>
			<h2 className='text-lg font-semibold'>Select cars</h2>
			<div className='grid grid-cols-3 md:grid-cols-1'>
				{CarList.map((car, index) => (
					<div
						className={`flex flex-col justify-between m-2 p-2 border border-blue-200 rounded-md cursor-pointer hover:scale-105 transition-all ${
							index == selectedCar ? 'ring-blue-800 shadow-md bg-blue-200' : ''
						}`}
						key={index}
						onClick={() => {
							setSelectedCar(index)
							{
								directionData.routes && setCarAmount(calculateCost(car.charges))
							}
						}}
					>
						<Image
							className='w-full md:w-24 md:h-10'
							src={car.image}
							alt={car.name}
							width={75}
							height={90}
						/>

						<h2 className='flex text-sm justify-between'>
							{car.name}
							{directionData.routes ? (
								<span className='float-right'>
									{calculateCost(car!.charges)} $
								</span>
							) : null}
						</h2>
					</div>
				))}
			</div>
		</div>
	)
}

export default Cars
