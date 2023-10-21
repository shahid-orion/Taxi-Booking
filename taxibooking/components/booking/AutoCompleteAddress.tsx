'use client'

import { NextResponse } from 'next/server'
import React, { useContext, useEffect, useState } from 'react'
import { DestinationCordiContext } from '@/context/DestinationCordiContext'
import { SourceCordiContext } from '@/context/SourceCordiContext'

const session_token = '5ccce4a4-ab0a-4a7c-943d-580e55542363'
const MAPBOX_RETRIVE_URL =
	'https://api.mapbox.com/search/searchbox/v1/retrieve/'
//direction endpoint
const MAPBOX_DRIVING_ENDPOINT =
	'https://api.mapbox.com/directions/v5/mapbox/driving/'

type Props = {}

const AutoCompleteAddress = (props: Props) => {
	const [source, setSource] = useState<any>()
	const [destination, setDestination] = useState<any>()
	const [addressList, setAddressList] = useState<any>([])
	//source and destination change
	const [sourceChange, setSourceChange] = useState<any>(false)
	const [destinationChange, setDestinationChange] = useState<any>(false)

	//context: to share the source and destination values across the project
	const { sourceCoordinates, setSourceCoordinates } =
		useContext(SourceCordiContext)
	const { destinationCoordinates, setDestinationCoordinates } = useContext(
		DestinationCordiContext
	)

	//we need to call the function
	useEffect(() => {
		const delayedFn = setTimeout(() => {
			getAddressList()
		}, 1000)

		return () => clearTimeout(delayedFn)
	}, [source, destination])

	//Retrieve Start coordinates
	const onSourceAddressClick = async (item: any) => {
		setSource(item.full_address)
		setAddressList([])
		setSourceChange(false)
		const res = await fetch(
			MAPBOX_RETRIVE_URL +
				item.mapbox_id +
				'?session_token=' +
				session_token +
				'&access_token=' +
				process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
		)

		const result = await res.json()

		setSourceCoordinates({
			lng: result.features[0].geometry.coordinates[0],
			lat: result.features[0].geometry.coordinates[1],
		})
		// console.log('SOURCE ', sourceCoordinates)
	}
	//Retrieve destination coordinates
	const onDestinationAddressClick = async (item: any) => {
		setDestination(item.full_address)
		setAddressList([])
		setDestinationChange(false)
		const res = await fetch(
			MAPBOX_RETRIVE_URL +
				item.mapbox_id +
				'?session_token=' +
				session_token +
				'&access_token=' +
				process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
		)

		const result = await res.json()

		setDestinationCoordinates({
			lng: result.features[0].geometry.coordinates[0],
			lat: result.features[0].geometry.coordinates[1],
		})
		// console.log('DESTINATION ', destinationCoordinates)
	}

	const getAddressList = async () => {
		setAddressList([])
		const encodedSource = encodeURIComponent(source) // Encode the source parameter
		const query = sourceChange ? encodedSource : destination
		const res = await fetch('/api/search-address?q=' + query, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		// if (source?.trim() !== '') {
		// 	const result = await res.json()
		// 	setAddressList(result)
		// } else {
		// 	setAddressList(null)
		// }
		const result = await res.json()
		// console.log('SOURCE/DESTINATION', result)
		setAddressList(result)
	}

	return (
		<div className='mt-5'>
			<div className='relative'>
				<label className='text-gray-800 '>Where From?</label>
				<input
					type='text'
					className='bg-white p-1 border-[1px] w-full rounded-md outline-none ring-1 text-center'
					value={source}
					onChange={(e) => {
						setSource(e.target.value)
						setSourceChange(true)
					}}
				/>

				{addressList?.suggestions && sourceChange && source !== '' ? (
					<div className='shadow-md p-1 rounded absolute w-full bg-white z-50'>
						{addressList?.suggestions.map((item: any, index: number) => (
							<h2
								className='p-2 m-2 w-fit hover:bg-blue-200 hover:font-bold hover:z-40 hover:text-black rounded-md cursor-pointer'
								key={index}
								onClick={() => onSourceAddressClick(item)}
							>
								{item.full_address}
							</h2>
						))}
					</div>
				) : null}
			</div>

			<div className='mt-3 relative'>
				<label className='text-gray-800'>Where To?</label>
				<input
					type='text'
					className='bg-white p-1 border-[1px] w-full rounded-md outline-none ring-1 text-center'
					value={destination}
					onChange={(e) => {
						setDestination(e.target.value)
						setDestinationChange(true)
					}}
				/>
				{addressList?.suggestions && destinationChange && destination !== '' ? (
					<div className='shadow-md p-1 rounded absolute w-full bg-white z-50'>
						{addressList?.suggestions.map((item: any, index: number) => (
							<h2
								className='p-2 m-2 w-fit hover:bg-blue-200 hover:font-bold hover:z-40 hover:text-black rounded-md cursor-pointer'
								key={index}
								onClick={() => onDestinationAddressClick(item)}
							>
								{item.full_address}
							</h2>
						))}
					</div>
				) : null}
			</div>
		</div>
	)
}

export default AutoCompleteAddress
