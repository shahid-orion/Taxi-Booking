'use client'

import CheckoutForm from '@/components/payment/CheckoutForm'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import React, { useContext } from 'react'

type Props = {}

const Payment = (props: Props) => {
	//Stripe
	const stripePromise = loadStripe(
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any
	)
	const options: any = {
		mode: 'payment',
		amount: 58,
		currency: 'aud',
	}

	return (
		<Elements stripe={stripePromise} options={options}>
			<CheckoutForm />
		</Elements>
	)
}

export default Payment
