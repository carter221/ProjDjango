import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import ProductDetails from './components/ProductDetails';

const App: React.FC = () => {
    return (
        <Router>
            <div className="bg-gray-100 min-h-screen p-6">
                <Routes>
                    <Route path="/" element={<ProductsList />} />
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/update/:id" element={<UpdateProduct />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
