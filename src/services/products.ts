import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICtagory, IProducts } from "../store/features/products/modal";
import { Apis } from "./apis";

export const getCategories: any = createAsyncThunk("products/categories", async () =>{
    const res = await fetch(Apis.categories);
    const categories = await res.json();
    const _ctg: Array<ICtagory> = categories.map((x: string) => {return {name: x, selected:false}});
    return _ctg
});

export const getProducts: any = createAsyncThunk("products", async () => {
    const res = await fetch(Apis.products);
    const response = await res.json();
    return response.products
});

export const getProductDetails: any = createAsyncThunk("productdetails", async (id:string) => {
    const res = await fetch(Apis.productDetails + id);
    const response = await res.json();
    return response
})