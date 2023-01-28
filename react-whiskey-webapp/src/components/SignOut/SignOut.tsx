import React, { useState } from 'react'
import firebase from 'firebase/app';
import { useAuth,  AuthCheck } from 'reactfire';
import 'firebase/auth';
import { Input } from '../SharedComponents/Input';
import { Container, Button, makeStyles, Typography, Snackbar,  } from '@material-ui/core';
import { RouteComponentProps, withRouter } from "react-router-dom"; //This is how we hadle our props
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Navbar } from '../Navbar'
import { FormatColorText } from '@material-ui/icons';


    


const Alert = (props:AlertProps) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

// We are styling the button
const useStyles = makeStyles({
    googleButton:{
        backgroundColor: 'rgb(66,133,244)',
        marginTop: '2em',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo:{
        width: '48px',
        height: '48px',
        display: 'block'
    },
    typographyStyle: {
        fontFamily: 'Roboto, arial, sans-serif;',
        textAlign: 'center',
        fontSize: '2em'
    },
    containerStyle: {
        marginTop: '2em'
    },
    snackBar: {
        color: '#e34998',
        backgroundColor: '#22b5b0',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto, arial, sans-serif;',
        textAlign: 'center',
        fontSize: '1em',
        // color: 'white',
        textDecoration: 'none'
    },

    loginButtonSection: {
        width: '50',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto, arial, sans-serif;',
        textAlign: 'center',
        fontSize: '1em',
        color: 'white',
        textDecoration: 'none',
        // backgroundColor: '#d3e3d4'
        

    }


     

});

interface SignInProps{
    history: RouteComponentProps["history"];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
}

export const SignOut = withRouter( (props:SignInProps) => {

    const auth = useAuth();
    const classes = useStyles();
   
    const sign_out = async () => {
        await auth.signOut();
    }


    return (
        <div>
            <Navbar />
            <Container maxWidth = 'sm' className={classes.containerStyle}>
                <Typography className={classes.typographyStyle}>THANK YOU FOR VISITING! </Typography>
                <Typography className={classes.typographyStyle}>Sign Out By Pressing The Button Below</Typography>
                <Typography className={classes.snackBar}  style={{width:600,marginTop:20,}}>
                        If you wish to sign back in , please click on the link at the top of the page after signing out
                </Typography>
            </Container>
            <div className={classes.loginButtonSection}>
                    <Button className={classes.loginButtonSection} variant='contained' color='default' style={{width:250,backgroundColor:'#6495ed',marginTop:20,}} onClick={sign_out}>Sign Out</Button>
            </div>
        </div>
    )
});
        