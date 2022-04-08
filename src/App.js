import React from 'react';
import Home from './components/Pages/Home/Home'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

const App = () => {
    

    return (
        <Router>
            <Routes>
                <Route path='' exact element={<Home />} />
            </Routes>
        </Router>
        
    );
}

export default App;