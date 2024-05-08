import { Link } from "react-router-dom";
import "./css/ThanksForOrdering.css";
import WarDrobe from "/images/successPayment.jpg"

function ThanksForOrdering() {
    return (
        <section className="thanksForOrdering">
            <div className="thanksForOrdering_partA"><img src={WarDrobe} alt="WarDrobe" /></div>
            <div className="thanksForOrdering_partB">
                <h4>Payment successful</h4>
                <h2>Thanks for ordering</h2>
                <h3>We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation very soon!</h3>
                <div className="link"><Link to="/" >Continue Shopping</Link></div>
            </div>
        </section>
    )
}

export default ThanksForOrdering
