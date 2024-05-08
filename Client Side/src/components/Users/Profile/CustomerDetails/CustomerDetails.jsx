import "./css/CustomerDetails.css";
import { BsCalendar2Date  } from "react-icons/bs";
import { MdAlternateEmail  } from "react-icons/md";

function CustomerDetails({ email, dateJoined, username }) {
    return (
        <div className="customerDetails">
            <div className="user_profile">
                <div className="user_profile_aboutAdmin"><p>Hi, {username} you are welcome</p></div>
                <div className="user_profile_aboutTime">
                    <p><MdAlternateEmail className="react-icons" />{email}</p>
                    <p><BsCalendar2Date className="react-icons " />{dateJoined}</p>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetails
