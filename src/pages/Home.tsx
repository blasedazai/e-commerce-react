import { Link } from "react-router-dom";

const Home = () => {
    return(
        <div className="section-01">
            <div className="c-wrapper">
                <div className="home">
                    <img className="home-img" src={"/images/shooping.jpg"}/>
                    <div className="home-desc">
                        <h1 >Dont't miss the discounts! Come on then!</h1>
                        <Link to={"/products"}>Products</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Home;
