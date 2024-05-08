import { GrEdit } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";
import "./css/ManageStocks.css";
import picture from "/images/admin.webp";
import baseURL from "../../../../utils/baseURL";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../../../redux/slice/products/productSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";


function ManageStocks() {
    //delete product handler
    const deleteProductHandler = (id) => { };

    let productUrl = `${baseURL}/products`;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchProductsAction({
        url: productUrl
      }));
    }, [dispatch]);
    const { products: { products }, error, loading } = useSelector((state) => state?.products);
  return (
    <>
      <div className="recent-order">
        <h2>Product List <span className="product_list_count">{products?.length}</span></h2>
        <p className="product_list_prologue">List of all the products in your account including their name, title</p>

        <table className="manageStock_table">
          <thead>
            <tr>
              <th className="product">Product</th>
              <th className="name">Name</th>
              <th className="status">Status</th>
              <th className="category">Category</th>
              <th className="quantity">Amount</th>
              <th className="total_sold">Sold</th>
              <th className="qty_left">Remain</th>
              <th className="price">Price</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td className="product_item"><div className="image"><img  src={product?.images[0]} alt={product?.name} /></div></td>
                <td className="name_item"><div className="td"><h4>{product.name}</h4><h5>{product?.brand}</h5></div></td>
                <td className="status_item"><div className="td"><span style={{backgroundColor: product?.qtyLeft <= 0 ? "red" : null}}>{product?.qtyLeft <= 0 ? "Stock out" : "In Stock"}</span></div></td>
                <td className="category_item">{product?.category}</td>
                <td className="quantity_item">{product?.totalQty}</td>
                <td className="total_sold_item">{product?.totalSold}</td>
                <td className="qty_left_item">{product?.qtyLeft}</td>
                <td className="price_item">{product?.price}</td>
                <td className="action_item"><div className="action_item"><Link to={`/admin/products/edit/${product._id}`}><GrEdit className="react-icons" /></Link><BsTrash className="react-icons"/></div></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="manageStock_table-product">

        {products?.map((product) => (

          <div className="table_cart_item" key={product._id}>
            <div className="table_cart_item_above">
              <ul>
                <li>
                  <h3>Name</h3>
                  <p>{product.name} <span className="name_span">{product?.brand}</span></p>
                </li>
                <li>
                  <h3>Status</h3>
                  <p className="status_span" style={{backgroundColor: product?.qtyLeft <= 0 ? "red" : null}}>{product?.qtyLeft <= 0 ? "Stock out" : "In Stock"}</p>
                </li>
                <li>
                  <h3>Category</h3>
                  <p>{product?.category}</p>
                </li>
                <li>
                  <h3>Amount</h3>
                  <p>{product?.totalQty}</p>
                </li>
                <li>
                  <h3>Sold</h3>
                  <p>{product?.totalSold}</p>
                </li>
                <li>
                  <h3>Remain</h3>
                  <p>{product?.qtyLeft}</p>
                </li>
                <li>
                  <h3>Price</h3>
                  <p>{product?.price}</p>
                </li>
              </ul>
            </div>
            <div className="table_cart_item_below"><GrEdit className="react-icons" /></div>
            <div className="table_cart_item_below2"><BsTrash className="react-icons" /></div>
          </div>

        ) )}


        </div>
      </div>
    </>
  );
}

export default ManageStocks;
