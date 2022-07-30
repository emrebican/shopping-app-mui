import { useGlobal } from '../Context/GlobalContext';
import { Card, CardContent, CardMedia } from '@mui/material';
import { Typography } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';

// icons
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';

import Rating from './Rating';

const Product = ({ product }) => {

    const { state: { cart }, dispatch } = useGlobal();

    return (
        <Card elevation={5}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.title}
                />
                <CardContent>
                    <Typography variant="h5">
                        {product.title.length > 16
                            ? (product.title.slice(0, 16) + '...')
                            : (product.title)
                        }
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
                        <b>$ {product.price.split('.')[0]}</b>
                        <LocalOfferRoundedIcon sx={{ fontSize: '20px' }} />
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: '12px' }} >
                        {product.fastDelivery
                            ? 'Fast Delivery'
                            : `${product.deliveryTime} Days of Delivery`
                        }
                    </Typography>
                    <Typography variant="caption">
                        Stock: {product.inStock}
                    </Typography>
                    <Rating rating={product.ratings} color="secondary" />
                </CardContent>
            </CardActionArea>
            <CardActions>
                {cart.some(p => p.id === product.id)
                    ?
                    <Button
                        variant="contained"
                        size="medium"
                        color='error'
                        startIcon={<DeleteForeverRoundedIcon />}
                        onClick={() => dispatch({ type: 'DELETE_FROM_CART', payload: product.id })}
                    >
                        Delete
                    </Button>
                    :
                    <Button
                        disabled={!product.inStock}
                        variant="contained"
                        size="small "
                        startIcon={product.inStock ? <AddIcon /> : ''}
                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                    >
                        {!product.inStock ? 'Out Of Stock' : 'Add to Cart'}
                    </Button>
                }
            </CardActions>
        </Card>
    )
}

export default Product;