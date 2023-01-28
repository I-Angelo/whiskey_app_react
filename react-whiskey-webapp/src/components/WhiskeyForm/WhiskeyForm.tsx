import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseBrand, chooseYear, chooseMalt, chooseGrain } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';


interface WhiskeyFormProps {
    id?:string;
    data?:{}
}


//Code below looks familiar because it is connecting with redux files

interface ContactState {
    brand: string;
    year: string;
    malt: string;
    grain: string;
}

export const WhiskeyForm = (props:WhiskeyFormProps) => {

    const dispatch = useDispatch(); // This is a Redux-specific hook that updates the store
    const store = useStore();
    const name = useSelector<ContactState>(state => state.brand);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => { //when press 'submit' button
        console.log(props.id)
        // The ! is for strictly typed Typescript stuff
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000); //this waits for a bit of time and then rteloads the page
            event.target.reset();
        } else {
            // Dispatch basically updates our state / Redux store
            dispatch(chooseBrand(data.brand)); // dispatch is part of React
            dispatch(chooseYear(data.year));
            dispatch(chooseMalt(data.malt));
            dispatch(chooseGrain(data.grain));
            server_calls.create(store.getState()); //since this is the 'else' beacuse the contact doesnt exist then it will call the function to create the contact
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}> {/* This will run 'onSubmit' from line 33 and 31*/}
                <div>
                    <label htmlFor="brand">Whiskey Brand</label>
                    <Input {...register('brand')} name="brand" placeholder='Whiskey Brand'/>
                </div>
                <div>
                    <label htmlFor="year">Email</label>
                    <Input {...register('year')} name="year" placeholder='Year Made'/>
                </div>
                <div>
                    <label htmlFor="malt">Phone Number</label>
                    <Input {...register('malt')} name="malt" placeholder='Type of Malt'/>
                </div>
                <div>
                    <label htmlFor="grain">Address</label>
                    <Input {...register('grain')} name="grain" placeholder='Type of Grain'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

