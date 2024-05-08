import { Link } from "react-router-dom";
import "./css/NotAuthorised.css";
import { BiSolidNoEntry } from "react-icons/bi";


function AdminOnly() {
    return (
        <div className="adminOnly_component">
            <h1>Sorry, operation not allowed <BiSolidNoEntry className="react-icons" /></h1>
            <p>Admin Only!</p>
            <div className="adminOnly_component_header"><Link to="/">Return to Home Page</Link></div>
        </div>
    )
}

export default AdminOnly;
