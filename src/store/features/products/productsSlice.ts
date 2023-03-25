import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories, getProductDetails, getProducts } from '../../../services/products';
import { IFilter } from '../filter/model';
import { ICtagory, IProducts } from './modal';



const productsSlice = createSlice({
    name: 'products',
    initialState: <IProducts>{
        categories: [],
        filteredCategories: [],
        list: [],
        filteredList: [],
        filteredCount: 0,
        details: null
    },
    reducers: {
        setCategories(state, action: PayloadAction<any>) {
            state.categories = action.payload.categories;
            state.filteredCategories = action.payload.filteredCategories;
        },
        filterProducts(state, action: PayloadAction<any>) {
            const filter = action.payload.filter
            let _list = [...action.payload.list];

            _list = _list.filter(x =>
                x.title.toLocaleLowerCase().includes(filter.search) ||
                x.description.toLocaleLowerCase().includes(filter.search)
            );

            if (filter.selectedCategories.length > 0) {
                let _list_ctg: Array<any> = [];

                for (let index = 0; index < filter.selectedCategories.length; index++) {
                    const ctgName = filter.selectedCategories[index];

                    _list_ctg = [
                        ..._list_ctg,
                        ..._list.filter(x => x.category === ctgName)
                    ]

                }

                _list = _list_ctg;
            }


            if (filter.sort === "descPrice") {
                _list = _list.sort((a, b) => b.price - a.price);
            }
            else if (filter.sort === "ascPrice") {
                _list = _list.sort((a, b) => a.price - b.price);
            }
            else if (filter.sort === "descRate") {
                _list = _list.sort((a, b) => b.rating - a.rating);
            }
            else if (filter.sort === "descDiscount") {
                _list = _list.sort((a, b) => b.discountPercentage - a.discountPercentage);
            }
            
            state.filteredCount = _list.length;
            const c = filter.currentPage
            const s = filter.size
            _list = _list.slice(c * s, (s * (c + 1)));
            state.filteredList = _list;

        },
    },
    extraReducers: builder => {
        builder.addCase(getCategories.fulfilled, (state, action: PayloadAction<Array<ICtagory>>) => {
            state.categories = action?.payload ? (Array.isArray([action.payload]) ? action.payload : []) : [];
            state.filteredCategories = action?.payload ? (Array.isArray([action.payload]) ? action.payload : []) : [];
        });

        builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<Array<any>>) => {
            const _list = action?.payload ? (Array.isArray([action.payload]) ? action.payload : []) : [];
            state.list = _list;
            state.filteredList = _list.slice(0, 9);
        });
        builder.addCase(getProductDetails.fulfilled, (state, action) => {
            state.details = action?.payload;
        });
    },

});

export const { setCategories, filterProducts } = productsSlice.actions;
export default productsSlice.reducer;
