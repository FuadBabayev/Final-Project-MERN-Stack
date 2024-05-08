import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetSuccessAction } from "../../../redux/slice/global/globalActions";

const SweetSuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "Good job!",
    text: message,
  });
}

const SuccessMsg = ({ message }) => {
  const dispatch = useDispatch();
  SweetSuccess(message);
  dispatch(resetSuccessAction());
};

export default SuccessMsg;
