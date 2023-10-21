import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

type Props = {}

const CheckoutForm = (props: Props) => {
	const stripe = useStripe()
	const elements = useElements()

	const handleSubmit = async (event: any) => {
		event.preventDefault()
		if (elements === null) return

		const { error: submitError } = await elements.submit()
		if (submitError) return

		//create the paymentIntent and clientSecret
		const res = await fetch('/api/create-intent', {
			method: 'POST',

			body: JSON.stringify({
				amount: 120,
				// currency: 'usd',
				// description: 'test payment'
			}),
		})
		const secretKey = await res.json()
		console.log(secretKey)

		const { error }: any = await stripe?.confirmPayment({
			clientSecret: secretKey,
			elements,
			confirmParams: {
				return_url: 'http://localhost:3000/',
			},
		})
	}
	return (
		<div className='flex flex-col justify-center items-center w-full mt-6'>
			<form onSubmit={handleSubmit} className='max-w-md'>
				<PaymentElement />
				<button
					type='submit'
					disabled={!stripe || !elements}
					className='w-full bg-green-300 p-2 mt-2 rounded'
				>
					Pay
				</button>
			</form>
		</div>
	)
}

export default CheckoutForm
