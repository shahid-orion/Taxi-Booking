import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

type Props = {}

const Navbar = (props: Props) => {
	return (
		<div className='flex justify-between p-3 px-10 border-b-[1px] border-blue-300 shadow-sm'>
			<div className='flex gap-10 items-center'>
				<Image src={logo} alt='logo' width={120} height={60} />
			</div>
			<div className='hidden md:flex gap-6'>
				<h2 className='hover:text-blue-300 font-semibold border border-blue-200 py-2 px-4 rounded-md cursor-pointer transition-all'>
					<a href='/'>Home</a>
				</h2>
				{/* <h2 className='hover:text-blue-300 p-2 rounded-md cursor-pointer transition-all'>
					History
				</h2>
				<h2 className='hover:text-blue-300 p-2 rounded-md cursor-pointer transition-all'>
					Help
				</h2> */}
			</div>
			<UserButton afterSignOutUrl='/' />
		</div>
	)
}

export default Navbar
