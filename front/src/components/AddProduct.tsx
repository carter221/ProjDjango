import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../interceptor/api';

const AddProduct: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        brand: '',
        category: '',
        stock: '',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post('products/create/', formData);
            navigate('/');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-xl font-bold mb-4">Add Product</h1>
            <div className="grid gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                />
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Arts">Arts</option>
                    <option value="Food">Food</option>
                    <option value="Home">Home</option>
                    <option value="Kitchen">Kitchen</option>
                </select>
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Add Product
                </button>
            </div>
        </form>
    );
};

export default AddProduct;
