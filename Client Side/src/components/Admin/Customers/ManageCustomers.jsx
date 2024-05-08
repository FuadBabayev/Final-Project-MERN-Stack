import { GrEdit } from "react-icons/gr";
import "./css/ManageCustomers.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrdersAction } from "../../../redux/slice/orders/orderSlice";
import Loading from "../../Messages/Loading/Loading";
import NoDataFound from "../../Messages/NotFound/NoDataFound";

function ManageCustomers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);
  const { orders, error, loading } = useSelector((state) => state?.orders);
  const customers = orders?.orders;

  // Unique Customers
  const uniqueCustomers = customers?.filter((item, index) => {
    return customers?.map((item) => item?.id).indexOf(item.id) === index;
  });

  return (
    <>
      <div className="manageCustomer">
        <h2>
          All Customers
          <span className="product_list_count">{uniqueCustomers?.length}</span>
        </h2>

        {loading ? (
          <Loading />
        ) : orders?.length <= 0 ? (
          <NoDataFound />
        ) : (
          <>
            <table className="manageStock_table">
              <thead>
                <tr>
                  <th className="product">Username</th>
                  <th className="name">Email</th>
                  <th className="status">Country</th>
                  <th className="category">City</th>
                  <th className="quantity">Phone</th>
                  <th className="total_sold">Postal Code</th>
                  <th className="action">Edit</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td className="product_item">fuadbabayev</td>
                    <td className="name_item">fuad@mail.ru</td>
                    <td className="status_item">
                     AZE
                    </td>
                    <td className="category_item">
                      Baku
                    </td>
                    <td className="qty_left_item">
                      55555555
                    </td>
                    <td className="price_item">
                      AZ1129
                    </td>
                    <td className="action_item">
                      <div className="action_item">
                        <GrEdit className="react-icons" />
                      </div>
                    </td>
                </tr>


                {/* {uniqueCustomers?.map((customer) => (
                  <tr key={customer.user?._id}>
                    <td className="product_item">{customer?.user?.username}</td>
                    <td className="name_item">{customer?.user?.email}</td>
                    <td className="status_item">
                      {customer?.user?.shippingAddress.country}
                    </td>
                    <td className="category_item">
                      {customer.user?.shippingAddress.city}
                    </td>
                    <td className="qty_left_item">
                      {customer.user?.shippingAddress.phone}
                    </td>
                    <td className="price_item">
                      {customer.user?.shippingAddress.postalCode}
                    </td>
                    <td className="action_item">
                      <div className="action_item">
                        <GrEdit className="react-icons" />
                      </div>
                    </td>
                  </tr>
                ))} */}

              </tbody>
            </table>

            <div className="manageCoupon_table-product">
                <div className="table_cart_item">
                  <div className="table_cart_item_above">
                    <ul>
                      <li><h3>Username</h3><p>fuadbabayev</p></li>
                      <li><h3>Email</h3><p>fuad@mail.ru</p></li>
                      <li><h3>Country</h3><p>AZE</p></li>
                      <li><h3>City</h3><p>Baku</p></li>
                      <li><h3>Phone</h3><p>55555555</p></li>
                      <li><h3>Postal Code</h3><p>AZ1129</p></li>
                    </ul>
                  </div>
                </div>

              {/* {uniqueCustomers?.map((customer) => (
                <div className="table_cart_item" key={customer.user?._id}>
                  <div className="table_cart_item_above">
                    <ul>
                      <li>
                        <h3>Username</h3>
                        <p>{customer.user?.username}</p>
                      </li>
                      <li>
                        <h3>Email</h3>
                        <p>{customer.user?.email}</p>
                      </li>
                      <li>
                        <h3>Country</h3>
                        <p>{customer.user?.shippingAddress.country}</p>
                      </li>
                      <li>
                        <h3>City</h3>
                        <p>{customer.user?.shippingAddress.city}</p>
                      </li>
                      <li>
                        <h3>Phone</h3>
                        <p>{customer.user?.shippingAddress.phone}</p>
                      </li>
                      <li>
                        <h3>Postal Code</h3>
                        <p>{customer.user?.shippingAddress.postalCode}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              ))} */}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ManageCustomers;
