import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux"
import { setSort } from '../../store/features/filter/filterSlice';
import { RootState } from '../../store';

const Sort = () => {
    const dispatch = useDispatch();
    const sort =  useSelector((state: RootState) => state.filter.sort);


    return (
        <div className="sort-container">
            <FormControl className='sort-item' fullWidth>
                <InputLabel id="demo-simple-select-label">Sırala</InputLabel>
                <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={sort}
                onChange={(e) => dispatch(setSort(e.target.value))}
                label="Sırala">
                    <MenuItem value={"descPrice"}>Fiyata göre azalan</MenuItem>
                    <MenuItem value={"ascPrice"}>Fiyata göre artan</MenuItem>
                    <MenuItem value={"descRate"}>Puana göre azalan</MenuItem>
                    <MenuItem value={"descDiscount"}>İndirime göre azalan</MenuItem>
                </Select>
            </FormControl>
            <div className='sort-cleare'>
                { 
                    sort &&
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} 
                         onClick={() =>{
                        dispatch(setSort(""))
                    }} >Filtre Temizle</Button>
                }
            </div>
        </div>
    )
}

export default Sort;