import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import './assets/styles/bootstrap.custom.css';
//import './assets/styles/index.css';
// import './assets/indexImg';
import './App.css';
import './index.css';
import App from './App';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './componets/PrivateRoute';
import ProductScreem from './screens/ProductScreem';
import ProductGridScreen from './screens/ProductGridScreen';
import AdminRoute from './componets/AdminRoute';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentOrder from './screens/PaymentOrder';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import ListOrderScreen from './screens/ListOrderScreen';
import DashboardScreen from './screens/admin/DashboardScreen';
import ListOrderAdminScreen from './screens/admin/ListOrderAdminScreen';
import ProductList from './screens/admin/ProductList';
import UpdateProdctScreen from './screens/admin/UpdateProdctScreen';
import ListUsersAminScreen from './screens/admin/ListUsersAminScreen';
import UpdateUserScreen from './screens/admin/UpdateUserScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ChangePassword from './screens/ChangePassword';
import AddressScreen from './screens/AddressScreen';
import NewAddressScreen from './screens/NewAddressScreen';
import ReadSampleScreen from './screens/ReadSampleScreen';
import AudioSampleScreen from './screens/AudioSampleScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import EditAddressScreen from './screens/EditAddressScreen';
import DetailProduct from './screens/admin/DetailProduct';
import CouponScreen from './screens/CouponScreen';
import CategoryScreen from './screens/admin/CategoryScreen';


const router = createBrowserRouter(
  createRoutesFromElements (
    <Route path="/" element = { <App />}>
      <Route  index = {true} path="/" element = { <Home />} />
      <Route  path="/:id" element = { <ProductScreem />} />
      <Route path="/all-product" element={< ProductGridScreen/>}/>
      {/* <Route path="/all-product/search/:keyword" element={< ProductGridScreen/>}/> */}
      {/* <Route path="/all-product/filter/:category" element={< ProductGridScreen/>}/> */}
      {/* <Route path="/all-product/page/:pageNumber" element={< ProductGridScreen/>}/> */}
      {/* <Route path="/all-product/search/:keyword/page/:pageNumber" element={< ProductGridScreen/>}/>
      <Route path="/all-product/filter/:category/page/:pageNumber" element={< ProductGridScreen/>}/> */}
      <Route path="/login" element={< LoginScreen/>}/>
      <Route path="/register" element={<RegisterScreen/>}/>
      <Route path='/forgetpassword' element ={<ForgetPasswordScreen/>}/>
      <Route path='/cart' element= { <CartScreen/>}/>
      <Route path='' element = {<PrivateRoute/>}>
      <Route path='/shipping' element= {<ShippingScreen/>}/>
      <Route path='/payment' element ={<PaymentOrder/>}/>
      <Route path='/order' element ={<OrderScreen/>}/>
      <Route path='/profile' element ={<ProfileScreen/>}/>
      <Route path='/listorder' element ={<ListOrderScreen/>}/>
      <Route path='/favorite' element ={<FavoriteScreen/>}/>
      <Route path='/changepassword' element ={<ChangePassword/>}/>
      <Route path='/address' element ={<AddressScreen/>}/>
      <Route path='/coupon' element ={<CouponScreen/>}/>
      <Route path='/address/new' element ={<NewAddressScreen/>}/>
      <Route path='/address/new/:id' element ={<EditAddressScreen/>}/>
      <Route path='/readsample' element ={<ReadSampleScreen/>}/>
      <Route path='/audio' element ={<AudioSampleScreen/>}/>

      <Route path='/forgetpassword' element ={<ForgetPasswordScreen/>}/>
      </Route>

      {/* <Route path='' element = {<AdminRoute/>}> */}
      <Route path='/admin/home' element={<DashboardScreen/>}/>

      <Route path='/admin/orderlist' element={<ListOrderAdminScreen />}/>
      <Route path='/admin/productlist' element={<ProductList/>}/>
      <Route path='/admin/productlist/detailproduct' element={<DetailProduct/>}/>
      <Route path='/admin/product/:id/edit' element={<UpdateProdctScreen/>}/>
      <Route path='/admin/productlist/:pageNumber' element={<ProductList/>}/>
      <Route path='/admin/userlist' element={<ListUsersAminScreen />}/>
      <Route path='/admin/Categorylist' element={<CategoryScreen />}/>
      <Route path='/admin/user/:id/edit' element={<UpdateUserScreen />}/>

      {/* </Route> */}

      
    </Route>
    
  )
  
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
    <RouterProvider router={router} />
    </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

