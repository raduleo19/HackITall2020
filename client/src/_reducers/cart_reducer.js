import {
    ADD_TO_CART_NO_AUTH, GET_CART_ITEMS_USER, GET_CART_ITEMS_NO_AUTH
} from '../_actions/types';

const initialState = {
    cart: [],
};

export default function cart(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART_NO_AUTH:
            let x = state.cart;
            let duplicate = false;
            if (x.length > 0) {
                x.forEach((cartItem) => {
                    if (cartItem.id === action.payload) {
                        duplicate = true;
                        cartItem.quantity += 1
                    }
                })
                if (!duplicate) {
                    let item = {
                        id: action.payload,
                        quantity: 1
                    }
                    return { ...state, cart: [...state.cart, item] }
                }
            }
            else {
                let item = {
                    id: action.payload,
                    quantity: 1
                }
                return { ...state, cart: [item] }
            }

            return { ...state, cart: [...x] };
        case GET_CART_ITEMS_NO_AUTH:
            return {
                ...state, cartDetail: action.payload
            }
        default:
            return state;
    }
}