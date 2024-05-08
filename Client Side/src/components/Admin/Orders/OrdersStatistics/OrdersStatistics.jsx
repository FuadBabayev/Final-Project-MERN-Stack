import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMoneyBillAlt  } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { GiTakeMyMoney , GiPayMoney} from "react-icons/gi";
import "./css/OrdersStatistics.css"
import { fetchOrdersStatisticsAction } from "../../../../redux/slice/orders/orderSlice";


function OrdersStatistics() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchOrdersStatisticsAction());
    }, []);
    const { statistics, error, loading } = useSelector((state) => state?.orders);
    const obj = statistics?.summary;
    const stats = obj?.length > 0 ? Object.values(obj[0]) : [];
    return (
        <>
            
            <div className="user_statistics">
                <div className="today_sales today_sale_border">
                    <div className="today_sales_head">
                        <div className="today_sales_icon today_sale"><FaMoneyBillAlt className="react-icons" /></div>
                        {/* <h2>{statistics?.saleToday?.length <= 0 ? "$1249.00" : 0}</h2> */}
                        <h2>$1249.00</h2>
                    </div>
                    <div className="today_sales_foot"><h3>Today's Sales</h3></div>
                </div>
                <div className="today_sales min_order_border">
                    <div className="today_sales_head">
                        <div className="today_sales_icon min_order"><GiPayMoney className="react-icons" /></div>
                        <h2>${stats[2]}</h2>
                    </div>
                    <div className="today_sales_foot"><h3>Minimum Order</h3></div>
                </div>
                <div className="today_sales max_order_border">
                    <div className="today_sales_head ">
                        <div className="today_sales_icon max_order"><GiTakeMyMoney  className="react-icons" /></div>
                        <h2>${stats[3]}</h2>
                    </div>
                    <div className="today_sales_foot"><h3>Maximum Order</h3></div>
                </div>
                <div className="today_sales total_sale_border">
                    <div className="today_sales_head">
                        <div className="today_sales_icon total_sale"><FaSackDollar className="react-icons" /></div>
                        <h2>${stats[1]}</h2>
                    </div>
                    <div className="today_sales_foot"><h3>Total Sales</h3></div>
                </div>
            </div> <hr />

        </>
    )
}

export default OrdersStatistics
