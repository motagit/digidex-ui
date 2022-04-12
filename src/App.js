import React from 'react';
import Home from './components/Pages/Home/Home'
import Digimon from './components/Pages/Digimon/Digimon'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Sidebar from './components/Navbar/Navbar';
  
const App = () => {
    

    return (
        <Router>
            <Sidebar/>
            <Routes>
                <Route path='' exact element={<Home />} />
                <Route path='/digimon/:id' exact element={<Digimon />} />
            </Routes>
        </Router>
        
    );
}

export default App;