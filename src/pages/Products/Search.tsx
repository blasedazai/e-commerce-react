import { InputAdornment, TextField } from "@mui/material";
import { Delete, Search as SearchIcon, StarRateTwoTone } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setSearch } from "../../store/features/filter/filterSlice";

const Search = () => {
    const dispatch= useDispatch();
    const search = useSelector((state: RootState) => state.filter.search);


    return(
        <div className="search-container">
            <TextField label="Ara" variant="outlined"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment:(
                    search &&
                    <InputAdornment position="end">
                        <Delete className="delete-icon" onClick={() => dispatch(setSearch(""))}/>
                    </InputAdornment>
                )
            }} />
        </div>
    )
}

export default Search;