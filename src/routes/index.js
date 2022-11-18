import {Routes,Route} from 'react-router-dom'
import AppContainer from '../AppContainer';
import DashBoard from '../views/dashboard/DashBoard'

import Products from '../views/product/Products'
import ProductList from '../views/product/ProductList'
import ProductHistory from '../views/product/ProductHistory'
import ProductRentFee from '../views/product/ProductRentFee'
import ProductStock from '../views/product/ProductStock'

import Orders from '../views/order/Orders'
import OrderList from '../views/order/OrderList';

import Farmers from '../views/farmer/Farmers'
import BalanceHistory from '../views/farmer/BalanceHistory';
import RentFee from '../views/farmer/RentFee';
import FarmersList from '../views/farmer/FarmerList';

import WholeSalers from '../views/wholesaler/Wholesalers';
import WholeSalerList from '../views/wholesaler/WholeSalerList';
import OrderHistory from '../views/wholesaler/OrderHistory';

import Revenue from '../views/revenue/Revenues'
import Saleses from '../views/sales/Sales'

import LoginPage from '../views/login/LoginPage';
import ForgotPassword from '../views/login/ForgotPassword';
import Account from '../views/account/Account';


import NotFound from '../views/NotFound';
const RoutePage = () =>{
  return <Routes>
  <Route path='/' element={<AppContainer />}>
  <Route path='products' element={<Products />}>
  <Route path='histor' element={<ProductHistory />} />
  <Route path='list' element={<ProductList />} />
  <Route path='stock' element={<ProductStock />} />
  <Route path='rent-fee' element={<ProductRentFee />} />
  </Route> 
  
  <Route path='orders' element={<Orders />}>  
    <Route path='list' element={<OrderList />} />
    </Route>
    <Route path='dash-board' element={<DashBoard />}>        
    </Route>
     <Route path='farmers' element={<Farmers />}>
     <Route path='list' element={<FarmersList />} />
    <Route path=':faId/product-history/:tp' element={<ProductHistory />} />
    <Route path=':faId/rent-fee/:tr' element={<RentFee />} />
    <Route path=':faId/balance/:tb' element={<BalanceHistory />} />
     </Route>
     <Route path='wholesalers' element={<WholeSalers />}>
     <Route path='list' element={<WholeSalerList />} />
     <Route path=':whId/order-history' element={<OrderHistory />} />
      </Route>
     <Route path='/revenue' element={<Revenue />}>
     </Route>
     <Route path='sales' element={<Saleses />}>
     </Route>
  <Route path='/account' element={<Account />}></Route>
   </Route> 
   <Route path='/login' element={<LoginPage />} />
     <Route path='/forgot-password' element={<ForgotPassword />} />     
     <Route path="*" element={<NotFound />}/>    
  </Routes>
  
  
}
export default RoutePage