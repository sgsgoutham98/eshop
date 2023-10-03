import React from 'react';
import Navbar from './components/NavBar/navbar';
import LoginPage from './components/Login/loginPage';
import SignupComponent from './components/SignUp/signupPage';
import ProductDisplay from './components/Products/productPage'
import AddProductForm from './components/Products/addProductPage';
import AdminSignupComponent from './components/SignUp/adminSignupPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/homePage';
import BuyProduct from './components/Products/buyProduct';
import EditProductForm from './components/Products/EditProductPage';
import PlaceOrder from './components/Products/placeOrder';
import './App.css';
function Login() {
    return <><LoginPage/></>
}

function Signup() {
    return <SignupComponent/>
}

function Home() {
    return <ProductDisplay/>
}

function Products() {
    return <ProductDisplay/>
}

function BuyProductPage(){
    return <BuyProduct/>
}
function NavigateToPlaceOrder(){
    return <PlaceOrder/>
}

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignupComponent />} />
                    <Route exact path="/products" element={<Products/>} />
                    <Route path="/addproduct" element={<AddProductForm/>}/>
                    <Route path="/product/:id" element={<EditProductForm />}/>
                    <Route path="/admin/signup" element={<AdminSignupComponent />} />
                    <Route path="/products/:id" element={<BuyProduct />} />
                    <Route path="/placeOrder" element={<NavigateToPlaceOrder />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
