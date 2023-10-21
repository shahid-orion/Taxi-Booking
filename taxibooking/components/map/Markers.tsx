import React, { useContext } from 'react'
import { UserLocationContext } from '@/context/UserLocationContext'
import { Map, Marker } from 'react-map-gl'
import { SourceCordiContext } from '@/context/SourceCordiContext'
import { DestinationCordiContext } from '@/context/DestinationCordiContext'

type Props = {}

const Markers = (props: Props) => {
	const { userLocation, setUserLocation } = useContext(UserLocationContext)

	//context: to share the source and destination values across the project
	const { sourceCoordinates, setSourceCoordinates } =
		useContext(SourceCordiContext)
	const { destinationCoordinates, setDestinationCoordinates } = useContext(
		DestinationCordiContext
	)

	return (
		<div>
			{/* User marker */}
			{sourceCoordinates.length !== 0 ? (
				<Marker
					longitude={sourceCoordinates?.lng}
					latitude={sourceCoordinates?.lat}
					anchor='bottom'
				>
					<img src='./pin.png' className='w-10 h-10' />
				</Marker>
			) : null}

			{/* Source Marker */}
			{destinationCoordinates.length !== 0 ? (
				<Marker
					longitude={destinationCoordinates?.lng}
					latitude={destinationCoordinates?.lat}
					anchor='bottom'
				>
					<img src='./pin.png' className='w-10 h-10' />
				</Marker>
			) : null}

			{/* destination */}
			<Marker
				longitude={userLocation?.lng}
				latitude={userLocation?.lat}
				anchor='bottom'
			>
				<img src='./pin.png' className='w-10 h-10' />
			</Marker>
		</div>
	)
}

export default Markers
