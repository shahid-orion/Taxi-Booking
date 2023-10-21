'use client'
import React, { useContext, useEffect, useRef } from 'react'
import Map, { FullscreenControl, Marker } from 'react-map-gl'
import { UserLocationContext } from '@/context/UserLocationContext'
import 'mapbox-gl/dist/mapbox-gl.css'
import Markers from './Markers'
import { SourceCordiContext } from '@/context/SourceCordiContext'
import { DestinationCordiContext } from '@/context/DestinationCordiContext'
import { DirectionDataContext } from '@/context/DirectionDataContext'
import MapboxRoute from './MapboxRoute'
import DistanceTime from './DistanceTime'

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
//direction endpoint
const MAPBOX_DRIVING_ENDPOINT =
	'https://api.mapbox.com/directions/v5/mapbox/driving/'
const session_token = '5ccce4a4-ab0a-4a7c-943d-580e55542363'

type Props = {}

const MapboxMap = (props: Props) => {
	const { userLocation, setUserLocation } = useContext(UserLocationContext)
	const { directionData, setDirectionData } = useContext(DirectionDataContext)
	const mapRef = useRef<any>(null)

	//context: to share the source and destination values across the project
	const { sourceCoordinates, setSourceCoordinates } =
		useContext(SourceCordiContext)
	const { destinationCoordinates, setDestinationCoordinates } = useContext(
		DestinationCordiContext
	)

	// console.log(sourceCoordinates, destinationCoordinates)

	//USE EFFECT FOR FLY TO MARKER SOURCE
	useEffect(() => {
		if (sourceCoordinates) {
			mapRef.current?.flyTo({
				center: [sourceCoordinates.lng, sourceCoordinates.lat],
				duration: 2500,
			})
		}
	}, [sourceCoordinates])
	//USE EFFECT FOR FLY TO DESTINATION MARKER
	useEffect(() => {
		if (destinationCoordinates) {
			mapRef.current?.flyTo({
				center: [destinationCoordinates.lng, destinationCoordinates.lat],
				duration: 2500,
			})
		}

		if (sourceCoordinates && destinationCoordinates) {
			getDirectionRoute()
		}
	}, [destinationCoordinates])

	//getting the start & end coordinates->pass them to setDirectionData useContext to
	//make them available across the project
	const getDirectionRoute = async () => {
		const res = await fetch(
			MAPBOX_DRIVING_ENDPOINT +
				sourceCoordinates.lng +
				',' +
				sourceCoordinates.lat +
				';' +
				destinationCoordinates.lng +
				',' +
				destinationCoordinates.lat +
				'?annotations=maxspeed&overview=full&geometries=geojson&access_token=' +
				process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		const result = await res.json()
		// console.log('DIRECTION', result)
		setDirectionData(result)
	}

	return (
		<div className='p-5'>
			<h2 className='text-lg font-semibold'>Map from mapbox</h2>
			<div className='rounded-lg overflow-hidden mt-5'>
				{userLocation && (
					<Map
						ref={mapRef}
						mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
						initialViewState={{
							longitude: userLocation?.lng,
							latitude: userLocation?.lat,
							zoom: 14,
						}}
						style={{ width: '100%', height: 450, borderRadius: 10 }}
						mapStyle='mapbox://styles/mapbox/streets-v9'
					>
						<Markers />
						{directionData?.routes ? (
							<MapboxRoute
								coordinates={directionData?.routes[0]?.geometry?.coordinates}
							/>
						) : null}
					</Map>
				)}
			</div>

			<div className='pt-2 bottom-10 z-20 right-5'>
				<DistanceTime />
			</div>
		</div>
	)
}

export default MapboxMap
