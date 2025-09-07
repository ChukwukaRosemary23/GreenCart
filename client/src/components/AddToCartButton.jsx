import { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from "react-icons/fa6"

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
  const [loading, setLoading] = useState(false)
  const cartItem = useSelector(state => state.cartItem.cart)
  const [isAvailableCart, setIsAvailableCart] = useState(false)
  const [qty, setQty] = useState(0)
  const [cartItemDetails, setCartItemsDetails] = useState()

  const handleADDTocart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.addTocart,
        data: {
          productId: data?._id
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        if (fetchCartItem) {
          fetchCartItem()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkingitem = cartItem.some(item => item.productId._id === data._id)
    setIsAvailableCart(checkingitem)
    const product = cartItem.find(item => item.productId._id === data._id)
    setQty(product?.quantity)
    setCartItemsDetails(product)
  }, [data, cartItem])

  const increaseQty = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await updateCartItem(cartItemDetails?._id, qty + 1)
    } catch (error) {
      console.error('Error increasing quantity:', error)
    }
  }

  const decreaseQty = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      if (qty === 1) {
        await deleteCartItem(cartItemDetails?._id)
      } else {
        await updateCartItem(cartItemDetails?._id, qty - 1)
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error)
    }
  }

  return (
    <div className="w-full">
      {isAvailableCart ? (
        <div className="flex items-center justify-center gap-1 max-w-full">
          <button
            onClick={decreaseQty}
            className="bg-green-600 hover:bg-green-700 text-white w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
          >
            <FaMinus size={10} />
          </button>
          <span className="font-semibold text-sm px-2 min-w-0 text-center flex-shrink-0">
            {qty}
          </span>
          <button
            onClick={increaseQty}
            className="bg-green-600 hover:bg-green-700 text-white w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
          >
            <FaPlus size={10} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleADDTocart}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm w-full"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  )
}

export default AddToCartButton