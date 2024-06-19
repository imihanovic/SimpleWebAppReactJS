import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from "./userForms/LoginForm";
import RegisterForm from "./userForms/RegisterForm";
import Products from "./views/products/Products"
import { useAuthContext } from "./jsHooks/useAuthContext";
import NavigationBar from "./reuseable/NavigationBar";
import ProducerDetailsPage from "./views/producers/ProducerDetails";
import ProductDetailsPage from "./views/products/ProductDetails";
import Producers from "./views/producers/Producers";
import EditProduct from "./views/products/EditProduct";
import AddProduct from "./views/products/AddProduct";
import AddProducer from "./views/producers/AddProducer";
import EditProducer from "./views/producers/EditProducer";
import Cart from "./views/Cart";
import UsersPage from "./views/users/Users";
import EditUser from "./views/users/EditUser";
import EditPassword from "./views/users/EditPassword";
import { userRoles } from "./enums/userRoles";
import { useLogout } from "./jsHooks/users/useLogout";


function PrivateRoute({ children }) {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  let navigate = useNavigate();

  if (!user || user.role !== userRoles.Admin) {
    logout();
    navigate("/login");
    return null;
  }

  return children;
}

function App() {
  const { user } = useAuthContext();

  return (
    <div className='App'>
      <BrowserRouter>
        {user && <NavigationBar />}
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/home' element={<Products />} />
          <Route path='/producers/' element={<Producers />} />
          <Route path='/cart' element={<Cart />} />

          <Route path='/product/:id' element={<ProductDetailsPage />} />
          <Route path='/products/add' element={ <PrivateRoute> <AddProduct /> </PrivateRoute>} />
          <Route path='/products/edit/:id' element={<PrivateRoute> <EditProduct /> </PrivateRoute>} />
          <Route path='/producer/:id' element={<ProducerDetailsPage />} />
          <Route path='/producers/add' element={<PrivateRoute> <AddProducer /> </PrivateRoute>} />
          <Route path='/producer/edit/:id' element={<PrivateRoute> <EditProducer /> </PrivateRoute>} />
          <Route path='/users/' element={<PrivateRoute> <UsersPage /> </PrivateRoute>} />
          <Route path='/users/edit/:id' element={<PrivateRoute> <EditUser /> </PrivateRoute>} />
          <Route path='/users/editPassword/:id' element={<PrivateRoute> <EditPassword /> </PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
