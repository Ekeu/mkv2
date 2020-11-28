import axios from 'axios'
import { CART_ADD_FOOD } from './cart.types'

export const addToCart = (_id, qty, topping, ship) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${_id}`)

    dispatch( {
        type: CART_ADD_FOOD,
        payload: {
            food: data._id,
            name: data._name,
            imageUrl: data.imageUrl,
            price: data.price,
            availability: data.availability,
            qty,
            topping,
            ship
        }
    })

    localStorage.setItem('cartFoods', JSON.stringify(getState().cart.cartFoods))
}