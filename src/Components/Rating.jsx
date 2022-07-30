import { Box } from '@mui/material';

// icons
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

const Rating = ({ rating, handleRating, color }) => {

    return (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRating(index)}
                >
                    {rating > index
                        ? (<StarRoundedIcon style={{ fontSize: '18px', color: color }} />)
                        : (<StarBorderRoundedIcon style={{ fontSize: '18px', color: color }} />)
                    }
                </span>
            ))}
        </Box>
    )
}

export default Rating