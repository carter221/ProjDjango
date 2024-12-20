import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../interceptor/api';

const UpdateProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        brand: '',
        category: '',
        stock: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await API.get(`products/${id}/`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.put(`products/${id}/update/`, formData);
            navigate('/');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await API.delete(`products/${id}/delete/`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-xl font-bold mb-4">Update Product</h1>
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
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Update Product
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Delete Product
                    </button>
                </div>
            </div>
        </form>
    );
};

export default UpdateProduct;