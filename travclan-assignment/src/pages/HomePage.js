import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button, CircularProgress, Card, CardContent, IconButton, CardMedia, Avatar, CardHeader, FormControlLabel,Switch , Typography, Link} from '@material-ui/core';
import HideAppBar from '../components/Appbar';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Grid from '@material-ui/core/Grid';



function HomePage() {
    const [loading, changeloading] = useState(true);
    const [customers, updateCustomer] = useState(null);
    const [page, setPage] = useState(1);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(5);
    const [sort, setSortOrder] = useState(false);
    const [descending, changeDescending] = useState(false);
    const handleChange = (event, value) => {
        setPage(value);
        
        
    };
    const changeSort = (event, value) => {
        
        setSortOrder(value);
        
        
    };
    const changeDesc = (event, value) => {
        
        changeDescending(value);
        
        
    };
    useEffect(() => {
        changeloading(true);
        setStart((page - 1) * 5 + 1);
        setEnd(page * 5);
        var str = "https://intense-tor-76305.herokuapp.com/merchants"
        let data = axios
            .get(str)
            .then(
                (result) => {
                    //console.log(result);
                    changeloading(false)
                    // updateCustomer(result.data.slice(start-1,end).map(element => element.push({max:Math.max(...element.bids.map(x => x.amount) ) }) ));
                    
                    result.data.map(element => element.max=Math.max(...element.bids.map(x => x.amount)));
                    result.data.map(element => element.min=Math.min(...element.bids.map(x => x.amount)));
                    descending === true ? result.data.sort((a, b) => {
                        return b.max - a.max;
                    }):
                    result.data.sort((a, b) => {
                        return a.max - b.max;
                    });
                    updateCustomer(result.data)
                    
                },
                (error) => {

                    console.log("test");
                }
            )
    }, [page,descending]
    );
    
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        }
    });

    const classes = useStyles();
    {var i=0}
    return (
        <>
            <HideAppBar />
            <FormControlLabel
                control={<Switch checked={sort} onChange={changeSort}  />}
                label="Show Minimum Bids"
                />
            <FormControlLabel
                control={<Switch checked={descending} onChange={changeDesc}  />}
                label="Show Descending Order"
                />
            {
                loading === true || customers == null ? <div className="center"><CircularProgress /></div> : 
                    <div>
                        <div>

                        <Grid container spacing={3}>
                            {
                              
                               customers.slice(start-1,end).map(element=>
                                   
                                        <Grid item xs={12} sm={6} lg={4}>
                                            <Card className={classes.root}>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" >
                                                            {element.firstname[0]}
                                                        </Avatar>
                                                    }
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            {element.hasPremium === true ? <StarIcon /> : <StarBorderIcon />}
                                                        </IconButton>
                                                    }
                                                    title={element.firstname + " " + element.lastname}
                                                />
                                                <CardMedia
                                                    image={element.avatarUrl}
                                                    title={element.firstname + " " + element.lastname} className={classes.media}
                                                />
                                                <CardContent>{  }
                                                  <Typography>{sort==false  ? Math.max(...element.bids.map(x => x.amount)) : Math.min(...element.bids.map(x => x.amount))}
                                                    </Typography>
                                                    <Link href={element.id}  variant="body2">Show More </Link>
                                                    </CardContent>
                                            </Card>
                                        </Grid>
                                
                                    
                        )
                            }


                        </Grid> 
                        
                        <Pagination count={3} page={page} variant="outlined" color="primary" onChange={handleChange} />
                    </div> </div>
            }
            
        </>
    );
}

export default HomePage;