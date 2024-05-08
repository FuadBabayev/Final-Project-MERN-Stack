import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./css/Product.css";
import { FaStar, FaShoppingCart, FaShopify } from "react-icons/fa";
import { fetchProductAction } from "../../../../redux/slice/products/productSlice";
import {
  addOrderToCartAction,
  cartItemFromLocalStorageAction,
} from "../../../../redux/slice/cart/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../../../../redux/slice/global/globalActions";

// const colors = ["Blue", "Red", "Green", "Yellow", "Deeppink", "White", "Black"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

function Product() {
  const dispatch = useDispatch();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  // Get ID from Params
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProductAction(id));
  }, [id]);
  // Get data from Store
  const {
    product: { product },
    error,
    loading,
  } = useSelector((state) => state?.products);

  // Get CardItems from LocalStorage
  useEffect(() => {
    dispatch(cartItemFromLocalStorageAction());
  }, []);
  // Get data from Store
  const { cartItems, isAdded } = useSelector((state) => state?.carts);
  const productExist = cartItems?.find(
    (item) => item?._id?.toString() === product?._id?.toString()
  );

  //Add to cart handler
  const addToCartHandler = () => {
    // Check if Product is in Cart
    if (productExist) return toast.error("This product is already in Cart");

    // ! Check if Color/Size not selected
    // if (!selectedColor) return sweetError("Please select product color");
    // if (!selectedSize) return sweetError("Please select product size");

    // ! Toastify
    if (error) {
      toast.error(error?.message);
      dispatch(resetErrorAction());
    }
    if (isAdded) {
      toast.success("Product added to Cart");
      dispatch(resetSuccessAction());
    }

    dispatch(
      addOrderToCartAction({
        _id: product?._id,
        name: product?.name,
        description: product?.description,
        totalQty: 1,
        price: product?.price,
        color: color ? color : product?.colors[0],
        size: size ? size : product?.sizes[0],
        image: product?.images[0],
        totalPrice: product?.price,
        qtyLeft: product?.qtyLeft,
      })
    );
    dispatch(cartItemFromLocalStorageAction());
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <div className="product_findById">
        <div className="container">
          <div className="product_byId_component">
            {/* Pictures Part */}
            <div className="product_pictures">
              {product?.images?.map((image) => (
                <div className="product_picture_item" key={image}>
                  <img src={image} alt={image} />
                </div>
              ))}
            </div>
            {/* Description Part */}
            <div className="product_description">
              {/* Cart */}
              <div className="product_description_cart">
                {/* Header */}
                <div className="cart_header">
                  <h2>{product?.name}</h2>
                  <h3>${product?.price}.00</h3>
                </div>
                {/* Reviews */}
                <div className="cart_reviews">
                  <div className="statistics">
                    <span>
                      {product?.reviews?.length > 0
                        ? product?.averageRate.slice(0, 3)
                        : null}
                    </span>
                    <div className="icons">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <FaStar
                          key={rating}
                          style={{
                            color:
                              Number(product?.averageRate) > rating
                                ? "#ffcc05"
                                : "gray",
                          }}
                          className="react-icons"
                        />
                      ))}
                    </div>
                    <a href="#reeview">total reviews</a>
                  </div>
                  <div className="add_review">
                    <Link to={`/add-review/${product?._id}`}>
                      Leave a review
                    </Link>
                  </div>
                </div>
                {/* Colors */}
                <div className="description_cart_colors">
                  <h3>Colors</h3>
                  <div className="colors_radioC">
                    {product?.colors?.map((color, index) => {
                      return (
                        <div key={color} className="color_item_radioC">
                          <input
                            onClick={() => setColor(color)}
                            type="radio"
                            name="color"
                            id={index + "color"}
                            value={color}
                          />
                          <label
                            htmlFor={index + "color"}
                            style={{ backgroundColor: color }}
                          ></label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Sizes */}
                <div className="description_cart_sizes">
                  <h3>Sizes</h3>
                  <div className="sizes_radioC">
                    {product?.sizes?.map((size, index) => {
                      return (
                        <div key={index} className="sizes_item_radioC">
                          <input
                            onClick={() => setSize(size)}
                            type="radio"
                            name="size"
                            id={index + "size"}
                          />
                          <label htmlFor={index + "size"}>{size}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Submit */}
                <div className="submit_button">
                  {cartItems?.length > 0 && (
                    <button className="proceeed">
                      <Link to="/shopping-cart">
                        <FaShopify className="react-icons" />
                        <p>Proceed to Checkout</p>
                      </Link>
                    </button>
                  )}
                  {product?.qtyLeft <= 0 ? (
                    <button disabled style={{ cursor: "not-allowed", backgroundColor: "red" }}>
                      {" "}
                      <FaShoppingCart className="react-icons" />{" "}
                      <p>Add to Cart</p>{" "}
                    </button>
                  ) : (
                    <button onClick={() => addToCartHandler()}>
                      <FaShoppingCart className="react-icons" />
                      <p>Add to Cart</p>
                    </button>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="product_description_description">
                <h2>Description</h2>
                <p>{product?.description}</p>
              </div>

              {/* Review */}
              <div className="product_description_reviews" id="reeview">
                <div className="product_review_header">
                  <h2>Recent reviews</h2>
                </div>

                {product?.reviews?.map((review) => (
                  <div className="reviewed_by_one" key={review?._id}>
                    <div className="reviewed_upper">
                      <div className="reviewed_by_admin">
                        <h3>{review.user?.username}</h3>
                        <p>
                          <time dateTime={review.datetime}>
                            {new Date(review.createdAt).toLocaleString()}
                          </time>
                        </p>
                      </div>
                      <div className="reviewed_stars">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <FaStar
                            key={rating}
                            style={{
                              color:
                                review.rating > rating ? "#ffcc05" : "gray",
                            }}
                            className="react-icons"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="reviewed_description">
                      <p>{review?.message}</p>
                    </div>
                  </div>
                ))}

                <div className="reviewed_by_one">
                  <div className="reviewed_upper">
                    <div className="reviewed_by_admin">
                      <h3>Rauf Abbasli</h3>
                      <p>04/05/2024, 15:21:02</p>
                    </div>
                    <div className="reviewed_stars">
                      <FaStar className="react-icons" />
                      <FaStar className="react-icons" />
                      <FaStar className="react-icons" />
                      <FaStar className="react-icons" />
                      <FaStar className="react-icons" />
                    </div>
                  </div>
                  <div className="reviewed_description">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Necessitatibus explicabo assumenda consequatur molestiae,
                      exercitationem sunt.
                    </p>
                  </div>
                </div>
                <div className="reviewed_by_one">
                  <div className="reviewed_upper">
                    <div className="reviewed_by_admin">
                      <h3>Ayhan Narimanov</h3>
                      <p>22/04/2024, 09:57:46</p>
                    </div>
                    <div className="reviewed_stars">
                      <FaStar className="react-icons" />
                      <FaStar className="react-icons" />
                      <FaStar className="react-icons" />
                      <FaStar className="react-icons" />
                      <FaStar
                        className="react-icons"
                        style={{ color: "gray" }}
                      />
                    </div>
                  </div>
                  <div className="reviewed_description">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Necessitatibus explicabo assumenda consequatur molestiae,
                      exercitationem sunt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
