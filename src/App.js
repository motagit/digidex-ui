import React from 'react';
import Home from './components/Pages/Home/Home'
import Digimon from './components/Pages/Digimon/Digimon'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Form from './components/Form/Form';
import Auth from './components/Auth/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                // theme="dark"
            />

            <Router>
                <Navbar/>
                <Routes>
                    <Route path='' exact element={<Home />} />
                    <Route path='/login' exact element={<Auth />} />
                    <Route path='/digimon/:id' exact element={<Digimon />} />
                    <Route path='/insertDigimon/' exact element={<Form />} />
                    <Route path='/editDigimon/:id' exact element={<Form />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;