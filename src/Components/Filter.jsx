import './cssFiles/filter.css';
import { useGlobal } from '../Context/GlobalContext';
import { Box, Typography, Button, Divider, List, ListItem } from "@mui/material";
import { FormControl, RadioGroup, FormControlLabel, Radio, Checkbox } from "@mui/material";

import { FaFacebookF } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { RiInstagramFill } from 'react-icons/ri';

import Rating from '../Components/Rating';

const Filter = () => {

  // Get states from filterState
  const { filterState: { byStock, byFastDelivery, byRating, sort }, filterDispatch } = useGlobal();

  // Rating Func
  function handleRating(index) {
    filterDispatch({ type: 'SORT_BY_RATING', payload: index + 1 });
  }

  return (
    <Box className="filter-wrapper">
      <form
        noValidate
      >
        <Typography variant="h4">
          Filter
        </Typography>
        <Divider color="error" />
        <FormControl>
          <RadioGroup >
            <FormControlLabel
              value="Increasing Price"
              label="Increasing Price"
              control={<Radio color="secondary" />}
              onChange={() => filterDispatch({ type: 'SORT_BY_PRICE', payload: 'lowToHigh' })}
              checked={sort === 'lowToHigh' ? true : false}
            />
            <FormControlLabel
              value="Decreasing Price"
              label="Decreasing Price"
              control={<Radio color="secondary" />}
              onChange={() => filterDispatch({ type: 'SORT_BY_PRICE', payload: 'highToLow' })}
              checked={sort === 'highToLow' ? true : false}
            />
            <FormControlLabel
              label="In Stock Only"
              control={<Checkbox color="secondary" />}
              onChange={() => filterDispatch({ type: 'SORT_BY_STOCK' })}
              checked={byStock}
            />
            <FormControlLabel
              label="Fast Delivery Only"
              control={<Checkbox color="secondary" />}
              onChange={() => filterDispatch({ type: 'SORT_BY_DELIVERY' })}
              checked={byFastDelivery}
            />
          </RadioGroup>
        </FormControl>
      </form>
      <Box>
        <Typography variant="h6">
          Rating
        </Typography>
        {/* Rating Component */}
        <Rating
          rating={byRating}
          handleRating={handleRating}
          color='white'
        />
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{ height: 50 }}
        onClick={() => filterDispatch({ type: 'CLEAR_FILTERS' })}
      >
        Clear Filters
      </Button>

      <Typography variant="body1" sx={{ marginLeft: '20px', color: '#fafafa' }}>
        Media Links
      </Typography>
      <Divider color="error" sx={{ marginTop: '-10px' }} />
      <List sx={{ marginTop: '-30px' }}>
        <ListItem>
          <Button startIcon={<FaFacebookF style={{ color: '#f44336', fontSize: '25px' }} />} sx={{ color: '#fafafa' }}>
            Facebook
          </Button>
        </ListItem>
        <ListItem>
          <Button startIcon={<BsTwitter style={{ color: '#f44336', fontSize: '25px' }} />} sx={{ color: '#fafafa' }}>
            Twitter
          </Button>
        </ListItem>
        <ListItem>
          <Button startIcon={<RiInstagramFill style={{ color: '#f44336', fontSize: '25px' }} />} sx={{ color: '#fafafa' }}>
            Instagram
          </Button>
        </ListItem>
      </List>
    </Box>
  )
}

export default Filter