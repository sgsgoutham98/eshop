import React from 'react';
import Navbar from './components/NavBar/navbar';
import LoginPage from './components/Login/loginPage';
import SignupComponent from './components/SignUp/signupPage';
import ProductDisplay from './components/Products/productPage'
import AddProductForm from './components/Products/addProductPage';
import AdminSignupComponent from './components/SignUp/adminSignupPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/homePage';
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


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignupComponent />} />
                    <Route path="/products" element={<Products/>} />
                    <Route path="/addproduct" element={<AddProductForm/>}/>
                    <Route path="/admin/signup" element={<AdminSignupComponent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
