import { useDispatch, useSelector } from "react-redux";
import AddressDetails from "../AddressDetails/AddressDetails";
import CustomerDetails from "../CustomerDetails/CustomerDetails";
import "./css/CustomerProfile.css";
import { RiSecurePaymentLine } from "react-icons/ri";
import { getUserProfileAction } from "../../../../redux/slice/users/usersSlice";
import { useEffect } from "react";
import NoDataFound from "../../../Messages/NotFound/NoDataFound";
import Loading from "../../../Messages/Loading/Loading";

function CustomerProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  const { profile, loading, error } = useSelector((state) => state?.users);
  const orders = profile?.user?.orders;

  return (
    <div className="customerProfile">
      <CustomerDetails
        email={profile?.user?.email}
        dateJoined={new Date(profile?.user?.createdAt).toDateString()}
        username={profile?.user?.username}
      />

      {loading ? (
        <Loading />
      ) : orders?.length <= 0 ? (
        <NoDataFound />
      ) : (
        orders?.map((order) => (
          <div key={order._id}>
            <table>
              <thead>
                <tr>
                  <th className="order">
                    <p>Order number</p>
                  </th>
                  <th className="date">
                    <p>Date placed</p>
                  </th>
                  <th className="amount">
                    <p>Total amount</p>
                  </th>
                  <th className="status">
                    <p>
                      Status: <span>pending</span>
                    </p>
                  </th>
                  <th className="method">
                    <p>Payment Method</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p className="order_item">{order?.orderNumber}</p>
                  </td>
                  <td>
                    <p className="date_item">
                      {new Date(order?.createdAt).toDateString()}
                    </p>
                  </td>
                  <td>
                    <p className="amount_item">${order?.totalPrice}</p>
                  </td>
                  <td>
                    <p className="status_item"></p>
                    {/* {order?.status} */}
                  </td>
                  <td>
                    <p className="method_item">{order?.paymentMethod}</p>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="table_cart">
              <ul className="table_cart_lists">
                <li>
                  <h3>Order number</h3>
                  <p>{order?.orderNumber}</p>
                </li>
                <li>
                  <h3>Date placed</h3>
                  <p>{new Date(order?.createdAt).toDateString()}</p>
                </li>
                <li>
                  <h3>Total amount</h3>
                  <p>${order?.totalPrice}</p>
                </li>
                <li>
                  <h3>Status:</h3>
                  <p>pending</p>
                </li>
                <li>
                  <h3>Payment Method</h3>
                  <p>{order?.paymentMethod}</p>
                </li>
              </ul>
            </div>

            <div className="customerProfile_ordered_cart">
              {order?.orderItems?.map((product) => (
                <div className="myOrders" key={product._id}>
                  <div className="myOrders_image">
                    <img src={product.image} alt={product.image} />
                  </div>
                  <div className="myOrders_description">
                    <h2>
                      <span>Name:</span> {product.name}
                    </h2>
                    <h3>
                      <span>Price:</span> ${product.price}
                    </h3>
                    <p>{product.description.slice(0, 295)}</p>
                  </div>
                  <div className="myOrders_payment_status">
                    <RiSecurePaymentLine className="react-icons" />
                    Payment Status: <span> Not paid</span>
                  </div>
                </div>
              ))}
            </div>
            <AddressDetails />
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerProfile;
