// App.js
import React from 'react';
import Navbar from './components/NavBar/navbar';
import LoginPage from './components/Login/loginPage';
import SignupComponent from './components/SignUp/signupPage';
import AdminSignupComponent from './components/SignUp/adminSignupPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/homePage';

function Login() {
    return <><LoginPage/></>
}

function Signup() {
    return <SignupComponent/>
}

function Home() {
    return <>HomePage</>
}

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignupComponent />} />
                    <Route path="/admin/signup" element={<AdminSignupComponent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
