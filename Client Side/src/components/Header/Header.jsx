import { Link } from "react-router-dom";
import "./css/Header.css";
import { FaPhoneAlt, FaEnvelope, FaCashRegister, FaLocationArrow } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCouponsAction } from "../../redux/slice/coupons/couponSlice";

function Header() {
  const dispatch = useDispatch();
  useEffect(()=>{
 dispatch(fetchCouponsAction());
  }, [dispatch])
  const {coupons, loading, error } = useSelector((state) => state?.coupons);
  const currentCoupon = coupons?.coupons?.[coupons?.coupons?.length - 1];

  const user = JSON.parse(localStorage.getItem('userInfo'));
  const isLoggedIn = user?.token ? true : false;

  return (
    <header className="header">
      {(currentCoupon && !currentCoupon?.isExpired) ?  <div className="coupon_part"><marquee behavior="" direction="">{currentCoupon?.discount}% &nbsp; {currentCoupon?.code} &nbsp; {currentCoupon?.daysLeft}</marquee></div> : null }
      {/* {(currentCoupon && !currentCoupon?.isExpired) ?  <div className="coupon_part"><p>{currentCoupon?.discount}% &nbsp; {currentCoupon?.code} &nbsp; {currentCoupon?.daysLeft}</p></div> : null } */}

      <div className="container"> 
        <main>
          <div className="first-part">
            <div className="phone"><FaPhoneAlt className="react-icons react-phone" /><a href="tel:+994507431951">(+994)-50-743-1951</a></div>
            <div className="email"><FaEnvelope className="react-icons react-envelope" /><a href="mailto:fuadeb@code.edu.az">fuadeb@code.edu.az</a></div>
          </div>
          <div className="second-part">
            {isLoggedIn ? <div className="sign-up"><GrDeliver className="react-icons react-delivery"  /><a href="#">Get free delivery on orders</a></div>
            : (<><div className="sign-up"><FaCashRegister className="react-icons react-sign-up"  /><Link to="/register">Create an account</Link></div>
            <div className="sign-in"><FaLocationArrow className="react-icons react-sign-in"  /><Link to="/login" >Sign in</Link></div></>)}
          </div>
        </main>
      </div>
    </header>
  );
}

export default Header;
