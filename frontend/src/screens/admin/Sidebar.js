import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        {/* <Link href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle-admin"> Products</Link>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/products"> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/product"> Create</Link>
                            </li>
                        </ul> */}
                        <Link to="/admin/productlist">Thông tin các sản phẩm</Link>
                    </li>

                    <li>
                        <Link to="/admin/orderlist">Thông tin các đơn hàng</Link>
                    </li>

                    <li>
                        <Link to="/admin/userlist">Thông tin các tài khoản</Link>
                    </li>

                    {/* <li>
                        <Link to="/admin/reviews">Thông tin các đánh giá</Link>
                    </li> */}

                </ul>
            </nav>
        </div>
    </>
  )
}

export default Sidebar