import { useEffect, useState } from "react";
import "./css/ShoppingCart.css";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  cartItemFromLocalStorageAction,
  changeOrderItemQty,
  removeOrderItemQty,
} from "../../../../redux/slice/cart/cartSlice";
import { fetchCouponAction } from "../../../../redux/slice/coupons/couponSlice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../../../../redux/slice/global/globalActions";

function ShoppingCart() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartItemFromLocalStorageAction());
  }, [dispatch]);
  const { cartItems } = useSelector((state) => state?.carts);

  // Coupon State
  const [couponCode, setCouponCode] = useState("");
  const applyCouponSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCouponAction(couponCode));
    // setCouponCode("");
  };

  const { coupon, loading, error, isApplyed } = useSelector((state) => state?.coupons );

  // ! Toastify
  if (error) {
    toast.error(error?.message);
    dispatch(resetErrorAction());
  }
  if (isApplyed) {
    toast.success(`You get ${coupon?.coupon?.discount}% discount from ${couponCode} coupon`);
    dispatch(resetSuccessAction());
  }
  // Add to Cart handler
  const changeOrderItemQtyHandler = (productId, totalQty) => {
    dispatch(changeOrderItemQty({ productId, totalQty }));
    dispatch(cartItemFromLocalStorageAction());
  };

  // Calculate Total Price
  let sumTotalPrice = 0;
  sumTotalPrice = cartItems?.reduce((acc, curr) => acc + curr?.totalPrice, 0);
  // Check if Coupon found
  if (coupon) sumTotalPrice = sumTotalPrice - (sumTotalPrice * coupon?.coupon?.discount) / 100;

  // Remove Cart handler
  const removeOrderItemHandler = (productId) => {
    dispatch(removeOrderItemQty(productId));
    dispatch(cartItemFromLocalStorageAction());
  };

  // const [selectedCount, setSelectedCount] = useState(0);
  // const handleIncrease = () => setSelectedCount((count) => count + 1);
  // const handleDecrease = () => setSelectedCount((count) => count - 1);
  return (
    <div className="shoppingCart">
      <div className="shoppingCart_orders">
        <div className="shopppingCart_orders_heading">
          <h1>{cartItems?.length === 0 ? "Cart is Empty" : "Shopping Cart"}</h1>
        </div>

        {cartItems?.map((product) => (
          <div className="myOrders" key={product?._id}>
            <div className="myOrders_image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="myOrders_description">
              <h2>
                <span>Name</span> {product.name}
              </h2>
              <h3>
                <span>Size</span> {product.size}
              </h3>
              <h4>
                <span>Color</span> {product.color}
              </h4>
              <h1>
                ${product?.price} X {product?.totalQty} = ${product?.totalPrice}
              </h1>
            </div>
            <div className="count">
              <div className="count_qty_left">
                <select
                  id="qty_left"
                  name="qunatity"
                  onChange={(e) =>
                    changeOrderItemQtyHandler(product?._id, e.target?.value)
                  }
                >
                  {[...Array(product?.qtyLeft).keys()].map((x) => (
                    <option key={x} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                  {/* <option>1</option>
                            <option>2</option>
                            <option>3</option> */}
                </select>
              </div>
              {/* <div className="count_plus_minus">
                        <button onClick={handleDecrease} disabled={selectedCount == 0 ? true : false} className={selectedCount == 0 ? "disabled" : null} >-</button>
                        <span>{selectedCount}</span>
                        <button onClick={handleIncrease}>+</button>
                    </div> */}
            </div>
            <div
              className="delete"
              onClick={() => removeOrderItemHandler(product?._id)}
            >
              <BsTrash className="react-icons" />
            </div>
          </div>
        ))}

        {/* <div className="myOrders">
                    <div className="myOrders_image"><img src="../../../../../public/images/login.jpg" alt="" /></div>
                    <div className="myOrders_description">
                        <h2><span>Name</span> Suit</h2>
                        <h3><span>Size</span> M</h3>
                        <h4><span>Color</span> white</h4>
                        <h1>$500 X 1 = $500</h1>
                    </div>
                    <div className="count">
                        <div className="count_qty_left">
                            <select id="qty_left" name="qunatity">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="count_plus_minus">
                            <button onClick={handleDecrease} disabled={selectedCount == 0 ? true : false} className={selectedCount == 0 ? "disabled" : null} >-</button>
                            <span>{selectedCount}</span>
                            <button onClick={handleIncrease}>+</button>
                        </div>
                    </div>
                    <div className="delete"><BsTrash className="react-icons" /></div>
                </div>
                <div className="myOrders">
                    <div className="myOrders_image"><img src="../../../../../public/images/login.jpg" alt="" /></div>
                    <div className="myOrders_description">
                        <h2><span>Name</span> Suit</h2>
                        <h3><span>Size</span> M</h3>
                        <h4><span>Color</span> white</h4>
                        <h1>$500 X 1 = $500</h1>
                    </div>
                    <div className="count">
                        <div className="count_qty_left">
                            <select id="qty_left" name="qunatity">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="count_plus_minus">
                            <button onClick={handleDecrease} disabled={selectedCount == 0 ? true : false} className={selectedCount == 0 ? "disabled" : null} >-</button>
                            <span>{selectedCount}</span>
                            <button onClick={handleIncrease}>+</button>
                        </div>
                    </div>
                    <div className="delete"><BsTrash className="react-icons" /></div>
                </div>
                <div className="myOrders">
                    <div className="myOrders_image"><img src="../../../../../public/images/login.jpg" alt="" /></div>
                    <div className="myOrders_description">
                        <h2><span>Name</span> Suit</h2>
                        <h3><span>Size</span> M</h3>
                        <h4><span>Color</span> white</h4>
                        <h1>$500 X 1 = $500</h1>
                    </div>
                    <div className="count">
                        <div className="count_qty_left">
                            <select id="qty_left" name="qunatity">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="count_plus_minus">
                            <button onClick={handleDecrease} disabled={selectedCount == 0 ? true : false} className={selectedCount == 0 ? "disabled" : null} >-</button>
                            <span>{selectedCount}</span>
                            <button onClick={handleIncrease}>+</button>
                        </div>
                    </div>
                    <div className="delete"><BsTrash className="react-icons" /></div>
                </div> */}
      </div>

      <div className="shoppingCart_summary">
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
        <div className="orderSummary_cart">
          <div className="summary">
            <div className="heading">
              <h2>Order Summary</h2>
            </div>
            <div className="subTotal">
              <h3>Subtotal</h3>
              <p>${sumTotalPrice},00</p>
            </div>
            <div className="coupon">
              <form onSubmit={applyCouponSubmit}>
                <p>Have coupon code?</p>
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                {/* {loading ? <Loading /> : <button className="apply_coupon">Apply coupon</button>} */}
                <button className="apply_coupon">Apply coupon</button>
              </form>
            </div>
            <div className="total">
              <h3>Order Total</h3>
              <p>${sumTotalPrice}</p>
            </div>
            <div className="button">
              <button className="proceed">
                <Link to="/order-payment" state={{ sumTotalPrice }}>Checkout</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
