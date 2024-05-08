import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./css/ProductsFilters.css";
import Products from "../Products/Products";
import { handleFilterClicked } from "../../../../redux/slice/toggle/toggleSlice";
import { FaRegFolderOpen, FaRegFolder, FaTimes } from "react-icons/fa";
import { IoArrowRedoCircle } from "react-icons/io5";
import baseURL from "../../../../utils/baseURL";
import { fetchProductsAction } from "../../../../redux/slice/products/productSlice";
import { fetchBrandsAction } from "../../../../redux/slice/brands/brandSlice";
import { fetchColorsAction } from "../../../../redux/slice/colors/colorSlice";
import Loading from "../../../Messages/Loading/Loading";
import NoDataFound from "../../../Messages/NotFound/NoDataFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetErrorAction } from "../../../../redux/slice/global/globalActions";


const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const prices = ["0 - 100", "100 - 200", "300 - 400", "400 - 500", "501 and Above"];

function ProductsFilters() {
    const filterRef = useRef();
    const dispatch = useDispatch();
  
    // Get Query String form URL
    const [params, setParams] = useSearchParams();
    const category = params.get("category");

    // Filters
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');

    // Build up URL
    let productURL = `${baseURL}/products`;
    if (category) productURL = `${baseURL}/products?category=${category}`;
    if (brand) productURL = `${productURL}&brand=${brand}`;
    if (size) productURL = `${productURL}&size=${size}`;
    if (price) productURL = `${productURL}&price=${price}`;
    if (color) productURL = `${productURL}&color=${color}`;

    // Read All Products
    useEffect(() => {
        dispatch(fetchProductsAction({
          url: productURL,
        }))
      }, [dispatch, category, brand, size, price, color ]);          
    const { products: { products }, loading, error } = useSelector((state) => state?.products);

    // Read All Brands
    useEffect(() => {
      dispatch(fetchBrandsAction({
        url: productURL,
      }))
    }, [dispatch]);
    const { brands: { brands } } = useSelector((state) => state?.brands);

    // Read All Colors
    useEffect(() => {
      dispatch(fetchColorsAction({
        url: productURL,
      }))
    }, [dispatch]);
    const { colors: { colors } } = useSelector((state) => state?.colors);  

       // ! Toastify
       if(error) {
        toast.error(error?.message);
        dispatch(resetErrorAction());
      };
  
   
    // Auto Close to Opening Responsive Navbar 
    const filterClicked = useSelector((state) => state?.toggle?.filterClicked);
    if(!filterClicked) filterRef?.current?.classList?.remove("responsive"); 
    else filterRef?.current?.classList?.add("responsive");
    const showFilterBar = () => dispatch(handleFilterClicked());
    const [colorOpen, setColorOpen] = useState(false);  
    const [brandOpen, setBrandOpen] = useState(false);
    const [priceOpen, setPriceOpen] = useState(false);
    const [sizeOpen, setSizeOpen] = useState(false);    
    const handleBrandShow = () => setBrandOpen((value) => !value);
    const handleColorShow = () => setColorOpen((value) => !value);
    const handlePriceShow = () => setPriceOpen((value) => !value);
    const handleSizeShow = () => setSizeOpen((value) => !value);

    return (
        <>
                    <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} 
        pauseOnFocusLoss draggable={false} pauseOnHover={false} theme="light" />
        <div className="productsFilters">
            <div className="container">
                <div className="productsFiltering">
                    <div className="productFilter_open" onClick={showFilterBar}><IoArrowRedoCircle className="react-icons"/></div>
                    <div className="productsFiltering_header"><h1>Product Filters</h1></div>
                    <div className="productsFiltering_main">
                        <aside ref={filterRef}>
                            <div className="close_button_icon" onClick={showFilterBar}><FaTimes className="react-icons"/></div>
                            <form>
                                {/* Colors */}
                                <div className="product_filter_items">
                                    <div className="heading" onClick={handleColorShow}><h2>Colors</h2>{colorOpen ? <FaRegFolderOpen className="react-icons" /> : <FaRegFolder className="react-icons" />}</div>
                                    {colorOpen && (<>
                                        <div className="colors_item">
                                        {colors?.map((color) => {
                                            return (<div key={color?._id} className="color_item_radio" >
                                                <input onClick={() => setColor(color?.name)} type="radio" name="color" id={color?.name} />
                                                <label htmlFor={color?.name} style={{backgroundColor: color?.name}}></label>
                                            </div>)                                               
                                        })}
                                    </div>
                                    </>)}
                                </div>

                                {/* Brands */}
                                <div className="product_filter_item">
                                    <div className="heading" onClick={handleBrandShow}><h2>Brands</h2>{brandOpen ? <FaRegFolderOpen className="react-icons" /> : <FaRegFolder className="react-icons" />}</div>
                                        {brandOpen && (
                                            <div className="brand_items">
                                                {brands?.map((brand) => {
                                                    return (
                                                        <div className="brand_item" key={brand?._id}>
                                                            <input type="radio" name="brand" id={brand?.name} onClick={() => setBrand(brand?.name)} /> 
                                                            <label htmlFor={brand?.name} >{brand?.name}</label>                                                            
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                </div>
                                {/* Prices */}
                                <div className="product_filter_item">
                                    <div className="heading" onClick={handlePriceShow}><h2>Prices</h2>{priceOpen ? <FaRegFolderOpen className="react-icons" /> : <FaRegFolder className="react-icons" />}</div>
                                        {priceOpen && (<>
                                            <div className="brand_items">
                                        {prices?.map((price, index) => {
                                            return (<div key={index} className="brand_item">
                                                <input onClick={() => setPrice(price)} type="radio" name="price" id={index + "price"} />
                                                <label htmlFor={index + "price"} >{price}</label>
                                            </div>)                                               
                                        })}
                                    </div>
                                        </>)}
                                </div>

                                {/* Sizes */}
                                <div className="product_filter_item">
                                    <div className="heading" onClick={handleSizeShow}><h2>Sizes</h2>{sizeOpen ? <FaRegFolderOpen className="react-icons" /> : <FaRegFolder className="react-icons" />}</div>
                                        {sizeOpen && (<>
                                            <div className="brand_items">
                                        {sizes?.map((size, index) => {
                                            return (<div key={index} className="brand_item">
                                                <input onClick={() => setSize(size)} type="radio" name="size" id={size + "size"} />
                                                <label htmlFor={size + "size"} >{size}</label>
                                            </div>)                                               
                                        })}
                                    </div>
                                        </>)}
                                </div>
                            </form>
                        </aside>

                        <section>
                        {loading ? <Loading /> 
                            :  products?.length <= 0 ? <NoDataFound />
                            : <Products products={products} /> }    
                        </section>
                    </div>
                </div>
            </div>            
        </div>
        </>
    )
}

export default ProductsFilters
