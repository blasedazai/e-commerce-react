import { Chip } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { RootState } from "../../store";
import { setSelectedCategories } from "../../store/features/filter/filterSlice";
import { ICtagory } from "../../store/features/products/modal";
import { setCategories } from "../../store/features/products/productsSlice";

const Chips = () => {
    const dispatch =useDispatch();
    const filter = useSelector((state:RootState) => state.filter);
    const categories = useSelector((state: RootState) => state.products.filteredCategories)
    const filteredCategories = useSelector((state: RootState) => state.products.filteredCategories);



    const handleDelete= (ctg: string) => {
        let _ctg: Array<ICtagory> = [...categories];
        const index = categories.findIndex(x => x.name === ctg);
        _ctg[index] = {name: ctg, selected: false};

        let _filteredCategories: Array<ICtagory> = [...filteredCategories];
        const _index = filteredCategories.findIndex(x => x.name === ctg);
        _filteredCategories[_index] = { name: ctg, selected: false };

        dispatch(setCategories({
            categories: _ctg,
            filteredCategories: _filteredCategories
        }));
        dispatch(setSelectedCategories(_ctg.filter(x => x.selected).map(x => x.name)));
    };


    return(
        <div className="chips">
            {
                filter.selectedCategories.map((ctg) =>(
                    <Chip label={ctg} onDelete={() => handleDelete(ctg)}/>
                ))
            }

            <Chip className="chip-delete" label={"Temizle"} onDelete={()=>{
                const defaultCategories = [...categories.map((x:ICtagory) => {return {name:x.name, selected: false}})];
                dispatch(setCategories({
                    categories: defaultCategories,
                    filteredCategories: defaultCategories
                }));

                dispatch(setSelectedCategories([]));
            }}/>
        </div>
    )
}

export default Chips;