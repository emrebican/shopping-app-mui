import './cssFiles/main.css';
import { useEffect, useState } from 'react';
import { useGlobal } from "../Context/GlobalContext";
import { Box, Container, Grid, IconButton } from "@mui/material";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import CircularProgress from '@mui/material/CircularProgress';

import Filter from '../Components/Filter';
import Product from "../Components/Product";

const Main = () => {

    // States
    const {
        state: { products },
        filterState: { sort, byStock, byFastDelivery, byRating, searchQuery },
    } = useGlobal();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [])

    // Filter işlemlerini sağlayacak fonksiyon
    const filteredProducts = () => {
        let sortedProducts = products;

        // Price sort
        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) => (
                sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
            ));
        }

        // Stock sort
        if (byStock) {
            sortedProducts = sortedProducts.filter(item => item.inStock);
        }

        // Sort fastDelivery
        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter(item => item.fastDelivery);
        }

        // Sort Rating
        if (byRating) {
            sortedProducts = sortedProducts.filter(item => item.ratings >= byRating);
        }

        if (searchQuery) {
            sortedProducts = sortedProducts.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return sortedProducts;
    }

    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false)
    }, 1000)

    return (
        <Box className="main-wrapper">
            {/* Filter */}
            <Filter />

            {/* Products */}
            {loading
                ? (
                    <Box sx={{ display: 'flex', width: '1500px', height: '50vh', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress color="error" />
                    </Box>
                )
                : (
                    <Container maxWidth="lg">
                        <Grid container spacing={3}>
                            {filteredProducts().map(product => (
                                <Grid key={product.id} item sm={12} md={4} lg={3}>
                                    <Product product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container >
                )
            }
            <Box className="upButton" >
                <IconButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <ExpandCircleDownIcon sx={{ fontSize: '50px' }} color="secondary" />
                </IconButton>
            </Box>
        </Box >
    )
}

export default Main