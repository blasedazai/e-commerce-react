import { DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { setBasketItems } from "../store/features/basket/basketSlice";

const BasketDetails = () => {
    const dispatch = useDispatch();
    const basket = useSelector((state: RootState) => state.basket);

    const changeCount = (item: any, _count:number) => {
        const index = basket.items.findIndex(x => x.id === item.id)
        const count  = basket.items[index].count;

        let items = [...basket.items];
        items[index] = {...item, count: count + _count}
        dispatch(setBasketItems(items))
        localStorage.setItem("basket", JSON.stringify(items))
    }
    
    return(
        <section className="section-04">
            <div className="c-wrapper">
                {
                  basket.items.map((item) => (
                    <div className="basket-container">
                        <div key={"basket" +item.id} className="basket-items">
                            <img className="bc-01" src={item.thumbnail}  alt={item.title}/>
                            <h2 className="bc-02" >{item.title}</h2>
                            <span className="bc-03" >Stock:{item.stock}</span>
                            <div className="bc-05" >
                                <div>
                                {
                                        item.count === 1 &&
                                         <Button variant="contained" disabled>-</Button>
                                }
                                </div>
                                <div>
                                {
                                        item.count > 1 &&
                                        <Button color="error" onClick={() => {
                                            changeCount(item, -1)
                                        }} variant="contained" >-</Button>
                                }
                                </div>

                                <span>{item.count}</span>
                                <Button color="error" onClick={() => {
                                    changeCount(item, 1)
                                }} variant="contained" >+</Button>
                                <span> {(item.price * item.count).toLocaleString("tr-TR")} TL</span>
                                <Button color="error" onClick={() => {
                                    const items = basket.items.filter((x) => x.id !==item.id)
                                    dispatch(setBasketItems(items))
                                    localStorage.setItem("basket", JSON.stringify(items))
                                }} variant="contained" >
                                    <DeleteOutline />
                                </Button>
                            </div>
                        </div>
                       
                    </div>
                    ))
                }
                 <div className="total">
                    {
                        basket.items.length > 0 &&
                            <div className="total-container">
                                Toplam : {
                                    basket.items.reduce((toplam, product) => {
                                        return toplam + product.count * Number(product.price);
                                    }, 0).toLocaleString("tr-TR")
                                    } TL
                            </div>
                    }
                </div>
               
                {
                        basket.items.length ===0 &&
                        <div className="emty-card">
                            <div className="empty-01">Your cart is empty.
                                <Link className="empty-01-A" to="/products">Let's take a look again!</Link>
                            </div>
                        </div>
                }
            </div>
        </section>
    )
}

export default BasketDetails;