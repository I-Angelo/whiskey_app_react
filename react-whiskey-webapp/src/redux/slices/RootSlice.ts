import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        brand: "Brand",
        year: "Year",
        malt: "Malt",
        grain: "Grain",
    },
    reducers: {
        chooseBrand: (state, action) => {state.brand = action.payload},
        chooseYear: (state, action) => {state.year = action.payload},
        chooseMalt: (state, action) => {state.malt = action.payload},
        chooseGrain: (state, action) => {state.grain = action.payload},
    }
})

export const reducer = rootSlice.reducer;
export const {chooseBrand, chooseYear, chooseMalt, chooseGrain } = rootSlice.actions;


// Lines 4 - 9 is the initial state of the contact.
// Reducer keep an 'ear open' to see if anything has changed from the original 'state'.
//REducer split or clice the information accordingly by making copie and not changing the original iunformation
//  and see if anything has happened or changed in any of the separate fields adn display the information accordingly

