'use client'

import { CardList } from '@/data/CardList'
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {}

const Cards = (props: Props) => {
	const [activeCard, setActiveCard] = useState<any>()
	return (
		<div>
			<h2 className='text-lg font-semibold'>Payment Methods</h2>
			<div className='grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4'>
				{CardList.map((card, index) => (
					<div
						className={`w-16 m-2 px-2 border border-blue-200 rounded-md flex justify-center items-center cursor-pointer hover:scale-110 transition-all ${
							index === activeCard
								? 'ring-blue-800 z-50 shadow-md bg-blue-200'
								: ''
						}`}
						key={index}
						onClick={() => setActiveCard(index)}
					>
						<Image src={card.image} alt={card.name} width={30} height={50} />
					</div>
				))}
			</div>
		</div>
	)
}

export default Cards
