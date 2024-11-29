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
        title: 'Category',
        icon: <MdCategory/>,
        path: '/admin/productlist',
    },
    // {
    //     title: 'Archive',
    //     icon: <FaArchive/>,
    //     path: '/admin/vvv',
    // },
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