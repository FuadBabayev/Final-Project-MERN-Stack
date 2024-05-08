import { Link, Outlet } from "react-router-dom";
import "./css/AddFeatures.css"
import { TbBrandSafari  } from "react-icons/tb";
import { IoColorPaletteOutline  } from "react-icons/io5";
import { MdOutlineCategory, } from "react-icons/md";

function AddFeatures() {
    return (
        <div className="addFeatures">
            <div className="addFeatures_links">
                <ul>            
                    <li><div className="links"><MdOutlineCategory className="react-icons" /><Link to="">Add Category</Link></div></li>
                    <li><div className="links"><TbBrandSafari className="react-icons" /><Link to="add-brand">Add Brand</Link></div></li>
                    <li><div className="links"><IoColorPaletteOutline className="react-icons" /><Link to="add-color">Add Color</Link></div></li>
                </ul>
            </div>
            <div className="addFeatures_outlet"><Outlet /></div>
        </div>
    )
}

export default AddFeatures
