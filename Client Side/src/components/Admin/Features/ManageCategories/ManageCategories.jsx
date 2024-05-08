import { Link } from "react-router-dom";
import "./css/ManageCategories.css"
import picture from "/images/admin.webp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategoriestAction } from "../../../../redux/slice/categories/categorySlice";
import Loading from "../../../Messages/Loading/Loading";
import NoDataFound from "../../../Messages/NotFound/NoDataFound";


function ManageCategories() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriestAction());
  }, [dispatch]);
  const { categories: {categories}, loading, error } = useSelector((state) => state?.categories);
  return (
    <>
      <div className="manageCategories">
        <div className="manageCategories_header">
          <div className="manageCategories_header_writing">
            <h2>All Categories<span className="product_list_count">{categories?.length}</span></h2>
            <p className="product_list_prologue">A list of all the categories in your account including their name, title</p>
          </div>
          <div className="manageCategories_header_button">            
            <form><div className="button"><button><Link to="/admin/add-features">Add New Category</Link></button></div></form>
          </div>
        </div>

    
        {loading ? <Loading /> : categories?.length <= 0 ? <NoDataFound /> : (<>
          <table className="manageStock_table">
          <thead>
            <tr>
              <th className="product">Category</th>
              <th className="name">Name</th>
              <th className="status">Number of Product</th>
              <th className="category">Created At</th>
            </tr>
          </thead>
          <tbody>
          {categories?.map((category) => 
              <tr key={category?._id}>
                <td className="product_item"><div className="image"><img src={category?.image} alt={category?.name} /></div></td>
                <td className="name_item">{category?.name}</td>
                <td className="status_item">{category?.products?.length}</td>
                <td className="category_item">{new Date(category?.createdAt).toLocaleDateString()}</td>
              </tr>          
          )}
            
          </tbody>
        </table>
        </>) }

      </div>
    </>
  );
}

export default ManageCategories;
