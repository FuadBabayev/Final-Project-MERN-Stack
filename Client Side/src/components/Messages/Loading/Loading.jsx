import ReactLoading from "react-loading";
import "./css/Loading.css";

function Loading() {
  return (
    <div className="loadinga">
      <div className="loading">
        <ReactLoading type="spin" color="#512da8" className="aa" />
      </div>
    </div>
  );
}

export default Loading;
