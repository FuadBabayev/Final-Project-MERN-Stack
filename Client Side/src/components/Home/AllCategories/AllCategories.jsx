import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./css/AllCategories.css";
import { fetchCategoriestAction } from "../../../redux/slice/categories/categorySlice";


function AllCategories() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriestAction());
  }, [dispatch]);
  const { categories } = useSelector((state) => state?.categories);
  const categoriesToDisplay = categories?.categories;

  return (
    <>
      <section className="allCategories">
        <div className="container">
        <h2>Total Categories<span className="product_list_count">{categoriesToDisplay?.length}</span></h2>
        <p className="product_list_prologue">Browse our categories and find the best products for you.</p>
          <div className="homeProductTrending_carts">
            {categoriesToDisplay?.map((category) =>
                <div className="trending_cart" key={category?._id}>
                  <Link to={`/products-filters?category=${category?.name}`}>
                    <div className="trending_cart_upper"><img src={category?.image} alt={category?.name} /></div>
                    <div className="trending_cart_lower"><p>{category?.name} ({category?.products?.length})</p></div>
                  </Link>
                </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AllCategories;
