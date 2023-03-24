import { Pagination, Rating } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/products";
import { RootState } from "../../store";
import { setCurrentPage } from "../../store/features/filter/filterSlice";
import { filterProducts } from "../../store/features/products/productsSlice";

const List = () => {
  const dispatch = useDispatch();
  const filteredList = useSelector((state: RootState) => state.products.filteredList);
  const filteredCount = useSelector((state: RootState) => state.products.filteredCount);
  const list = useSelector((state: RootState) => state.products.list);
  const filter = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(filterProducts({ filter, list }));
  }, [filter]);

  console.log(list)
  return (

      <div className="products">
        <div className="products-container">
        {
          filteredList.map((product: any) => (
          <div className="card-01" key={"products" + product.id}>
            <Link className="c-item" to={"/product/" + product.id}>
              <img
                className="c-item-01"
                src={product.thumbnail}
                alt={product.title}
              ></img>
              <h4 className="c-item-02">{product.title}</h4>
              <p className="c-item-03">{product.description}</p>
              <div className="c-item-04">
              <span className="c-item-04-A">Price: {product.price}</span>
              <Rating name="read-only" value={product.rating} readOnly precision={0.1} />
              </div> 
            </Link>
          </div>
        ))
      }
      </div>
        {
          filteredList.length === 0 && 
          <div>Ürün bulunamadı</div>
        }
        {
          filteredList.length > 0 &&
          <div className="card-02">
            <Pagination className="card-item" count={Math.round(filteredCount / filter.size)} color="secondary"
            onChange={(e,value) => {
              dispatch(setCurrentPage(value -1))
            }} />
          </div>
        }
      </div>
  );
};

export default List;
