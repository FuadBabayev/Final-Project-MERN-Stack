import { Link, useParams } from "react-router-dom";
import "./css/Review.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createReviewAction } from "../../../redux/slice/reviews/reviewSlice";
import Loading from "../../Messages/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetErrorAction, resetSuccessAction } from "../../../redux/slice/global/globalActions";

function Review() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    rating: "",
    message: "",
  });

  // onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createReviewAction({
        id,
        message: formData.message,
        rating: formData.rating,
      })
    );
    window.location.href = `/products/${id}`;    
  };

  // Get Data from Store
  const { isAdded, loading, error } = useSelector((state) => state?.reviews);

  // ! Toastify
  if(error){
    toast.error(error?.message);
    dispatch(resetErrorAction());
  }
  if (isAdded) {
    toast.success("Thanks for review");
    dispatch(resetSuccessAction());
  }
  return (
    <>
      <section className="addReview">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
        ;
        <div className="addProduct-header">
          <h2>Add Your Review</h2>
          <p>
            <span>You are reviewing:</span> Product Name
          </p>
        </div>
        <div className="addProduct-form">
          <form onSubmit={handleOnSubmit}>
            <div className="name">
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                name="rating"
                onChange={handleOnChange}
                value={formData?.rating}
              >
                <option>Give us Review</option>
                <option value="1">Poor</option>
                <option value="2">Unsatisfactory</option>
                <option value="3">Average</option>
                <option value="4">Good</option>
                <option value="5">Excellent</option>
              </select>
            </div>

            <div className="name">
              <label htmlFor="message">Description</label>
              <textarea
                name="message"
                id="message"
                onChange={handleOnChange}
                value={formData?.message}
              ></textarea>
            </div>

            <div className="button">
              {loading ? <Loading /> : (<> <button>Add Review</button> <Link to={`/products/${id}`}>Cancel</Link></>)}              
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Review;
