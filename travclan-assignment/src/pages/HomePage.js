import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, CircularProgress, Card, CardContent, IconButton, CardMedia, Avatar, CardHeader} from '@material-ui/core';
import HideAppBar from '../components/Appbar';
import {Pagination} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Grid from '@material-ui/core/Grid';



function HomePage() {
    const [loading, changeloading] = useState(true);
    const [customers, updateCustomer] = useState(null);
    const [page, setPage] = useState("1");
    const handleChange = (event, value) => {
        setPage(value);
      };
    useEffect(() => {
        var str = "https://intense-tor-76305.herokuapp.com/merchants"

        let data = axios
            .get(str)

            .then(
                (result) => {
                    //console.log(result);
                    changeloading(false)
                    updateCustomer(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {

                    console.log("test");



                })
    }, []);

    // componentWillMount() {
    //     this.getresponse();
    // }
    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
      });

    const classes = useStyles();
    return (

        <>
        <HideAppBar/ >
            {
                
                loading === true || customers == null ? <div class="center"><CircularProgress /></div> :



                    <div>
                        {console.log(customers.data.length)}

                        <div>
                            <p>This is your awesome HomePage subtitle</p>
                        </div>
                        
                        <Grid container spacing={3}>{
                        customers.data.map(element => 
                            
                         
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
              {element.hasPremium == true ? <StarIcon /> : <StarBorderIcon/>}
            </IconButton>
          }
        
        title={element.firstname +" "+ element.lastname}
        
      />
      <CardMedia
        
        image={element.avatarUrl}
        title={element.firstname +" "+ element.lastname}className={classes.media}
      />
      <CardContent>
        
      </CardContent>
      
    </Card>
    </Grid>
                        ) }
                        
                        </Grid>
                        <Pagination count={10} variant="outlined" color="primary"  onChange={handleChange} />
                    </div>

            }
        </>

    );

}

// async getresponse() {
//     // const c = this.state.query;

// }

export default HomePage;