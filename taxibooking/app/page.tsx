'use client'

import Booking from '@/components/booking/Booking'
import MapboxMap from '@/components/map/MapboxMap'
import { DestinationCordiContext } from '@/context/DestinationCordiContext'
import { DirectionDataContext } from '@/context/DirectionDataContext'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'
import { SourceCordiContext } from '@/context/SourceCordiContext'
import { UserLocationContext } from '@/context/UserLocationContext'
import { useEffect, useState } from 'react'

export default function Home() {
	const [userLocation, setUserLocation] = useState<any>(null)
	const [sourceCoordinates, setSourceCoordinates] = useState<any>([])
	const [destinationCoordinates, setDestinationCoordinates] = useState<any>([])
	const [directionData, setDirectionData] = useState<any>([])
	const [carAmount, setCarAmount] = useState<any>()

	//using context for location service
	useEffect(() => {
		const getUserLocation = () => {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					setUserLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					})
					// console.log('POSITION', position)
				},
				function (error) {
					console.error('Error getting user location:', error)
				}
			)
		}

		getUserLocation() // Call the function to get user location when the component mounts

		// Optionally, you can clear the watch position when the component unmounts.
		// This is useful to conserve resources if you no longer need location updates.
		// navigator.geolocation.clearWatch(watchId);
	}, [])

	return (
		<div>
			<UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
				<SourceCordiContext.Provider
					value={{ sourceCoordinates, setSourceCoordinates }}
				>
					<DestinationCordiContext.Provider
						value={{ destinationCoordinates, setDestinationCoordinates }}
					>
						<DirectionDataContext.Provider
							value={{ directionData, setDirectionData }}
						>
							<SelectedCarAmountContext.Provider
								value={{ carAmount, setCarAmount }}
							>
								<div className='grid grid-cols-1 md:grid-cols-12'>
									<div className='col-span-5 bg-blue-300'>
										<Booking />
									</div>
									<div className='col-span-7'>
										<MapboxMap />
									</div>
								</div>
							</SelectedCarAmountContext.Provider>
						</DirectionDataContext.Provider>
					</DestinationCordiContext.Provider>
				</SourceCordiContext.Provider>
			</UserLocationContext.Provider>
		</div>
	)
}
