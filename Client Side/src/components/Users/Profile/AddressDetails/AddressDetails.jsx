import "./css/AddressDetails.css";
import Delivery from "/images/delivery.jpg";

function AddressDetails() {
    return (
        <section className="addressDetails">
            <div className="addressDetails_partA"><img src={Delivery} alt="Delivery" /></div>
            <div className="addressDetails_partB">
                <div className="heading"><h2>Shipping Address Details</h2></div>
                <div className="shipping_table">
                    <ul>
                        <li><h3>Firstname</h3><p>Fuad</p></li>
                        <li><h3>Lastname</h3><p>Babayev</p></li>
                        <li><h3>Address</h3><p>General Skhlinski 19</p></li>
                        <li><h3>City</h3><p>Baku</p></li>
                        <li><h3>Country</h3><p>Azerbaijan</p></li>
                        <li><h3>phone</h3><p>0507431951</p></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default AddressDetails
