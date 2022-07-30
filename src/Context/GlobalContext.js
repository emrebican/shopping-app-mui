import { createContext, useContext, useReducer } from "react";
import { faker } from '@faker-js/faker';

import { cartReducer } from "./reducers";
import { filterReducer } from "./reducers";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    faker.seed(99);

    // Create fake date with FAKER
    const products = [...Array(24)].map(() => (
        {
            id: faker.datatype.uuid(),
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            image: faker.image.image(),
            inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
            fastDelivery: faker.datatype.boolean(),
            deliveryTime: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
            ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5])
        }
    ));

    const initialState = {
        products,
        cart: [],
    }

    // for Data 
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // for FILTER
    const [filterState, filterDispatch] = useReducer(filterReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: ''
    })

    return (
        <GlobalContext.Provider value={{
            state,
            dispatch,
            filterState,
            filterDispatch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobal = () => useContext(GlobalContext);