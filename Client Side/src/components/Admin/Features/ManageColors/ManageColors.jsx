import { Link } from "react-router-dom"
import "./css/ManageColors.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchColorsAction } from "../../../../redux/slice/colors/colorSlice";
import Loading from "../../../Messages/Loading/Loading";
import NoDataFound from "../../../Messages/NotFound/NoDataFound";

function ManageColors() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);
  const { colors: {colors}, loading, error } = useSelector((state) => state?.colors);
    return (
        <>
    <div className="manageColors">
        <div className="manageCategories_header">
          <div className="manageCategories_header_writing">
            <h2>All Colors<span className="product_list_count">{colors?.length}</span></h2>
            <p className="product_list_prologue">A list of all the colors in your account including their name, title</p>
          </div>
          <div className="manageCategories_header_button">            
            <form><div className="button"><button><Link to="/admin/add-features/add-color">Add New Color</Link></button></div></form>
          </div>
        </div>

        {loading ? <Loading /> : colors?.length <= 0 ? <NoDataFound /> : (<>
        
        <table className="manageStock_table">
          <thead>
            <tr>
              <th className="product">Color</th>
              <th className="name">Name</th>
              <th className="category">Created At</th>
            </tr>
          </thead>
          <tbody>
          {colors?.map((color) => 
                      <tr key={color?._id}>
                      <td className="name_item"><div className="color_circle" style={{backgroundColor: color?.name.toLowerCase(), border: "1px solid gray"}}></div> </td>
                      <td className="status_item">{color?.name}</td>
                      <td className="category_item">{new Date(color?.createdAt).toLocaleDateString()}</td>
                    </tr>    
          )}          
          </tbody>
        </table>
        </>)}
      </div>  
        </>
    )
}

export default ManageColors
