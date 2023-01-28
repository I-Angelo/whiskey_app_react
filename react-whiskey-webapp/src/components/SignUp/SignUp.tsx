import { Navbar } from '../Navbar'
import React, { useState } from 'react'
import firebase from 'firebase/app';
import { useAuth,  AuthCheck } from 'reactfire';
import 'firebase/auth';
import { Input } from '../SharedComponents/Input';
import { Container, Button, makeStyles, Typography, Snackbar  } from '@material-ui/core';
import { RouteComponentProps, withRouter } from "react-router-dom"; 
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseBrand, chooseYear, chooseMalt, chooseGrain } from '../../redux/slices/RootSlice';
import { Link } from 'react-router-dom';

import { server_calls } from '../../api';




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
      color: 'white',
      backgroundColor: '#4caf50'
  }

});


interface VehicleState {
  email: string;
  password: string;

}

interface WhiskeyFormProps {
  id?:string;
  data?:{}
}


  interface VehicleState {
    name: string;
    email: string;
    address: string;
    phone_number: string;
  }


export const SignUp = (props:WhiskeyFormProps) => {

    const auth = useAuth();
    const classes = useStyles();

    const dispatch = useDispatch(); 
    const store = useStore();
    const name = useSelector<VehicleState>(state => state.name);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => { 
            // Dispatch basically updates our state / Redux store
        // dispatch(chooseName(data.email)); // dispatch is part of React
        // dispatch(chooseEmail(data.password));
        server_calls.createUser(store.getState()); 
        setTimeout( () => {window.location.reload()}, 1000)
        }
  


      return (
          <div>
              <Navbar />
              <Container maxWidth = 'sm' className={classes.containerStyle}>
                  <Typography className={classes.typographyStyle}>Sign Up Below</Typography>
                  <form onSubmit = {handleSubmit(onSubmit)}>
                      <div>
                          <label htmlFor="email">Email</label>
                          <Input {...register('email')} name="email" placeholder="Place Email Here" />
                      </div>
                      <div>
                          <label htmlFor="password">Password</label>
                          <Input {...register('password')} name="password" placeholder="Place Password Here" />
                      </div>
                      <Button type="submit" variant='contained' color='primary' >Sign Up!
                          <Link to='/SignIn'></Link>
                      </Button>
                  </form>
                  <div>Feature Currently Unavailable</div>
              </Container>
          </div>
  )
}