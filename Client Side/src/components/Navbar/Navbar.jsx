import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./css/Navbar.css";
import Logo from "/images/logoDark.png";
import { handleNavClicked } from "../../redux/slice/toggle/toggleSlice";
import { FaTimes, FaRegUser  } from "react-icons/fa";
import { GiHamburgerMenu, GiShoppingCart  } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import shopItem from "/images/shoproduct.avif";
import { fetchCategoriestAction } from "../../redux/slice/categories/categorySlice";
import { cartItemFromLocalStorageAction } from "../../redux/slice/cart/cartSlice";
import { logOutUserAction } from "../../redux/slice/users/usersSlice";

function Navbar() {
  const navRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriestAction());
  }, [dispatch]);
  const { categories } = useSelector((state) => state?.categories);
  const categoriesToDisplay = categories?.categories?.slice(0, 8);

  useEffect(() => {
    dispatch(cartItemFromLocalStorageAction());
  }, [dispatch]);
  const { cartItems } = useSelector((state) => state?.carts);
  const totalQuantity = cartItems?.reduce((acc, curr) => acc + curr?.totalQty, 0);

  // NavBar-a click olunanda AdminNavbar Baglansin
  const navClicked = useSelector((state) => state?.toggle?.navClicked);
  if(!navClicked) navRef?.current?.classList?.remove("responsive"); 
  else navRef?.current?.classList?.add("responsive");
	const showNavbar = () => dispatch(handleNavClicked());

  // Get Login User from localStorage
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const isLoggedIn = user?.token ? true : false;
  
   // Logout Handler
   const logOutHandler = () => {
    dispatch(logOutUserAction());
    window.location.reload();
  }

  return (
    <nav>
      <div className="container">
        <div className="navbar">
            <div className="logo" ><Link to="/" ><img src={Logo} alt="GentShop Logo" /></Link></div>
            <div className="routes" ref={navRef}>
                <ul className="links">
                    <li onClick={showNavbar}><Link to="/">Home</Link></li>
                    <li onClick={showNavbar}><Link to="/all-categories">Page</Link>                    
                    <div className="page_item">
                        <p className="hola">About Us</p>
                        <p>Contact Us</p>
                        <p>Collection Us</p>
                        <p>Whislist</p>
                        <p>Article Page</p>
                    </div>
                    </li>
                    <li onClick={showNavbar}><Link to="/products-filter">Shop</Link>
                      <div className="shop_item">
                        <div className="products">
                          <h2>Products</h2>
                            <p>Baby Boys Dress</p>
                            <p>Mens Annie Sneaker</p>
                            <p>Women's Cotton Shirt</p>
                            <p>Baby Girls Dress</p>
                            <p>Ribbon Style Hat</p>
                        </div>
                        <div className="image">
                          <img src={shopItem} alt="Shop Product" />
                        </div>
                      </div>
                    </li>
                    <li onClick={showNavbar}><Link to="/all-categories">Category</Link>
                    <div className="category_item">{categoriesToDisplay?.map((category) => <Link to={`/products-filters?category=${category?.name}`} key={category?._id} >{category?.name}</Link> )}</div>                    
                    </li>
                    {isLoggedIn ? <li onClick={showNavbar}><Link to="/">Blog</Link></li> : <li onClick={showNavbar}><Link to="/login">Sign</Link></li>}
                </ul>
                <ul className="user">
                    {user?.userFound?.isAdmin && <li onClick={showNavbar}><Link to="/admin" className="dashboard">Dashboard</Link></li>}                    
                    {isLoggedIn && <li onClick={showNavbar}><Link to="/customer-profile" ><FaRegUser className="react-icons react-user" /></Link></li>}
                    {isLoggedIn && <li onClick={showNavbar}><Link onClick={logOutHandler} ><MdLogout className="react-icons react-log-out" /></Link></li>}
                    {isLoggedIn && <li className="cart" onClick={showNavbar}><Link to="/shopping-cart" ><GiShoppingCart className="react-icons react-cart" /><span>{totalQuantity > 0 ? totalQuantity : 0}</span></Link></li>}
                    
                </ul>
				<div className="navbar-button close" onClick={showNavbar}><FaTimes className="react-icons react-times" /></div>
            </div>
			<div className="navbar-button hamburger" onClick={showNavbar}><GiHamburgerMenu className="react-icons react-hamburger" /></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;