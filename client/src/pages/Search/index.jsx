    import React, { useEffect } from 'react';
    import { useLocation, useNavigate } from 'react-router-dom';
    import PropTypes from 'prop-types';
    import { connect, useDispatch } from 'react-redux';
    import { createStructuredSelector } from 'reselect';
    import Box from '@mui/material/Box';
    import Card from '@mui/material/Card';
    import Typography from '@mui/material/Typography';
    import List from '@mui/material/List';
    import ListItem from '@mui/material/ListItem';
    import ListItemButton from '@mui/material/ListItemButton';
    import ListItemIcon from '@mui/material/ListItemIcon';
    import ListItemText from '@mui/material/ListItemText';
    import CardMedia from '@mui/material/CardMedia';

    import { getItemSearch } from './actions';
    import { selectItemBySearch } from './selectors';
    import { getCategoryData } from '@pages/Admin/Category Data/actions';
    import { selectCategoryData } from '@pages/Admin/Category Data/selectors';

    import Slider from '@components/Carousel';
    import CardItem from '@components/Card';

    import classes from './style.module.scss';

    const Search = ({ category, itemBySearch }) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const location = useLocation();
        
        const searchParams = new URLSearchParams(location.search);
        const nameParam = searchParams.get('item') || '';
        const categoryParam = searchParams.get('category') || '';
        
        useEffect(() => {
            dispatch(getCategoryData());
        }, [dispatch]);

        useEffect(() => {
            dispatch(getItemSearch( nameParam, categoryParam ));
        }, [nameParam, categoryParam]);

    return (
        <Box className={classes.container}>
            <Slider />
            <Box className={classes.contentContainer}>
                <Card className={classes.cardContent}>
                    <Typography variant='p' component='div' sx={{ fontWeight: 'bolder' }}>
                        Kategori
                    </Typography>
                    <nav>
                        <List>
                            {category && Array.isArray(category) && category?.map((ctr, index) =>(
                            <ListItem key={index} onClick={() =>  navigate(`/search?item=${nameParam}&category=${ctr.id}`)}     >
                                <ListItemButton sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <ListItemIcon>
                                        <CardMedia 
                                            component="img"
                                            height="20"
                                            width="20"
                                            image={ctr.icon}
                                            alt={ctr.name}
                                            sx={{ objectFit: "contain" }} 
                                        />
                                    </ListItemIcon>
                                    <ListItemText>{ctr.name}</ListItemText>
                                </ListItemButton>
                                </ListItem>
                            ))} 
                        </List>
                    </nav>
                </Card>
                {itemBySearch ? 
                    <Box className={classes.cardContainer}>
                        { itemBySearch?.map((item, index) => (
                            <CardItem key={index} itemData={item}/>
                        ))}
                    </Box> :
                    <Card className={classes.cardNotFound}>
                        <Typography variant='p' component='div' sx={{ fontWeight: 'bolder', fontSize: '25px' }}>
                            Tidak Menemukan
                        </Typography>
                    </Card>
                }
            </Box>
        </Box>
    )
    }

    Search.propTypes = {
        category: PropTypes.array,
        itemBySearch: PropTypes.array
    };
    
    const mapStateToProps = createStructuredSelector({
        category: selectCategoryData,
        itemBySearch: selectItemBySearch
    })

    export default connect(mapStateToProps)(Search);
    