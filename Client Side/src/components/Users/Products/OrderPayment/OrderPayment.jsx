import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Address from "../../Forms/Address/Adress";
import "./css/OrderPayment.css";
import { useEffect } from "react";
import { cartItemFromLocalStorageAction } from "../../../../redux/slice/cart/cartSlice";
import { getUserProfileAction } from "../../../../redux/slice/users/usersSlice";
import { placeOrderAction } from "../../../../redux/slice/orders/orderSlice";
import Loading from "../../../Messages/Loading/Loading";

function OrderPayment() {
  // Get data from Location
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartItemFromLocalStorageAction());
  }, [dispatch]);
  // Get cart from Store
  const { cartItems } = useSelector((state) => state?.carts);

  const { sumTotalPrice } = location?.state;
  // const sumTotalPrice = location?.state;

  // User Profile
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  //user profile
  const { loading, error, profile } = useSelector((state) => state?.users);
  const user = profile?.user;
  const shippingAddress = user?.shippingAddress;
  // Place Order Action
  const placeOrderHandler = () => {
    dispatch(
      placeOrderAction({
        shippingAddress,
        orderItems: cartItems,
        totalPrice: sumTotalPrice,
      })
    );
    // Empty Cart items
    localStorage.removeItem("cartItems");
  };
  const { loading: orderLoading, error: orderError } = useSelector(
    (state) => state?.orders
  );

  return (
    <div className="orderPayment">
      <div className="orderAddress">
        <Address />
      </div>
      <div className="orderSummary">
        <div className="orderSummary_cart">
          <div className="heading">
            <h2>Order Summary</h2>
          </div>
          <div className="summary">
            {cartItems?.map((product) => {
              return (
                <div className="myOrders" key={product._id}>
                  <div className="myOrders_image">
                    <img src={product.image} alt={product._id} />
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
                      ${product?.price} X {product?.totalQty} = $
                      {product?.totalPrice}
                    </h1>
                  </div>
                </div>
              );
            })}

            <div className="taxes">
              <h3>Taxes</h3>
              <p>$0.00</p>
            </div>
            <div className="total">
              <h3>Sum Total</h3>
              <p>${sumTotalPrice}</p>
            </div>
            <div className="button">
             {orderLoading ? <Loading /> : <button onClick={placeOrderHandler}>Confirm Payment - ${sumTotalPrice}</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPayment;
