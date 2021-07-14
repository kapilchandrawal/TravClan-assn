import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HideAppBar from '../components/Appbar';
import axios from 'axios';
import { Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import Grid from '@material-ui/core/Grid';
import   '../App.css';
import UserBidAccordion from '../components/UserBidAccordion'
import { Button, CircularProgress, Card, CardContent, IconButton, CardMedia, Avatar, CardHeader, FormControlLabel,Switch , Typography, Link} from '@material-ui/core';

export default function UserPage() {
    let { id } = useParams();
    const [loading, changeloading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        // changeloading(true);
        changeloading(true);
        var str = "https://intense-tor-76305.herokuapp.com/merchants/"+id;
        console.log(str);
        let data = axios
            .get(str)
            .then(
                (result) => {
                    setUser(result)
                    console.log(result.data)
                    changeloading(false)
                },
                (error) => {

                    console.log(error);
                }
            )
    }, []
    );
    
    return (
        <>
            <HideAppBar/>
            {loading === true || user == null ? <div className="center"><CircularProgress /></div> : 
                <div className="margin-60"><h1>Hello {user.data.firstname+" "+user.data.firstname} </h1>
                <Grid container lg={12}spacing={6}>
                    
                    
                    <Grid container item sm={12}  lg={6}>
                        <img src={user.data.avatarUrl} height="240px" width="320px"></img>
                    </Grid>
                    <Grid container item sm={12} lg={6}>
                    <div>
                        <Badge  color="primary">
                            <MailIcon />
                            <Typography>{user.data.email}</Typography>
                        </Badge>
                    </div>
                    <div>
                        <Badge  color="primary">
                            <PhoneIcon />
                            <Typography>{user.data.phone}</Typography>
                        </Badge>
                    </div>
                    </Grid>
                </Grid>
                <UserBidAccordion heading={user.data.bids[0].carTitle} />
                </div>
                
            }
        </>
    );

}