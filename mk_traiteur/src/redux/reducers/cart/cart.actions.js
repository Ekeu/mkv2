import axios from 'axios'
import { CART_ADD_FOOD } from './cart.types'

export const addToCart = (_id, qty, topping, ship) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/foods/${_id}`)

    dispatch( {
        type: CART_ADD_FOOD,
        payload: {
            _id: data._id,
            name: data.name,
            imageUrl: data.imageUrl,
            price: data.price,
            availability: data.availability,
            toppings: data.toppings,
            qty,
            topping,
            ship
        }
    })

    localStorage.setItem('cartFoods', JSON.stringify(getState().cart.cartFoods))
}