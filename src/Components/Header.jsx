import './cssFiles/header.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGlobal } from '../Context/GlobalContext';
import { AppBar, IconButton, Toolbar, Typography, Button, InputBase } from '@mui/material';
import { List, ListItem, ListItemText, Box } from '@mui/material';
import { Badge, Tooltip, Menu, MenuItem } from '@mui/material';
import { red } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';

// icons
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Menu Links
const menuLinks = [
    {
        text: 'Home',
        icon: <ShoppingBagRoundedIcon />,
        path: '/'
    },
    {
        text: 'Cart',
        icon: <ShoppingCartRoundedIcon />,
        path: '/cart'
    },
];

// Styles
const styles = {
    appBar: {
        backgroundColor: red[400]
    },
    item: {
        '&:hover': {
            color: '#fff'
        }
    },
    active: {
        color: '#fff',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 1,
    },
}

// SEARCH
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.2),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '18ch',
            '&:focus': {
                width: '22ch',
            },
        },
    },
}));

// BADGE
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${red[400]}`,
        padding: '0 4px',
    },
}));

// DROPDOWN
const StyledMenu = styled((props) => (
    <Menu
        elevation={3}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 4,
        marginTop: theme.spacing(3),
        minWidth: 180,
    },
}));

const Header = () => {

    // DropDown
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // State
    const { state: { cart }, filterState: { searchQuery }, dispatch, filterDispatch } = useGlobal();

    // Navigate
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <AppBar component="nav" sx={styles.appBar} className="appBar" >
            <Toolbar className="toolBar" >

                {/* LINKS */}
                <Box className="leftBox">
                    <Typography variant="h4">
                        <ShoppingBasketRoundedIcon className="logo" sx={{ fontSize: '50px' }} />Shop
                    </Typography>
                    <List className="list">
                        {menuLinks.map(link => (
                            <ListItem
                                key={link.text}
                                button
                                className="item"
                                onClick={() => navigate(link.path)}
                                sx={[styles.item, location.pathname === link.path && styles.active]}
                            >
                                <ListItemText primary={link.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box className="right-wrapper">
                    {/* SEARCH */}
                    <Search >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            variant="search"
                            value={searchQuery}
                            onChange={(e) => filterDispatch({
                                type: 'SORT_BY_SEARCHING',
                                payload: e.target.value
                            })}
                        />
                    </Search>

                    {/* DROPDOWN */}
                    <Button
                        id="demo-customized-button"
                        color="secondary"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        className="menu-btn"
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon sx={{ marginLeft: '10px' }} />}
                    >
                        <Tooltip title="your cart">
                            <StyledBadge badgeContent={cart.length ? cart.length : '0'} color="secondary">
                                <ShoppingCartRoundedIcon />
                            </StyledBadge>
                        </Tooltip>
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {cart.length > 0
                            ? (<>
                                {cart.map(item => (
                                    <MenuItem key={item.id} className="menu-item" sx={{ display: 'flex', justifyContent: 'space-between', }}>
                                        <img src={item.image} alt={item.title} className="menu-img" />
                                        <section className="menu-content">
                                            <Typography>{item.title}</Typography>
                                            <Typography variant="body2"><b>${item.price.split('.')[0]}</b></Typography>
                                        </section>
                                        <Tooltip title="delete">
                                            <IconButton color="error">
                                                <DeleteSharpIcon onClick={() => dispatch({ type: 'DELETE_FROM_CART', payload: item.id })} />
                                            </IconButton>
                                        </Tooltip>
                                    </MenuItem>
                                ))}
                                {cart.length > 0 &&
                                    < Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{ width: '90%', marginX: '16px', marginTop: '10px' }}
                                        onClick={() => navigate('/cart')}
                                    >
                                        Go to Cart
                                    </Button>}
                            </>
                            )
                            : (
                                <Typography sx={{ textAlign: 'center' }}>Cart is empty</Typography>
                            )
                        }
                    </StyledMenu>
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Header