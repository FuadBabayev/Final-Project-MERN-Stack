import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/AddCoupon.css";
import Loading from "../../../Messages/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { createCouponAction } from "../../../../redux/slice/coupons/couponSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetErrorAction, resetSuccessAction } from "../../../../redux/slice/global/globalActions";





function AddCoupon() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
  });
  //---onHandleChange---
  const onHandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //---onHandleSubmit---
  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCouponAction({
      discount: formData?.discount,
      code: formData?.code,
      startDate,
      endDate
    }));
    //reset form
    setFormData({
      code: "",
      discount: "",
    });
  };
  //---coupon from store---
  const { coupons, loading, isAdded, error } = useSelector((state) => state?.coupons);

    // ! Toastify
    if(error) {
      toast.error(error?.message);
      dispatch(resetErrorAction());
    };
  if(isAdded) {
    // toast.success("Coupon Succesfully Added");
    // dispatch(resetSuccessAction());
    window.location.reload();
  };

  return (
    <>

<ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} 
      pauseOnFocusLoss draggable={false} pauseOnHover={false} theme="light" />
      <section className="addCoupon">
        <div className="addProduct-header">
          <h2>Add New Coupon</h2>
        </div>
        <div className="addProduct-form">
          <form onSubmit={onHandleSubmit}>
            <div className="name">
              <label htmlFor="code">Name</label>
              <input type="text" name="code" id="code" value={formData.code}  onChange={onHandleChange} />
            </div>

            <div className="name">
              <label htmlFor="discount">Discount</label>
              <input type="number" name="discount" id="discount"  value={formData.discount} onChange={onHandleChange} />
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

            {loading ? <Loading /> : <div className="button"><button>Add Coupon</button></div>}
          </form>
        </div>
      </section>
    </>
  );
}

export default AddCoupon;
