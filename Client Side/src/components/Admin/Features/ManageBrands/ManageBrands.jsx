import { Link } from "react-router-dom";
import "./css/ManageBrands.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBrandsAction } from "../../../../redux/slice/brands/brandSlice";
import Loading from "../../../Messages/Loading/Loading";
import NoDataFound from "../../../Messages/NotFound/NoDataFound";

function ManageBrands() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);
  const { brands: {brands}, loading, error } = useSelector((state) => state?.brands);
    return (
        <>
    <div className="manageBrands">
        <div className="manageCategories_header">
          <div className="manageCategories_header_writing">
            <h2>All Brands<span className="product_list_count">{brands?.length}</span></h2>
            <p className="product_list_prologue">A list of all the brands in your account including their name, title</p>
          </div>
          <div className="manageCategories_header_button">            
            <form><div className="button"><button><Link to="/admin/add-features/add-brand">Add New Brand</Link></button></div></form>
          </div>
        </div>

        {loading ? <Loading /> : brands?.length <= 0 ? <NoDataFound /> : (<>
          <table className="manageStock_table">
          <thead>
            <tr>
              <th className="name">Name</th>
              <th className="category">Created At</th>
            </tr>
          </thead>
          <tbody>

          {brands?.map((brand) => 
            <tr key={brand?._id}>
              <td className="status_item">{brand?.name}</td>
              <td className="category_item">{new Date(brand?.createdAt).toLocaleDateString()}</td>
            </tr>          
          )}
          </tbody>
        </table>
        </>)}


      </div>  
        </>
    )
}

export default ManageBrands
