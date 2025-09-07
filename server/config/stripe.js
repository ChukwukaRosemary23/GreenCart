import Paystack from 'paystack-api'

const paystackInstance = Paystack(process.env.PAYSTACK_SECRET_KEY)

export default paystackInstance