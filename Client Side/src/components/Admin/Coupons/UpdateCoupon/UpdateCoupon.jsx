import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/AddCoupon.css";
import Loading from "../../../Messages/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  createCouponAction,
  fetchCouponAction,
  updateCouponAction,
} from "../../../../redux/slice/coupons/couponSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../../../../redux/slice/global/globalActions";
import { useParams } from "react-router-dom";


function UpdateCoupon() {
  const { code } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCouponAction(code));
  }, [code, dispatch]);

  const { coupon, loading, error, isUpdated } = useSelector(
    (state) => state?.coupons
  );
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  //---handle form data---
  const [formData, setFormData] = useState({
    code: coupon?.coupon?.code,
    discount: coupon?.coupon?.discount,
  });

  //onHandleChange---
  const onHandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //onHandleSubmit---
  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateCouponAction({
        id: coupon?.coupon?._id,
        code: formData?.code,
        discount: formData?.discount,
        startDate,
        endDate,
      })
    );

    //reset
    setFormData({
      code: "",
      discount: "",
    });
  };

  // // ! Toastify
  // if (error) {
  //   toast.error(error?.message);
  //   dispatch(resetErrorAction());
  // }
  if (isUpdated) {
    toast.success("Coupon Succesfully Updated");
    dispatch(resetSuccessAction());
  }

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
      <section className="addCoupon">
        <div className="addProduct-header">
          <h2>Update Coupon</h2>
        </div>
        <div className="addProduct-form">
          <form onSubmit={onHandleSubmit}>
            <div className="name">
              <label htmlFor="code">Name</label>
              <input
                type="text"
                name="code"
                id="code"
                value={formData.code}
                onChange={onHandleChange}
              />
            </div>

            <div className="name">
              <label htmlFor="discount">Discount</label>
              <input
                type="number"
                name="discount"
                id="discount"
                value={formData.discount}
                onChange={onHandleChange}
              />
            </div>

            <div className="select">
              <div className="react-select">
                <label htmlFor="size">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>

            <div className="select">
              <div className="react-select">
                <label htmlFor="size">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
            </div>

            {loading ? (
              <Loading />
            ) : (
              <div className="button">
                <button>Add Coupon</button>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default UpdateCoupon;
