import { Link, useNavigate } from 'react-router-dom';
import {Badge,Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap'
import {BsCart,BsPerson ,BsSuitHeart } from 'react-icons/bs';
import logoBook from '../imageshome/pngwing.png'
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';
import SearchBox from './SearchBox';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { IoIosLogOut } from "react-icons/io";
import { useSelector, useDispatch} from 'react-redux'; 
import { useState } from 'react';
import { IoPersonOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
const Header = () => {
    const { cartItems} = useSelector((state) => state.cart );
   const { userInfo} = useSelector ((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [logoutApiCall]= useLogoutMutation();
   const [anchorEl, setAnchorEl] = useState(null)
   const open = '';
   const handleClick =(event) =>{
        setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
    setAnchorEl(null);
  };
   const logoutHandler = async () =>{
    try {
        await logoutApiCall().unwrap()
        dispatch(logout())
        navigate('/login')
    } catch (err){
        console.log(err)
    
   }
}
  return (
    <header>
        {/* <Navbar bg = "dark" variant='dark' expand= "lg" collapseOnSelect>
            <Container className='justify-content-center align-items-center gap-3'>
                <LinkContainer to = '/'>
                <Navbar.Brand>
                    Book Store Future
                </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className='ps-3'>
                       <SearchBox/>
                    </div>
                    <Nav className="ms-auto">
                        <LinkContainer to = '/favorite'>
                        <Nav.Link title='Yêu thích'><BsFillHeartFill size={20}/>
                        </Nav.Link>
                        </LinkContainer>
                        <div className='container cart' style={{ position: "relative"}}>
                        <LinkContainer to ='/cart'>
                        <Nav.Link title='Giỏ hàng'>       
                           {
                             cartItems.length > 0 && (
                                <Badge pill bg ='success'  style={{ position: 'absolute',top: '-4px', left: '30px',zIndex: '11'}}>
                                {cartItems.reduce((a,c) =>a +c.qty , 0) }
                                </Badge>
                                ) 
                             }
                            <BsCart  size={20} style={{ zIndex: '10'}}/>
                        </Nav.Link>
                        </LinkContainer>
                        </div>
                        {userInfo ? (
                            
                            <NavDropdown title = {userInfo.name} id = 'username'>
                               
                                <LinkContainer to = '/profile'>
                                <NavDropdown.Item>Thông tin cá nhân</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to = '/listorder'>
                                <NavDropdown.Item>Thông tin đơn hàng</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Đăng xuất
                                </NavDropdown.Item>
                            </NavDropdown>
                            
                        ) : (<LinkContainer to ='/login'>
                        <Nav.Link title='Tài khoản'><BsFillPersonFill size={20}/>
                        </Nav.Link>
                        </LinkContainer>)
                        } */}
                                        {/* comment lan 2 Admin Links */}
                            {/* {userInfo && userInfo.isAdmin && (
                                <NavDropdown  style={{paddingLeft: '10px'}} title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/dashboard'>
                                    <NavDropdown.Item>Dasbord</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Thông tin các đơn hàng</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Thông tin các tài khoản</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Thông tin các sản phẩm</NavDropdown.Item>
                                </LinkContainer>
                                </NavDropdown>
                            )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> */}

    <div className="container-sm">
          <div className="row align-items-sm-center">
              <div className="col-2 heard-logo">
                  <a href='/'>
                    <img className ="h-20" src={logoBook} alt='brand'/>
                  </a>
              </div>
              <div className="col-6 serch-bar">
                  <SearchBox/>
              </div>
              <div className="col-4">
                  <div className="flex justify-content-end">
                          
                        
                             {userInfo ? (
                            
                            // <NavDropdown title = {userInfo.name} id = 'username'>
                               
                            //     <LinkContainer to = '/profile'>
                            //     <NavDropdown.Item>Thông tin cá nhân</NavDropdown.Item>
                            //     </LinkContainer>
                            //     <LinkContainer to = '/listorder'>
                            //     <NavDropdown.Item>Thông tin đơn hàng</NavDropdown.Item>
                            //     </LinkContainer>
                            //     <NavDropdown.Item onClick={logoutHandler}>
                            //         Đăng xuất
                            //     </NavDropdown.Item>
                            // </NavDropdown>
                        <>


{/*                           
                            <NavDropdown title = {userInfo.name} id = 'username'>
                               
                               <LinkContainer to = '/profile'>
                              <NavDropdown.Item>Thông tin cá nhân</NavDropdown.Item>
                             </LinkContainer>
                              <LinkContainer to = '/listorder'>
                               <NavDropdown.Item>Thông tin đơn hàng</NavDropdown.Item>
                              </LinkContainer>
                              <NavDropdown.Item onClick={logoutHandler}>
                                 Đăng xuất
                                </NavDropdown.Item>
                           </NavDropdown> */}
                         <div className="wishlist me-4">
                         <Link to = '/favorite'> 
                         <i className="text-[24px]"> <BsSuitHeart  /></i>
                         </Link>
                        </div>
                        <div className="cart me-4">
                        <Link to = '/cart'> 
                          <i className="text-[24px]"><BsCart /></i>
                        </Link>
                        </div>
                        <div className="order me-4">
                        <Link to='/login'>
                        <i className="text-[24px]"><BsPerson  /></i>
                        </Link>
                        </div>

                        <button
                            
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleClick}
                        >
                              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </button>
                        <Menu
                         id="basic-menu"
                         anchorEl={anchorEl}
                         open={anchorEl}
                         disableScrollLock={true}
                         onClose={handleClose}
                         MenuListProps={{
                           'aria-labelledby': 'basic-button',
                         }}
                        
                         >
                            
                            <MenuItem onClick={handleClose}>  
                            <IoPersonOutline className="mr-2" />
                            Hồ sơ của tôi</MenuItem>
                            <MenuItem onClick={handleClose}>
                            <RiBillLine className="mr-2" />
                            Đơn hàng của tôi</MenuItem>
                            <MenuItem onClick={logoutHandler}>
                            <IoIosLogOut className="mr-2" />
                            Đăng xuất
                            </MenuItem>
                        </Menu>

                        </>
                        
                            
                        ) : (<LinkContainer to ='/login'>
                        <Nav.Link title='Tài khoản'>
                            <button className='text-[14px] text-[#fff] bg-[#592fd7] capitalize flex items-center p-[8px] gap-x-[6px] border-solid border-[1px] rounded-[6px] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]'>
                                <BsPerson size={20}/>
                                Đăng Nhập
                            </button>
                        </Nav.Link>
                        </LinkContainer>)
                        }
                                        {/* comment lan 2 Admin Links */}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown  style={{paddingLeft: '10px'}} title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/dashboard'>
                                    <NavDropdown.Item>Dasbord</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Thông tin các đơn hàng</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Thông tin các tài khoản</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Thông tin các sản phẩm</NavDropdown.Item>
                                </LinkContainer>
                                </NavDropdown>
                            )}
                  </div>
              </div>
          </div>

         
    </div>
    </header>
  )
}

export default Header