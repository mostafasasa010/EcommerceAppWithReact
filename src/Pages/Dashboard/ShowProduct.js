import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseApi, PRODUCTS } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";

function ShowProduct() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [oPrice, setOPrice] = useState(0);
  const [review, setReview] = useState([]);
  const { id } = useParams();
  async function getProduct() {
    const res = await axios.get(`${BaseApi}${PRODUCTS}${id}`);
    const data = res.data.data.data;
    const reviews = data.review;
    if (reviews.length !== 0) {
      const re = reviews.map((re, i) => {
        return (
          <div className="review-card" key={i}>
            <h6>Name: {re.user.name}</h6>
            <p>Date: {re.createdAt.split("T")[0].toString()}</p>
            <p>Rating: {re.rating}</p>
            <p>Comment: {re.comment}</p>
          </div>
        );
      });
      setReview(re);
    } else {
      setReview(undefined);
    }
    setLoading(false);
    setName(data.name);
    setCategory(data.category !== undefined && data.category.name);
    setStock(data.inStock);
    setBrand(data.brand);
    setRating(data.ratingNumber);
    setDiscount(data.price[0].discount);
    setFinalPrice(data.price[0].finalPrice);
    setOPrice(data.price[0].originalPrice);
  }
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div className="show-product">
        <img
          src={`https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-11-red-back.png`}
          alt="Pic"
        />
        <h1>Name: {name}</h1>
        <h1>category: {category}</h1>
        <h1>stock: {stock}</h1>
        <h1>brand: {brand}</h1>
        <h1>rating: {rating}</h1>
        <h1>discount: {discount}</h1>
        <h1>finalPrice: {finalPrice}</h1>
        <h1>oPrice: {oPrice}</h1>
        {review === undefined ? <p>No Reviews</p> : review}
      </div>
    </>
  );
}

export default ShowProduct;
