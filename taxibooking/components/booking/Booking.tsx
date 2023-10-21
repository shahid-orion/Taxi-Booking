import React, { useContext, useState } from 'react'
import AutoCompleteAddress from './AutoCompleteAddress'
import Cars from './Cars'
import Cards from './Cards'
import { useRouter } from 'next/navigation'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'

type Props = {}

const Booking = (props: Props) => {
	const router: any = useRouter()
	const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext)
	return (
		<div className='p-5'>
			<h2 className='text-[20px] font-semibold'>Book Now!</h2>
			<div className='border-[1px] p-5 rounded-md h-fit'>
				<AutoCompleteAddress />
				<Cars />
				<Cards />
				<button
					className={`w-full rounded-md p-1 mt-2 ${
						carAmount ? 'bg-blue-400 ' : 'bg-blue-200'
					}`}
					disabled={!carAmount}
					onClick={() => router.push('/payment')}
				>
					Book
				</button>
			</div>
		</div>
	)
}

export default Booking
