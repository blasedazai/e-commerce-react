import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Categories from "./Categories";
import Chips from "./Chips";
import List from "./List";
import Search from "./Search";
import Sort from "./Sort";



const Products = () => {

    const filter = useSelector((state: RootState) => state.filter);

    return(
        <div className="section-02">
            <div className="c-wrapper">
                <Categories />
                <div className="list-container">
                    <div className="a-item-01">
                        <Sort/>
                        <Search/>
                    </div>
                    <div className="a-item-02">
                        {
                           filter.selectedCategories.length > 0 &&
                           <Chips/> 
                        }
                    </div>
                    <div className="a-item-03">
                        <List/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;