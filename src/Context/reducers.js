// Cart Reducer
export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }]
            }
        case 'DELETE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }
        case 'CHANGE_QUANTITY':
            return {
                ...state,
                cart: state.cart.filter(c => c.id === action.payload.id ? c.quantity = action.payload.quantity : c.quantity)
            }
        default:
            return state
    }
}


// ------------------------------- FOR FILTER ------------------------------- //

export const filterReducer = (state, action) => {
    switch (action.type) {
        case 'SORT_BY_PRICE':
            return {
                ...state,
                sort: action.payload
            }
        case 'SORT_BY_STOCK':
            return {
                ...state,
                byStock: !state.byStock
            }
        case 'SORT_BY_DELIVERY':
            return {
                ...state,
                byFastDelivery: !state.byFastDelivery
            }
        case 'SORT_BY_RATING':
            return {
                ...state,
                byRating: action.payload
            }
        case 'SORT_BY_SEARCHING':
            return {
                ...state,
                searchQuery: action.payload
            }
        case 'CLEAR_FILTERS':
            return {
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                searchQuery: ''
            }
        default:
            return state;
    }
}