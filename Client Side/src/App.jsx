import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/AuthRoute/AdminRoute";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import AdminDashboard from "./components/Admin/AdminDashBoard/AdminDashboard";
import Login from "./components/Users/Forms/Login/Login";
import Register from "./components/Users/Forms/Register/Register";
import Footer from "./components/Footer/Footer";
import OrdersList from "./components/Admin/Orders/OrdersList/OrdersList";
import AddProduct from "./components/Admin/Products/AddProduct/AddProduct";
import ManageStocks from "./components/Admin/Products/ManageStocks/ManageStocks";
import AddCoupon from "./components/Admin/Coupons/AddCoupon/AddCoupon";
import ManageCoupons from "./components/Admin/Coupons/ManageCoupons/ManageCoupons";
import AddFeatures from "./components/Admin/Features/AddFeatures/AddFeatures";
import AddCategory from "./components/Admin/Features/AddCategory/AddCategory";
import AddBrand from "./components/Admin/Features/AddBrand/AddBrand";
import AddColor from "./components/Admin/Features/AddColor/AddColor";
import ManageCategories from "./components/Admin/Features/ManageCategories/ManageCategories";
import ManageColors from "./components/Admin/Features/ManageColors/ManageColors";
import ManageBrands from "./components/Admin/Features/ManageBrands/ManageBrands";
import ManageCustomers from "./components/Admin/Customers/ManageCustomers";
import HomePage from "./components/Home/HomePage/HomePage";
import AllCategories from "./components/Home/AllCategories/AllCategories";
import ThanksForOrdering from "./components/Users/Products/ThanksForOrdering/ThanksForOrdering";
import Review from "./components/Users/Review/Review";
import OrderPayment from "./components/Users/Products/OrderPayment/OrderPayment";
import CustomerProfile from "./components/Users/Profile/CustomerProfile/CustomerProfile";
import ShoppingCart from "./components/Users/Products/ShoppingCart/ShoppingCart";
import ProductsFilters from "./components/Users/Products/ProductsFilters/ProductsFilters";
import Product from "./components/Users/Products/Product/Product";
import ProductsFilterness from "./components/Users/Products/ProductFilterness/ProductsFilterness";
import UpdateProduct from "./components/Admin/Products/UpdateProduct/UpdateProduct";
import UpdateCoupon from "./components/Admin/Coupons/UpdateCoupon/UpdateCoupon";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Navbar />

        <Routes>
          {/* // ! Private */}
          <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
            <Route path="" element={<AdminRoute ><OrdersList /></AdminRoute>} />
            <Route path="add-product" element={<AdminRoute ><AddProduct /></AdminRoute>} />
            <Route path="products/edit/:id" element={<AdminRoute ><UpdateProduct /></AdminRoute>} />
            <Route path="manage-products" element={<AdminRoute ><ManageStocks /></AdminRoute>} />
            <Route path="add-coupon" element={<AdminRoute ><AddCoupon /></AdminRoute>} />
            <Route path="manage-coupon/edit/:code" element={<AdminRoute ><UpdateCoupon /></AdminRoute>} />
            <Route path="manage-coupon" element={<ManageCoupons />} />
            
            <Route path="add-features" element={<AddFeatures />}>
              <Route path="" element={<AdminRoute ><AddCategory /></AdminRoute>} />
              <Route path="add-brand" element={<AdminRoute ><AddBrand /></AdminRoute>} />
              <Route path="add-color" element={<AdminRoute ><AddColor /></AdminRoute>} />
            </Route>
            <Route path="manage-category" element={<AdminRoute ><ManageCategories /></AdminRoute>} />
            <Route path="manage-color" element={<ManageColors />} />
            <Route path="manage-brand" element={<ManageBrands />} />
            <Route path="manage-customer" element={<AdminRoute ><ManageCustomers /></AdminRoute>} />
            {/* // ! <Route path="edit-category/:id" element={<AdminRoute><UpdateCategory /></AdminRoute>} /> */}

          </Route>

          {/* // ! Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/all-categories" element={<AllCategories />} />
          <Route path="/success" element={<ThanksForOrdering />} />
          <Route path="/add-review/:id" element={<AuthRoute ><Review /></AuthRoute>} />
          <Route path="/order-payment" element={<AuthRoute ><OrderPayment /></AuthRoute>} />
          <Route path="/customer-profile" element={<AuthRoute ><CustomerProfile /></AuthRoute>} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/products-filters" element={<ProductsFilters />} />
          <Route path="/products-filter" element={<ProductsFilterness />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
