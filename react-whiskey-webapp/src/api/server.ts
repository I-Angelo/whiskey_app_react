import { renderEditInputCell } from "@material-ui/data-grid";

let token = 'b3284ff9693493e20aef5a1fa848a42b6dec757f90116ba7';

//EVERY SINGLE ONE OF THESE METHODAS  ARE KEY:VALUE PAIRS (GET, POST, ETC)

//GET
export const server_calls = {
    get: async () => { //here on the 'async' we are requesting data and not sending any variables inside the parentheses
        const response = await fetch('https://horse-gilded-gymnast.glitch.me/api/poisons', {
            method: 'GET',
            headers: {  //This is like the section on 'insomnia' for 'headers'
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}` 
            }
        });

        //Error handling
        if (!response.ok) {
            throw new Error('Failed to fetch data from server') 
        }

        return await response.json()
    },


    //CREATE



    create: async(data: any = {}) => { //since we are 'creating' a new contact, we are passing in the parantheses information in the async
                                    // and the information is sent as an 'object' as it is in 'data: any {}' and th avriable declared is 'any'
        const response = await fetch('https://horse-gilded-gymnast.glitch.me/api/poisons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data) //this is all part of the data we are sending on 'fetch' and this particular line 
                                        //makes our data readable in JSON and storing it under ' body'
        }); //WATCH OUT FOR THIS PART

        if(!response.ok){
            throw new Error('Failed to Create new data on server');
        }

        return await response.json()
    },


    //UPDATE

    update: async(id:string, data: any = {}) => { //we are passing an 'id' variable because we need to let the sapp know which contact we are 
                                            //updating
        const response = await fetch(`https://horse-gilded-gymnast.glitch.me/api/poisons/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data)
        });
    },

    delete: async(id: string) => {
        const response = await fetch(`https://horse-gilded-gymnast.glitch.me/api/poisons/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    },


    ////////////////////

    createUser: async(data: any = {}) => { 
        const response = await fetch('https://lime-rebel-sing.glitch.me/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            

            body: JSON.stringify(data) //this is all part of the data we are sending on 'fetch' and this particular line 
                        //makes our data readable in JSON and storing it under ' body'
        }); //WATCH OUT FOR THIS PART

        if(!response.ok){
            throw new Error('Failed to Create new data on server');
        }

        return await response.json()
        },
}
