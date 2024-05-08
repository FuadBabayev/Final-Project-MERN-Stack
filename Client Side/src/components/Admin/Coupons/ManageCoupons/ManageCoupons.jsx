import { GrEdit } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";
import "./css/ManageCoupons.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCouponAction, fetchCouponsAction } from "../../../../redux/slice/coupons/couponSlice";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../Messages/Loading/Loading";
import NoDataFound from "../../../Messages/NotFound/NoDataFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetErrorAction, resetSuccessAction } from "../../../../redux/slice/global/globalActions";




function ManageCoupons() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCouponsAction());
  }, [dispatch]); 
  const { coupons, loading, error, isDeleted } = useSelector((state) => state?.coupons);
  //---deleteHandler---
  const deleteCouponHandler = (id) => {
    dispatch(deleteCouponAction(id));
    window.location.reload();
  }

    // ! Toastify
    if(isDeleted) {
      toast.success("Coupon Deleted");
      dispatch(resetSuccessAction());
    };
  
  return (
    <>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} 
      pauseOnFocusLoss draggable={false} pauseOnHover={false} theme="light" />
      <div className="manageCoupons">
        <h2>Manage Coupons<span className="product_list_count">{coupons?.coupons?.length}</span></h2>
        <p className="product_list_prologue">List of all coupons in the system</p>

        {loading ? <Loading /> : coupons?.coupons?.length <= 0 ? <NoDataFound /> : (<>
          <table className="manageStock_table">
          <thead>
            <tr>
              <th className="product">Coupon Name</th>
              <th className="name">Discount</th>
              <th className="status">Status</th>
              <th className="category">Start Date</th>
              <th className="quantity">End Date</th>
              <th className="total_sold"> Days Left</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons?.coupons?.map((coupon) =>
              <tr key={coupon._id}>
                <td className="product_item">{coupon?.code}</td>
                <td className="name_item">{coupon?.discount}</td>
                <td className="status_item">
                  <div className="td">
                    {coupon?.isExpired ? <span className="expired">Expired</span> : <span className="active">Active</span> }
                  </div>
                </td>
                <td className="category_item">{new Date(coupon.startDate)?.toLocaleDateString()}</td>
                <td className="qty_left_item">{new Date(coupon.endDate)?.toLocaleDateString()}</td>
                <td className="price_item">{coupon?.daysLeft}</td>
                <td className="action_item">
                  <div className="action_item">
                    <Link to={`/admin/manage-coupon/edit/${coupon.code}`}><GrEdit className="react-icons" /></Link>
                    <p onClick={() => deleteCouponHandler(coupon?._id)} ><BsTrash className="react-icons" /></p>
                  </div>
                </td>
              </tr>            
            )}
          </tbody>
        </table>

        <div className="manageCoupon_table-product">
        {coupons?.coupons?.map((coupon) =>
                    <div className="table_cart_item" key={coupon._id}>
                    <div className="table_cart_item_above">
                      <ul>
                        <li><h3>Coupon Name</h3><p>{coupon?.code}</p></li>
                        <li><h3>Discount</h3><p>{coupon?.discount}</p></li>
                        {/* <li><h3>Status</h3><p className="status_expired">Expired</p></li> */}
                        <li><h3>Status</h3>{coupon?.isExpired ? <span className="expired">Expired</span> : <span className="active">Active</span> }</li>
                        <li><h3>Start Date</h3><p>{new Date(coupon.startDate)?.toLocaleDateString()}</p></li>
                        <li><h3>End Date</h3><p>{new Date(coupon.endDate)?.toLocaleDateString()}</p></li>
                        <li><h3>Days Left</h3><p>{coupon?.daysLeft}</p></li>
                      </ul>
                    </div>
                    <Link to={`/admin/manage-coupon/edit/${coupon.code}`}><div className="table_cart_item_below"><GrEdit className="react-icons" /></div></Link>
                    <div className="table_cart_item_below2" onClick={() => deleteCouponHandler(coupon?._id)}><BsTrash className="react-icons" /></div>
                  </div>
      )}

        </div>
        </>)}



      </div>
    </>
  );
}

export default ManageCoupons;
