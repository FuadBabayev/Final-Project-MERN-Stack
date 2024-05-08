import { Link } from "react-router-dom";
import "./css/HomeCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriestAction } from "../../../redux/slice/categories/categorySlice";
import { useEffect } from "react";
import Loading from "../../Messages/Loading/Loading";

function HomeCategory() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriestAction());
  }, [dispatch]);
  const { categories, loading } = useSelector((state) => state?.categories);
  const categoriesToDisplay = categories?.categories?.slice(0, 5);

  return (
    <>
      <section className="homeCategory">
        <div className="container">
          <div className="homeProductTrending_header">
            <h2>Shop by Category</h2>
            <Link to="/all-categories">Browse all categories</Link>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="homeProductTrending_carts">
              {categoriesToDisplay?.map((category) => (
                <div className="trending_cart" key={category?._id}>
                  <Link to={`/products-filters?category=${category?.name}`}>
                    <div className="trending_cart_upper">
                      <img src={category?.image} alt={category?.name} />
                    </div>
                    <div className="trending_cart_lower">
                      <p>
                        {category?.name} ({category?.products?.length})
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default HomeCategory;
