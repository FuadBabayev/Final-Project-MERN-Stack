import OrdersStatistics from "../OrdersStatistics/OrdersStatistics";
import { GrEdit } from "react-icons/gr";
import "./css/OrdersList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAction } from "../../../../redux/slice/orders/orderSlice";
import { useEffect } from "react";
import Loading from "../../../Messages/Loading/Loading";
import NoDataFound from "../../../Messages/NotFound/NoDataFound";

function OrdersList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);
  const {
    orders: { orders },
    error,
    loading,
  } = useSelector((state) => state?.orders);
  return (
    <>
      <OrdersStatistics />

      {loading ? (
        <Loading />
      ) : orders?.length <= 0 ? (
        <NoDataFound />
      ) : (
        <div className="orderList_recent-order">
          <h2>Recent Orders</h2>

          <table className="orderList_table">
            <thead>
              <tr>
                <th className="order_ID">Order ID</th>
                <th className="status">Status</th>
                <th className="order_date">Order Date</th>
                <th className="delivery_date">Delivery Date</th>
                <th className="payment_status">Payment Status</th>
                <th className="total">Total</th>
                {/* <th className="update">Edit</th> */}
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>
                    {order.paymentStatus === "Not paid" ? (
                      <span>{order.paymentStatus}</span>
                    ) : (
                      <span>{order.paymentStatus}</span>
                    )}
                  </td>
                  <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
                  <td>Unknown</td>
                  <td>{order?.status}</td>
                  <td>{order?.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="orderList_table-cart">
            <div className="table_cart_item">
              {orders?.map((order) => (
                <div className="table_cart_item_above" key={order._id}>
                  <ul>
                    <li>
                      <h3>Order ID</h3>
                      <p>{order.orderNumber}</p>
                    </li>
                    <li>
                      <h3>Status</h3>
                      {order.paymentStatus === "Not paid" ? (
                        <span>{order.paymentStatus}</span>
                      ) : (
                        <span>{order.paymentStatus}</span>
                      )}
                    </li>
                    <li>
                      <h3>Order Date</h3>
                      <p>{new Date(order?.createdAt).toLocaleDateString()}</p>
                    </li>
                    <li>
                      <h3>Delivery</h3>
                      <p>Unknown</p>
                    </li>
                    <li>
                      <h3>Payment</h3>
                      <p>{order?.status}</p>
                    </li>
                    <li>
                      <h3>Total</h3>
                      <p>{order?.totalPrice}</p>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrdersList;
