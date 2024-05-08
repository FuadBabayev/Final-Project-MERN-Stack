import { Link } from "react-router-dom";
import "./css/Products.css";
import { FaShoppingCart } from "react-icons/fa";

function Products({products}) {
  return (
    <div className="products_component">
      <div className="all_products">
        {products?.map((product) => 
          <div className="trending_cart" key={product?._id}>
            <Link to={{ pathname: `/products/${product?.id}` }}>
              <div className="trending_cart_upper"><img src={product?.images[0]} alt={product?.name} /></div>
              <div className="trending_cart_lower">
                <h2>{product?.name}</h2><h3>${product?.price}</h3>
                <div className="addToChart"><button><FaShoppingCart className="react-icons" /><p>Add to Chart</p></button></div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}



export default Products;
