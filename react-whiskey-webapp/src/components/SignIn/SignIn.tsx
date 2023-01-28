import React, { useState } from 'react'
import firebase from 'firebase/app';
import { useAuth,  AuthCheck } from 'reactfire';
import 'firebase/auth';
import { Input } from '../SharedComponents/Input';
import { Container, Button, makeStyles, Typography, Snackbar,  } from '@material-ui/core';
import { RouteComponentProps, withRouter } from "react-router-dom"; //This is how we hadle our props
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Navbar } from '../Navbar'
import image from '../../assets/images/Barrels-2-1.jpeg'

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
        marginTop: '2em',
        // zIndex: 2
    },
    snackBar: {
        color: 'white',
        backgroundColor: '#4caf50'
    },

    background: {
        backgroundImage: `url(${image})`,
        bacgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        evrflow: 'hidden',
        width: '100%',
        height: '90%',
        // backgroundPosition: 'top',
        backGroundSize: 'auto',
        // position: 'fixed',
        // opacity: 0.5,
        zIndex: -1,
        position: 'absolute'
    },

});

interface SignInProps{
    history: RouteComponentProps["history"];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
}

export const SignIn = withRouter( (props:SignInProps) => {

    const auth = useAuth();
    const classes = useStyles();
    const { history } = props;
    const [open, setOpen] = useState(false);

    const handleSnackOpen = () => {
        setOpen(true)
    };

    const handleSnackClose = (event?: React.SyntheticEvent, reason?:string) => {
        if(reason === 'clickaway'){
            return;
        }

        setOpen(false);
        history.push('/')
    }

    const sign_in = async () => {
        const response = await auth.signInWithPopup( new firebase.auth.GoogleAuthProvider()); //This is the sigin with google account
        if(response.user){
            handleSnackOpen();
        }
    };

    const sign_out = async () => {
        await auth.signOut();
    }


    return (
        <div>
            <Navbar />
            <div className={classes.background}>
            <Container maxWidth = 'sm' className={classes.containerStyle} >
                <Typography className={classes.typographyStyle}>Sign In Below</Typography>
                <form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input name="email" placeholder="Place Email Here" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Input name="password" placeholder="Place Password Here" />
                    </div>
                    <Button type="submit" variant='contained' color='primary' onClick={sign_in}>Submit</Button>
                </form>

                <AuthCheck fallback={
                    <Button className={classes.googleButton} onClick={sign_in}>Sign In With Google</Button>
                }>
                    <Button variant='contained' color='secondary' onClick={sign_out}>Sign Out</Button>
                </AuthCheck>
                <Snackbar message={'Success'} open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity="success">
                        Successful Sign In - Redirect in 6 seconds
                    </Alert>
                </Snackbar>
            </Container>
            </div>
        </div>
    )
});
    

