import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../../redux/slice/users/usersSlice";
import "./css/Register.css";
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn} from "react-icons/fa";
import Loading from "../../../Messages/Loading/Loading";
import ErrorMsg from "../../../Messages/SweetAlert/SweetError";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetErrorAction } from "../../../../redux/slice/global/globalActions";

function Register() {
  const { user, error, loading } = useSelector((state) => state?.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // Destructuring
  const { username, email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUserAction({ username, email, password }));
    setFormData({
      username: "",
      email: "",
      password: "",
    });  
  };

  if(error) {
    toast.error(error?.message);
    dispatch(resetErrorAction());
  };

  // ! Redirect
  useEffect(() => {
    if (user) navigate("/login");    
  }, [user]);
  // if (user) navigate("/login");  

  return (
    <>
       <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} 
      pauseOnFocusLoss draggable={false} pauseOnHover={false} theme="light" />
      <section className="register">
        <div className="container">
          <div className="register_cart">
            <div className="register_right-panel"></div>
            <div className="register_left-panel">
              {/* {error && <ErrorMsg message={error?.message} />} */}
              <form onSubmit={onSubmitHandler}>
                <h1>Create an account</h1>
                <div className="social-icons">
                  <a href="" className="icon"><FaGooglePlusG className="react-icons react-googlePlus" /></a>
                  <a href="" className="icon"><FaFacebookF className="react-icons react-facebook" /></a>
                  <a href="" className="icon"><FaGithub className="react-icons react-github" /></a>
                  <a href="" className="icon"><FaLinkedinIn className="react-icons react-linkEdin" /></a>
                </div>
                <input type="text" placeholder="Username" name="username" value={username} onChange={onChangeHandler} />
                <input type="email" placeholder="Email"  name="email" value={email} onChange={onChangeHandler} />
                <input type="password" placeholder="Password"  name="password" value={password} onChange={onChangeHandler} />
                <span>Already have an account? <Link to="/login" >Login</Link></span>
                {loading ? <Loading /> : <button>Sign Up</button>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;