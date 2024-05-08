import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetErrorAction } from "../../../redux/slice/global/globalActions";

const SweetError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
}

const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();
  SweetError(message);
  dispatch(resetErrorAction());
};

export default ErrorMsg;
