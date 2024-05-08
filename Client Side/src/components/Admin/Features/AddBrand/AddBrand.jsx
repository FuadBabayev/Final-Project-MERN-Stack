import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/AddBrand.css"
import { createBrandAction } from "../../../../redux/slice/brands/brandSlice";
import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetErrorAction, resetSuccessAction } from "../../../../redux/slice/global/globalActions";

function AddBrand() {
  const dispatch = useDispatch();
  //form data
  const [formData, setFormData] = useState({
    name: "",
  });
  // onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createBrandAction(formData));
    // Reset form
    setFormData({ name: '' });
  };
  
  // Get Data From Store
  const { error, loading, isAdded } = useSelector((state) => state?.brands);

    // ! Toastify
    if(error) {
      toast.error(error?.message);
      dispatch(resetErrorAction());
    };
    if(isAdded) {
      toast.success("Brand Created Succesfully");
      dispatch(resetSuccessAction());
    };

  return (
    <>
          <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} 
      pauseOnFocusLoss draggable={false} pauseOnHover={false} theme="light" />
      <section className="addBrand">
        <div className="addProduct-header"><h2>Add Brand</h2></div>
        <div className="addProduct-form">
          <form onSubmit={handleOnSubmit}>
            <div className="name"><label htmlFor="name">Brand Name</label><input type="text" name="name" id="name" onChange={handleOnChange} value={formData.name}  /></div>
            <div className="button">{loading ? <Loading /> : <button>Add Brand</button>}</div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddBrand;
