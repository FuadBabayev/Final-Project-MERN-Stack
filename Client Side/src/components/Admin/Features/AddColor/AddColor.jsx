import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/AddColor.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetErrorAction, resetSuccessAction } from "../../../../redux/slice/global/globalActions";
import { createColorAction } from "../../../../redux/slice/colors/colorSlice";
import Loading from "../../../Messages/Loading/Loading";

function AddColor() {
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
    dispatch(createColorAction(formData));
    // Reset form
    setFormData({ name: '' });
  };
  
  // Get Data From Store
  const { error, loading, isAdded } = useSelector((state) => state?.colors)

    // ! Toastify
    if(error) {
      toast.error(error?.message);
      dispatch(resetErrorAction());
    };
    if(isAdded) {
      toast.success("Color Created Succesfully");
      dispatch(resetSuccessAction());
    };
  return (
    <>
              <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} 
      pauseOnFocusLoss draggable={false} pauseOnHover={false} theme="light" />
      <section className="addColor">
        <div className="addProduct-header"><h2>Add Color</h2></div>
        <div className="addProduct-form">
          <form onSubmit={handleOnSubmit}>
            <div className="name"><label htmlFor="name">Color Name</label><input type="text" name="name" id="name" value={formData.name} onChange={handleOnChange} /></div>
            <div className="button">{loading ? <Loading /> : <button>Add Brand</button>}</div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddColor;
