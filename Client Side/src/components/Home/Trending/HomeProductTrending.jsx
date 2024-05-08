import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./css/HomeProductTrending.css";
import { fetchProductsAction } from "../../../redux/slice/products/productSlice";
import baseURL from "../../../utils/baseURL";
import Loading from "../../Messages/Loading/Loading";

function HomeProductTrending() {
  let productURL = `${baseURL}/products`;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchProductsAction({
        url: productURL,
      })
    );
  }, [dispatch]);

  const { products, loading } = useSelector((state) => state?.products);
  const recentlyAdded = products?.products?.slice(
    products?.products?.length - 4,
    products?.products?.length
  );

  return (
    <>
      <section className="homeProductTrending">
        <div className="container">
          <div className="homeProductTrending_header">
            <h2>Recently Added</h2>
            <Link to="/products-filter">Shop the collection</Link>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="homeProductTrending_carts">
              {/* {products?.products?.slice(0, 4).map((product) => { */}
              {recentlyAdded?.map((product) => {
                return (
                  <div className="trending_cart" key={product.id}>
                    <Link to={`/products/${product._id}`}>
                      <div className="trending_cart_upper">
                        <img src={product.images[0]} alt={product.images[0]} />
                      </div>
                      <div className="trending_cart_lower">
                        <h2>{product.name}</h2>
                        <h3>${product.price}.00</h3>
                        <p>
                          {product.description.slice(0, 70)}{" "}
                          <span>
                            {" "}
                            {product.description.length > 100
                              ? "...read more"
                              : null}
                          </span>
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default HomeProductTrending;
