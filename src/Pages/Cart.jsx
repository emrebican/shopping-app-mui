import './cssFiles/cart.css';
import { useEffect, useState } from "react";
import { useGlobal } from "../Context/GlobalContext";
import { Container, Paper, Box, Typography, Button, IconButton } from "@mui/material";
import { MenuItem, FormControl, Select } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// icons
import DeleteIcon from '@mui/icons-material/Delete';

import Rating from '../Components/Rating';

const Cart = () => {

    const { state: { cart }, dispatch } = useGlobal();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1000)

    // Total Price
    useEffect(() => {
        setTotal(cart.reduce((total, curr) => Number(total) + Number(curr.price) * Number(curr.quantity), 0))
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [cart])

    console.log(cart)

    // Cart empty
    const empty = cart.length === 0 && 'none'

    return (

        loading
            ?
            (
                <Box sx={{ display: 'flex', width: '100%', height: '67vh', alignItems: 'center', justifyContent: 'center' }} >
                    <CircularProgress color="error" />
                </Box >
            )
            : (

                < Box sx={styles.wrapper
                } className="cart-wrapper" >
                    {/* Cart */}
                    < Container maxWidth="md" sx={{ display: empty }
                    }>
                        {
                            cart.map(item => (
                                <Paper key={item.id} elevation={3} className="cart-paper">
                                    <Box sx={styles.rightSide}>
                                        <img src={item.image} alt={item.title} className="cart-image" />
                                        <Box>
                                            <Typography variant="body1">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                <b>$ {item.price.split('.')[0]}</b>
                                            </Typography>
                                            <Typography variant="caption">
                                                Stock: {item.inStock}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography>
                                        Rating<Rating rating={item.ratings} />
                                    </Typography>
                                    <FormControl sx={{ m: 1, minWidth: 80 }} size="small" color="error">
                                        <Select
                                            value={item.quantity}
                                            onChange={(e) => dispatch({
                                                type: 'CHANGE_QUANTITY',
                                                payload: {
                                                    id: item.id, quantity: e.target.value
                                                }
                                            })}
                                        >
                                            {[...Array(item.inStock).keys()].map(i => (
                                                <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <IconButton
                                        onClick={() => dispatch({ type: 'DELETE_FROM_CART', payload: item.id })}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Paper>
                            ))
                        }
                    </Container >
                    {/* Total Price */}
                    < Box className='cart-totalPrice' >
                        {
                            cart.length > 0
                                ? <Typography variant="h4">
                                    You have ({cart.length}) {cart.length === 1 ? 'Product' : 'Products'} in Cart
                                </Typography>
                                : <Typography variant="h4">
                                    You have no products in Cart
                                </Typography>
                        }
                        < Typography variant="h5" >
                            Total Price: <b>$ {total}</b>
                        </Typography >
                        <Button
                            variant="contained"
                            className='cart-button'
                            color="error"
                            disabled={empty}
                        >
                            {empty ? 'Cart is empty' : 'Complete Shopping'}
                        </Button>
                    </Box >
                </Box >
            )
    )
}

export default Cart;

const styles = {
    rightSide: {
        display: 'flex',
        alignItems: 'center',
        gap: 3,
    }
}