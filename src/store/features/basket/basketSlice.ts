import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBasket } from "./modal";

const basketSlice = createSlice({
    name:"basket",
    initialState:<IBasket>{
        items:[],
    },
    reducers: {
        setBasketItems(state, action:PayloadAction<Array<string>>){
            state.items = action.payload;
        }
    }
});

export const {setBasketItems} = basketSlice.actions;
export default basketSlice.reducer;