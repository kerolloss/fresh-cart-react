import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import NotFound from './Components/NotFound/NotFound'
import CounterContextProvider, { CounterContext } from './Context/CounterContext';
import UserContextProvider, { UserContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';


const routes = createBrowserRouter([
  { 
    path: '/', element: <Layout />, children: [
      {index:true , element:<ProtectedRoute > <Home/> </ProtectedRoute> },
      {path:'login' , element:<Login/>},
      {path:'register' , element:<Register/>},
      {path:'products' , element:<ProtectedRoute> <Products/> </ProtectedRoute>},
      {path:'categories' , element:<ProtectedRoute> <Categories/> </ProtectedRoute>},
      {path:'brands' , element:<ProtectedRoute> <Brands/> </ProtectedRoute>},
      {path:'cart' , element:<ProtectedRoute> <Cart/> </ProtectedRoute>},
      {path:'productdetails/:id' , element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
      {path:'*' , element:<NotFound/>},
    ] 
  }
])

function App() {
  

  return <UserContextProvider>
    <CounterContextProvider>
      <RouterProvider router={routes}></RouterProvider>
    </CounterContextProvider>
  </UserContextProvider>
}

export default App;
