import { DirectionDataContext } from '@/context/DirectionDataContext'
import React, { useContext } from 'react'

type Props = {}

const DistanceTime = (props: Props) => {
	const { directionData, setDirectionData } = useContext(DirectionDataContext)
	// console.log('DIRECTIONDATA', directionData)
	// let travelTime = ((directionData?.routes[0]?.duration / 60).toFixed(0))
	return directionData.routes ? (
		<div className=' p-2 rounded'>
			{/* {directionData.routes ? ( */}
			<h2 className='text-black opacity-80 text-sm'>
				Distance:
				<span className='mr-3 font-semibold text-green-500 px-2'>
					{(directionData?.routes[0]?.distance / 1000).toFixed(2)} Km
				</span>
				Duration:
				<span className='font-semibold text-green-500 px-2'>
					{parseInt((directionData?.routes[0]?.duration / 60).toFixed(0)) > 60
						? `${
								parseInt((directionData?.routes[0]?.duration / 60).toFixed(0)) /
								60
						  } Hours`
						: `${parseInt(
								(directionData?.routes[0]?.duration / 60).toFixed(0)
						  )} Minutes`}
				</span>
			</h2>
			{/* ) : null} */}
		</div>
	) : (
		<div></div>
	)
}

export default DistanceTime
