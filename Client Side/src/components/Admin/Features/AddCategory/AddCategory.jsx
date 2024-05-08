import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategorytAction } from "../../../../redux/slice/categories/categorySlice";
import "./css/AddCategory.css"
import { CiCamera } from "react-icons/ci";
import Loading from "../../../Messages/Loading/Loading";
import ErrorMsg from "../../../Messages/SweetAlert/SweetError";
import SuccessMsg from "../../../Messages/SweetAlert/SweetSuccess";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetErrorAction, resetSuccessAction } from "../../../../redux/slice/global/globalActions";


function AddCategory() {
  const { loading, error, isAdded } = useSelector((state) => state?.categories);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
  });
  // onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // File
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  // File Handle Change
  const fileHandleChange = (event) => {
    const newFile = event.target.files[0];
    // Validation
    if (newFile?.size > 10000000) setFileError(`${newFile?.name} is too large`);
    if (!newFile?.type?.startsWith("image/")) setFileError(`${newFile?.name} is not image`);
    setFile(newFile);
  };

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategorytAction({
      name: formData?.name,
      file,
    }));
  };


  // ! Toastify
  if(error) {
    toast.error(error?.message);
    dispatch(resetErrorAction());
  };
  if(isAdded){
    toast.success("Category added successfully");
    dispatch(resetSuccessAction()); 
  }

  return (
    <>
      {/* {error && <ErrorMsg message={error?.message} />}
      {fileError && <ErrorMsg message={fileError} />}
      {isAdded && <SuccessMsg message="Category added successfully" />} */}
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} 
      pauseOnFocusLoss draggable={false} pauseOnHover={false} theme="light" />
      <section className="addCategory">
        <div className="addProduct-header">
          <h2>Add Product Category</h2>
        </div>
        <div className="addProduct-form">
          <form onSubmit={handleOnSubmit}>
            <div className="name">
              <label htmlFor="name">Category Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleOnChange} />
            </div>
            <div className="name">
              <label htmlFor="images">Upload Image</label>
              <div className="upload_images_background">
                <div className="icon"><CiCamera className="react-icons" /></div>
                <div className="information"><h3>Upload file</h3><p>PNG, JPG, GIF up to 10MB</p></div>
                <div className="input"><input type="file" name="images" id="file" value={formData.images} onChange={fileHandleChange} /></div>                
              </div>
            </div>
            <div className="button">
              {loading ? <Loading /> : <button>Add Category</button>}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddCategory;
