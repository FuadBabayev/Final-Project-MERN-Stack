import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductAction, fetchProductAction, updateProductAction } from "../../../../redux/slice/products/productSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./css/UpdateProduct.css"
import { fetchCategoriestAction } from "../../../../redux/slice/categories/categorySlice";
import { fetchBrandsAction } from "../../../../redux/slice/brands/brandSlice";
import { fetchColorsAction } from "../../../../redux/slice/colors/colorSlice";
import Loading from "../../../Messages/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetErrorAction, resetSuccessAction } from "../../../../redux/slice/global/globalActions";
import { useParams } from "react-router-dom";


//animated components for react-select
const animatedComponents = makeAnimated();

function UpdateProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(()=> {
    dispatch(fetchProductAction(id));
  }, [id, dispatch]);
  // Categories 
  useEffect(() => {
    dispatch(fetchCategoriestAction());
  }, [dispatch]);
  const { categories } = useSelector((state) => state?.categories?.categories); 
  // Brands 
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);
  const { brands } = useSelector((state) => state?.brands?.brands);
  // Sizes
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const [sizeOption, setSizeOption] = useState([]);
  const handleSizeChange = (sizes) => setSizeOption(sizes);
  // Converted Sizes (React Select required like that)
  const sizeOptionsCoverted = sizes?.map((size) => {
    return {
      value: size,
      label: size,
    }
  });
  // Colors 
  const [colorOption, setColorOption] = useState([]);
  const { colors } = useSelector((state) => state?.colors?.colors);
  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);
  const handleColorChangeOption = (colors) => setColorOption(colors);
  // Converted Colors
  const colorOptionsCoverted = colors?.map((color) => {
    return {
      value: color?.name,
      label: color?.name,
    }
  });

  // Get Product from Store
  const { product, isUpdated, loading, error } = useSelector((state) => state?.products);


  // Form Data
  const [formData, setFormData] = useState({
    name: product?.product?.name,
    description: product?.product?.description,
    price: product?.product?.price,
    totalQty: product?.product?.totalQty,
    category: "",
    colors: "",
    sizes: "",
    brand: "",
  });
  // onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  // ! Toastify
  if(error) {
    toast.error(error?.message);
    dispatch(resetErrorAction());
  };
  if(isUpdated){
    toast.success("Product Updated Succesfully");
    dispatch(resetSuccessAction());
  };

  // onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAction({
      ...formData,
      id,
      colors: colorOption?.map((color) => color.label),
      sizes: sizeOption?.map((size) => size.label)}
    ));

    // ! Reset Form data
    setFormData({
      name: "",
      description: "",
      category: "",
      sizes: "",
      brand: "",
      colors: "",
      images: "",
      price: "",
      totalQty: "",
    });
  };


  return (
    <>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} 
      pauseOnFocusLoss draggable={false} pauseOnHover={false} theme="light" />
      <section className="updateProduct">
        <div className="addProduct-header">
          <h2>Update Product</h2>
        </div>
        <div className="addProduct-form">
          <form onSubmit={handleOnSubmit}>
            <div className="name">
              <label htmlFor="name">Product Name</label>
              <input type="text" name="name" id="name" value={formData?.name} onChange={handleOnChange} />
            </div>

            <div className="name">
              <label htmlFor="category">Select Category</label>
              <select id="category" name="category" value={formData?.category} onChange={handleOnChange}>
                <option>Categories</option>
                {categories?.map((category) => <option  key={category?._id} value={category?.name}>{category.name}</option> )}
              </select>
            </div>

            <div className="name">
              <label htmlFor="brand">Select Brand</label>
              <select id="brand" name="brand" value={formData?.brand} onChange={handleOnChange}>
                <option>Brands</option>
                {brands?.map((brand) => <option  key={brand?._id} value={brand?.name}>{brand.name}</option> )}
              </select>
            </div>

            <div className="select">
              <div className="react-select">
                <label htmlFor="size">Select Size</label>
                <Select
                  components={animatedComponents}
                  isMulti
                  name="sizes"
                  options={sizeOptionsCoverted}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isClearable={true}
                  isLoading={false}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  onChange={(item) => handleSizeChange(item)}
                />
              </div>
            </div>

            <div className="select">
              <div className="react-select">
                <label htmlFor="color">Select Color</label>
                <Select
                  components={animatedComponents}
                  isMulti
                  name="colors"
                  options={colorOptionsCoverted}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isClearable={true}
                  isLoading={false}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  onChange={(item) => handleColorChangeOption(item)}
                />
              </div>
            </div> 

            <div className="name">
              <label htmlFor="price">Product Price</label>
              <input type="number" name="price" id="price" value={formData?.price} onChange={handleOnChange}  />
            </div>

            <div className="name">
              <label htmlFor="quantity">Product Quantity</label>
              <input type="number" name="totalQty" id="quantity" value={formData?.totalQty} onChange={handleOnChange} />
            </div>

            <div className="name">
              <label htmlFor="description">Add Product Description</label>
              <textarea name="description" id="description" value={formData?.description} onChange={handleOnChange}></textarea>
            </div>

            {loading ? <Loading /> : <div className="button"><button>Update Product</button></div>}
          </form>
        </div>
      </section>
    </>
  )}

export default UpdateProduct;
