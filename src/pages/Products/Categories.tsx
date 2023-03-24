import { Search } from "@mui/icons-material";
import { Checkbox, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCategories } from "../../services/products";
import { RootState } from "../../store";
import { setSelectedCategories } from "../../store/features/filter/filterSlice";
import { ICtagory } from "../../store/features/products/modal";
import { setCategories } from "../../store/features/products/productsSlice";

const Categories = () =>{
    const categories = useSelector((state:RootState) => state.products.categories);
    const filteredCategories = useSelector((state:RootState) => state.products.filteredCategories);

    const dispatch = useDispatch();

    const [search, setSearch] = useState<string>("");


    useEffect(() => {
        dispatch(getCategories());
    },[]);

    const handleCheckboxChange = (e:any, ctg: string) =>{
        let _ctg: Array<ICtagory> = [...categories];
        const index = categories.findIndex(x => x.name ===ctg);
        _ctg[index] = {name: ctg, selected: e.target.checked};

        dispatch(setCategories({
            categories: _ctg,
            filteredCategories: _ctg.filter((x: ICtagory) => x.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        }));
        dispatch(setSelectedCategories(_ctg.filter(x => x.selected).map(x => x.name)));
    }

    const renderChecbox = (ctg:ICtagory) => {
        return (
            <div key={"categories-" + ctg.name}>
                <FormControlLabel
                control={<Checkbox
                    checked={ctg.selected}
                    onChange={(e) => handleCheckboxChange(e, ctg.name)} />}
                    label={ctg.name}
                />
            </div>
        )
    }


    return(
        <div className="categories-container">
            <TextField className="categories-search"
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);

                dispatch(setCategories({
                    categories: categories,
                    filteredCategories: categories.filter((x: ICtagory) => x.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
                }));
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search/>
                    </InputAdornment>
                ),
            }}
            />
            <div className="categories-list">
                {
                filteredCategories.map((ctg: ICtagory) => {
                    return (
                        renderChecbox(ctg)
                    )
                })
                }
            </div>
            {
                filteredCategories.length === 0 &&
                <p>Kategori Bulunamadı.</p>
            }
        </div>
    )
}

export default Categories;