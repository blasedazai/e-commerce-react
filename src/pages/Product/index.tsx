import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { getProductDetails } from "../../services/products";
import { Button, Rating } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { setBasketItems } from "../../store/features/basket/basketSlice";


const ProductDefails = () => {
    const dispatch = useDispatch();
    const details = useSelector((state: RootState) => state.products.details);
    const params = useParams();
    const basket = useSelector((state:RootState) => state.basket)
    const [imgSrc,setImgSrc] = useState("");

    useEffect(()=> {
        dispatch(getProductDetails(params.id))
    },[params.id])

    useEffect(() =>{
        if(details){
            setImgSrc(details.thumbnail)
        }
    },[details])

    return(
        <section className="section-03">
            <div className="c-wrapper">
                <div className="details-container">
                    {
                        details &&
                        <div className="dt-item">
                            <div className="dt-item-01">
                                <img className="img-01"  src={imgSrc}/>
                                <div className="img-02">
                                    {
                                        details.images.map((img:string) => (
                                            <img className="img-02-A" key={img} src={img} onClick={() => {
                                                setImgSrc(img)
                                            }} />
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="dt-item-02">
                                <h4 className="desc-item-01">{details.brand}</h4>
                                <h5 className="desc-item-02">{details.title}</h5>
                                <p className="desc-item-03">{details.description}</p>
                                <div className="desc-item-03">
                                    <span>Category: {details.category}</span>
                                    <span>Price: {details.price}</span>
                                    <span>Discount: {details.discountPercentage}</span>
                                    <span>Stock: {details.stock}</span>
                                </div>
                                <div className="desc-item-04">Rating: <Rating name="read-only"value={details.rating} readOnly precision={0.1} /></div> 
                                
                            </div>
                            <div className="dt-item-03">
                                <Button onClick={() => {
                                    const isInItems = basket.items.some(x => x.id === details.id)
                                    let items = [];

                                    if (isInItems) {
                                        const index = basket.items.findIndex(x => x.id === details.id)
                                        const count= basket.items[index].count;

                                        items = [...basket.items];
                                        items[index] = {...details, count: count +1}
                                    }
                                    else{
                                        items= [
                                            {
                                                ...details,
                                                count:1
                                            },
                                            ...basket.items
                                        ]
                                    }
                                    dispatch(setBasketItems(items))
                                    localStorage.setItem("basket", JSON.stringify(items))
                                }} className="btn-basket" color="error">Sepete Ekle
                                <AddShoppingCart className="icon-basket" /></Button>
                                </div>
                            
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default ProductDefails;