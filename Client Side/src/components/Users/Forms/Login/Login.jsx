import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../../redux/slice/users/usersSlice";
import "./css/Login.css";
import {  FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn, FaEye, FaEyeSlash} from "react-icons/fa";
import Loading from "../../../Messages/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorMsg from "../../../Messages/SweetAlert/SweetError";
import { resetErrorAction } from "../../../../redux/slice/global/globalActions";


function Login() {
  // Dispatch & Navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  // Handlers
  const handleToggle = () => setShow((show) => !show);
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(formData));
    setFormData({
      email: "",
      password: "",
    });  
  };

  // Get Data form Store
  const { error, loading, userInfo } = useSelector(state => state?.users?.userAuth);
  // ! Toastify
  if(error) {
    toast.error(error?.message);
    dispatch(resetErrorAction());
  };
  // if(Object.keys(userInfo).length > 0) {
  //   toast.success("Logged in");
  //   // dispatch(resetSuccessAction());
  // };

  // ! Redirect
  useEffect(()=>{
    if (userInfo?.userFound || localStorage.getItem("userInfo")) window.location.href = "/";
  }, [userInfo])
  // useEffect(()=>{
  //   if (userInfo?.userFound) navigate("/admin");
  // }, [userInfo]);
  // useEffect(()=>{
  //   if (userInfo?.userFound?.isAdmin) navigate("/admin");
  //   else navigate("/customer-profile");
  // }, [userInfo]);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} 
      pauseOnFocusLoss draggable={false} pauseOnHover={false} theme="light" />
      <section className="login">
        <div className="container">
          <div className="login_cart">
            <div className="login_left-panel">
              {/* {error && <ErrorMsg message={error?.message} />} */}
              <form onSubmit={onSubmitHandler}>
                <h1>Login to your account</h1>
                <div className="social-icons">
                  <a href="" className="icon"><FaGooglePlusG className="react-icons react-googlePlus" /></a>
                  <a href="" className="icon"><FaFacebookF className="react-icons react-facebook" /></a>
                  <a href="" className="icon"><FaGithub className="react-icons react-github" /></a>
                  <a href="" className="icon"><FaLinkedinIn className="react-icons react-linkEdin" /></a>
                </div>
                <div className="input-login">
                  <input type="email" placeholder="Email" name="email" value={formData.email} onChange={onChangeHandler} />
                </div>
                <div className="input-password">
                  <input type={show ? "text" : "password"} placeholder="Password" name="password" value={formData.password} onChange={onChangeHandler} />
                  <div className="show_hide" onClick={handleToggle}>
                    {show ? <FaEyeSlash className="react-icons react-show-hide" /> : <FaEye className="react-icons react-show-hide" /> }
                  </div>
                </div>
                <span>Don't have an account yet? <Link to="/register">Sign Up</Link></span>
                {loading ? <Loading /> : <button>Sign In</button>}
              </form>
            </div>
            <div className="login_right-panel"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
