import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../interceptor/api';
const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer les détails du produit
        const fetchProductDetails = async () => {
            try {
                const response = await API.get(`products/${id}/`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [id]);

    if (!product) {
        return <p className="text-center text-gray-600">Loading product details...</p>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-blue-600 font-bold mb-2">Price: ${product.price}</p>
            <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
            <button
                onClick={() => navigate('/')}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
                Back to Products
            </button>
        </div>
    );
};

export default ProductDetails;
