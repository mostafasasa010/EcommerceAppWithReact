import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseApi, IMAGES, PRODUCTS } from "../../API/Api";
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
  const [image, setImage] = useState("no-image.png");
  const [review, setReview] = useState([]);
  const { id } = useParams();
  const counter = 5 - rating;
  async function getProduct() {
    const res = await axios.get(`${BaseApi}${PRODUCTS}${id}`);
    const data = res.data.data.data;
    const reviews = data.review;
    if (reviews.length !== 0) {
      const re = reviews.map((re, i) => {
        return (
          <div className="review-card" key={i}>
            <p>
              <span>Name: </span>
              {re.user.name}
            </p>
            <p>
              <span>Date: </span>
              {re.createdAt.split("T")[0].toString()}
            </p>
            <p>
              <span>Rating: </span>
              {[...Array(Math.round(re.rating))].map((fillStar, i) => {
                return <i key={i} className="ph-fill ph-star"></i>;
              })}
              {[...Array(Math.round(5 - re.rating))].map((star, i) => {
                return <i key={i} className="ph ph-star"></i>;
              })}
              <span className="rating-num">
                {"("}
                {re.rating}
                {")"}
              </span>
            </p>
            <p>
              <span>Comment: </span>
              {re.comment}
            </p>
          </div>
        );
      });
      setReview(re);
    } else {
      setReview(undefined);
    }
    setLoading(false);
    setName(data.name);
    setCategory(data.category !== undefined ? data.category.name : undefined);
    setStock(data.inStock);
    setBrand(data.brand);
    setRating(data.ratingNumber);
    setDiscount(data.price[0].discount);
    setFinalPrice(data.price[0].finalPrice);
    setOPrice(data.price[0].originalPrice);
    setImage(data.image);
  }

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div className="show-product">
        <div className="image">
          <img src={`${IMAGES}${PRODUCTS}${image}`} alt="Pic" />
        </div>
        <div className="data">
          <h1>Details:</h1>
          <p>
            <span>Name: </span>
            {name}
          </p>
          <p>
            <span>Category: </span>
            {category === undefined ? "Not Found" : category}
          </p>
          <p>
            <span>Brand: </span>
            {brand}
          </p>
          <p>
            <span>Stock: </span>
            <span className="no-stock">
              {stock === 0 && "Not Found In Stock"}
            </span>
            <span className="stock">{stock !== 0 && "Found In Stock"}</span>
            {stock === 0 ? null : "(" + stock + ")"}
          </p>
          <p>
            <span>rating: </span>
            {rating === undefined &&
              [...Array(5)].map((star, i) => {
                return <i key={i} className="ph ph-star"></i>;
              })}
            {rating > 0 &&
              [...Array(Math.round(rating))].map((fillStar, i) => {
                return <i key={i} className="ph-fill ph-star"></i>;
              })}
            {rating > 0 &&
              [...Array(Math.round(counter))].map((star, i) => {
                return <i key={i} className="ph ph-star"></i>;
              })}
            <span className="rating-num">
              {"("}
              {rating ? rating : "0"}
              {")"}
            </span>
          </p>
          <p>
            <span>Original Price: </span>
            {oPrice}
          </p>
          <p>
            <span>Discount: </span>
            {discount}
          </p>
          <p>
            <span>Final Price: </span>
            {finalPrice}
          </p>
        </div>
        <div className="re-cards">
          <h1>Reviews:</h1>
          <div className="reviews">
            {review === undefined ? <p>No Reviews</p> : review}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowProduct;
