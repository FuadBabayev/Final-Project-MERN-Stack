import { useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./css/AdminDashBoard.css";
import { handleAdminClicked } from "../../../redux/slice/toggle/toggleSlice";
import { BsPeople, BsDatabaseAdd, BsCalendar2Date  } from "react-icons/bs";
import { LuCircleDollarSign } from "react-icons/lu";
import { TbPigMoney, TbBrandSafari  } from "react-icons/tb";
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { FaTimes } from "react-icons/fa";
import { IoColorPaletteOutline, IoArrowRedoCircle, IoHomeOutline  } from "react-icons/io5";
import { MdAddShoppingCart, MdOutlineCategory, MdOutlinePrivacyTip, MdAlternateEmail  } from "react-icons/md";
import admin from "/images/admin.webp";

function AdminDashboard() {
    const adminRef = useRef();
    const dispatch = useDispatch();

    // Auto Close to Opening Responsive Navbar 
    const adminClicked = useSelector((state) => state?.toggle?.adminClicked);
    if(!adminClicked) adminRef?.current?.classList?.remove("responsive"); 
    else adminRef?.current?.classList?.add("responsive"); 
    const showAdminBar = () => dispatch(handleAdminClicked());
    
    return (
        <section className="adminDashboard">
            <aside ref={adminRef}>
                <ul>
                    <li onClick={showAdminBar}><div className="links"><IoHomeOutline className="react-icons" /><Link to="/admin">DashBoard</Link></div></li>
                    <li onClick={showAdminBar}><div className="links"><BsPeople className="react-icons"/><Link to="manage-customer">Customers</Link></div></li> <hr />
                    <li onClick={showAdminBar}><div className="links"><TbPigMoney className="react-icons" /><Link to="add-coupon">Add Coupon</Link></div></li>
                    <li onClick={showAdminBar}><div className="links"><LuCircleDollarSign className="react-icons" /><Link to="manage-coupon">Manage Coupons</Link></div></li> <hr />
                    <li onClick={showAdminBar}><div className="links"><MdAddShoppingCart className="react-icons" /><Link to="add-product">Add Product</Link></div></li>
                    <li onClick={showAdminBar}><div className="links"><LiaBalanceScaleSolid className="react-icons" /><Link to="manage-products">Manage Stock</Link></div></li> <hr />
                    <li onClick={showAdminBar}><div className="links"><BsDatabaseAdd className="react-icons" /><Link to="add-features">Add Features</Link></div></li>
                    <li onClick={showAdminBar}><div className="links"><MdOutlineCategory className="react-icons" /><Link to="manage-category">Categories</Link></div></li>
                    <li onClick={showAdminBar}><div className="links"><IoColorPaletteOutline className="react-icons" /><Link to="manage-color">Colors</Link></div></li>
                    <li onClick={showAdminBar}><div className="links"><TbBrandSafari className="react-icons" /><Link to="manage-brand">Brands</Link></div></li>
				    <div className="navbar-button close" onClick={showAdminBar}><FaTimes className="react-icons react-times" /></div>
                </ul>
            </aside>
			<div className="navbar-button open" onClick={showAdminBar}><IoArrowRedoCircle className="react-icons react-open" /></div>
            <div className="react_outlet">
                <hr />
                <div className="user_profile">
                    <div className="user_profile_picture"><img src={admin} alt="User Profile" /></div>
                    <div className="user_profile_about">
                        <div className="user_profile_aboutAdmin"><p>Welcome, Fuad Babayev</p></div>
                        <div className="user_profile_aboutTime">
                            <p><MdOutlinePrivacyTip className="react-icons" /> <span>Role:</span> Admin</p>
                            <p><BsCalendar2Date className="react-icons " /> <span>Date Joined:</span> 04/04/2024</p>
                            <p><MdAlternateEmail className="react-icons" /> <span>Mail:</span> admin@gmail.com</p>
                        </div>
                    </div>
                </div> <hr />
                <Outlet />
                </div>
        </section>
    )
}

export default AdminDashboard
