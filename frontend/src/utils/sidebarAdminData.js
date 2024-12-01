import { FaHome, FaUsers,FaArchive,FaReceipt  } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
export const sidebarAdminData=[


    {
        title: 'Trang chủ',
        icon: <FaHome/>,
        path: '/admin/home',
    },
    {
        title: 'Quản lý Users',
        icon: <FaUsers/>,
        path: '/admin/userlist',
    },
    {
        title: 'Quản lý sản phẩm',
        icon: <MdCategory/>,
        path: '/admin/productlist',
    },
    {
        title: 'Quản lý danh mục',
        icon: <FaArchive/>,
        path: '/admin/Categorylist',
    },
    // {
    //     title: 'Receipt',
    //     icon: <FaReceipt/>,
    //     path: '/admin/aaaaa',
    // },
    // {
    //     title: 'Coupon',
    //     icon: <RiCoupon2Fill/>,
    //     path: '/admin/aaaaaaaaaaaa',
    // },
]