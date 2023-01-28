import React, { useState, useEffect } from 'react'
import { server_calls } from '../api/server';

export const useGetData = () => {
    // Syntax: const [stateName, saveStateFunction] = importedHook<requiredDataType(which in this case we expect an array)>(value passed in);
    const [contactData, setData] = useState<[]>([]);

    // This is a function that will get the data 
    async function handleDataFetch() {
        const result = await server_calls.get();
        setData(result)
    }

    // This is the actual call of the function handleDataFetch,
    // where data is actually acquired

    useEffect( () => { // useEffect is another hook
        handleDataFetch();
    }, [])
        //We return the data that we've saved
        return {contactData, getData:handleDataFetch}

}

//Read mor about how to write custome hooks