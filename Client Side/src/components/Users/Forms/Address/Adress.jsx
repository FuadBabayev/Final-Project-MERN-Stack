import { useDispatch, useSelector } from "react-redux";
import "./css/Adress.css";
import { useEffect, useState } from "react";
import {
  getUserProfileAction,
  updateUserShippingAddressAction,
} from "../../../../redux/slice/users/usersSlice";
import Loading from "../../../Messages/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetErrorAction } from "../../../../redux/slice/global/globalActions";

function Address() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  //user profile
  const { loading, error, profile } = useSelector((state) => state?.users);
  const user = profile?.user;
  // ! Toastify
  if (error) {
    toast.error(error?.message);
    dispatch(resetErrorAction());
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    region: "",
    postalCode: "",
    phone: "",
  });
  // onchange
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //onsubmit
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserShippingAddressAction(formData));
    dispatch(getUserProfileAction());
    // window.location.reload();
  };

  return (
    <div className="shippingAddress">
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
      {user?.hasShippingAddress ? (
        <>
          <div className="heading">
            <h2>Shipping details</h2>
            <p>Double check your information</p>
          </div>
          <div className="shipping_table">
            <ul>
              <li>
                <h3>Firstname</h3>
                <p>{user?.shippingAddress?.firstName}</p>
              </li>
              <li>
                <h3>Lastname</h3>
                <p>{user?.shippingAddress?.lastName}</p>
              </li>
              <li>
                <h3>Address</h3>
                <p>{user?.shippingAddress?.address}</p>
              </li>
              <li>
                <h3>City</h3>
                <p>{user?.shippingAddress?.city}</p>
              </li>
              <li>
                <h3>Country</h3>
                <p>{user?.shippingAddress?.country}</p>
              </li>
              <li>
                <h3>phone</h3>
                <p>{user?.shippingAddress?.phone}</p>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="heading">
            <h2>Fill your Information</h2>
          </div>
          <div className="shipping_table">
            <form onSubmit={onSubmit}>
              <div className="name">
                <label htmlFor="firstname">Firstname</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstname"
                  onChange={onChange}
                />
              </div>
              <div className="name">
                <label htmlFor="lastname">Lastname</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastname"
                  onChange={onChange}
                />
              </div>
              <div className="name">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={onChange}
                />
              </div>
              <div className="name">
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" onChange={onChange} />
              </div>
              <div className="name">
                <label htmlFor="country">Country</label>
                <select id="country" name="country" onChange={onChange}>
                  <option>Country</option>
                  <option value="AZE">Azerbaijan</option>
                  <option value="TRK">Turkey</option>
                  <option value="GE">Georgia</option>
                  <option value="RU">Russia</option>
                  <option value="AZE">Azerbaijan</option>
                  <option value="USA">United States</option>
                  <option value="CAN">Canada</option>
                  <option value="FR">France</option>
                </select>
              </div>
              <div className="name">
                <label htmlFor="state">State/Province</label>
                <input
                  type="text"
                  name="region"
                  id="state"
                  onChange={onChange}
                />
              </div>
              <div className="name">
                <label htmlFor="postal">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  id="postal"
                  onChange={onChange}
                />
              </div>
              <div className="name">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={onChange}
                />
              </div>
              {loading ? (
                <Loading />
              ) : (
                <div className="button">
                  <button>Add Shipping Address</button>
                </div>
              )}
            </form>
          </div>
        </>
      )}

      {/* <div className="heading"><h2>Shipping details</h2><p>Double check your information</p></div>
      <div className="shipping_table">
        <ul>
          <li><h3>Firstname</h3><p>Fuad</p></li>
          <li><h3>Lastname</h3><p>Babayev</p></li>
          <li><h3>Address</h3><p>General Skhlinski 19</p></li>
          <li><h3>City</h3><p>Baku</p></li>
          <li><h3>Country</h3><p>Azerbaijan</p></li>
          <li><h3>phone</h3><p>0507431951</p></li>
        </ul>
      </div> */}

      {/* <div className="heading">
        <h2>Fill your Information</h2>
      </div>
      <div className="shipping_table">
        <form onSubmit={onSubmit}>
          <div className="name">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              name="firstName"
              id="firstname"
              onChange={onChange}
            />
          </div>
          <div className="name">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              name="lastName"
              id="lastname"
              onChange={onChange}
            />
          </div>
          <div className="name">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              onChange={onChange}
            />
          </div>
          <div className="name">
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" onChange={onChange} />
          </div>
          <div className="name">
            <label htmlFor="country">Country</label>
            <select id="country" name="country" onChange={onChange}>
              <option value="AZE">Azerbaijan</option>
              <option value="TRK">Turkey</option>
              <option value="GE">Georgia</option>
              <option value="RU">Russia</option>
              <option value="AZE">Azerbaijan</option>
              <option value="USA">United States</option>
              <option value="CAN">Canada</option>
              <option value="FR">France</option>
            </select>
          </div>
          <div className="name">
            <label htmlFor="state">State/Province</label>
            <input type="text" name="region" id="state" onChange={onChange} />
          </div>
          <div className="name">
            <label htmlFor="postal">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              id="postal"
              onChange={onChange}
            />
          </div>
          <div className="name">
            <label htmlFor="phone">Phone</label>
            <input type="text" name="phone" id="phone" onChange={onChange} />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="button">
              <button>Add Shipping Address</button>
            </div>
          )}
        </form>
      </div> */}
    </div>
  );
}

export default Address;
