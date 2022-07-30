import './cssFiles/footer.css';
import { Box } from '@mui/system';
import { Container, Grid, Typography, Button, List, ListItem, Divider, Link } from '@mui/material';
import { FormControl, NativeSelect } from '@mui/material';

import { AiFillFacebook } from 'react-icons/ai';
import { CgTwitter } from 'react-icons/cg';
import { ImInstagram } from 'react-icons/im';

const Footer = () => {
    return (
        <Box className="footer">
            <Container size="md">
                <Grid container>
                    <Grid xs={6} md={4} item className="grid-item">
                        <List sx={{ padding: 0 }}>
                            <ListItem>
                                <Typography variant='h6'>
                                    Links
                                    <Divider color="error" />
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Button startIcon={<AiFillFacebook className='link' style={{ fontSize: '30px' }} />} color="error" >
                                    Facebook
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button startIcon={<CgTwitter className='link' style={{ fontSize: '30px' }} />} color="error" >
                                    Twitter
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button startIcon={<ImInstagram className='link' style={{ fontSize: '30px' }} />} color="error" >
                                    Instagram
                                </Button>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid xs={6} md={4} item className="grid-item">
                        <List>
                            <ListItem>
                                <Typography variant='h6'>
                                    Legal
                                    <Divider color="error" />
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Link href="#" sx={{ color: '#fafafa' }}>Terms</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" sx={{ color: '#fafafa' }}>Privacy</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" sx={{ color: '#fafafa' }}>Contact</Link>
                            </ListItem>

                        </List>
                    </Grid>

                    <Grid xs={6} md={4} item className="grid-item">
                        <div>
                            <ListItem>
                                <Typography variant='h6'>
                                    Language
                                    <Divider color="error" />
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <FormControl sx={{ width: '100px', backgroundColor: '#fafafa36', padding: '5px', borderRadius: '4px' }}>
                                    <NativeSelect
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        color="error"
                                        sx={{ color: '#fafafa' }}
                                        defaultValue='English'
                                    >
                                        <option style={{ color: '#212121' }} >English</option>
                                        <option style={{ color: '#212121' }} >French</option>
                                        <option style={{ color: '#212121' }} >German</option>
                                    </NativeSelect>
                                </FormControl>
                            </ListItem>
                        </div>
                    </Grid>
                    <Grid xs={12} item className='copy'>
                        <Typography variant='caption'>
                            This website is powered by React and Material UI
                        </Typography>
                        <Typography>
                            © Your Website 2022
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Footer