import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../interceptor/api';
import { Product, Filters } from '../type';

const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Filters>({
        keyword: '',
        category: '',
        min_price: undefined,
        max_price: undefined,
    });
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await API.get<Product[]>('products/', { params: filters });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value === '' ? undefined : value,
        }));
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Product Dashboard</h1>

            {/* Filtres */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold mb-3 text-gray-700">Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        name="keyword"
                        placeholder="Search by name"
                        value={filters.keyword || ''}
                        onChange={handleFilterChange}
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        name="min_price"
                        placeholder="Min Price"
                        value={filters.min_price || ''}
                        onChange={handleFilterChange}
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        name="max_price"
                        placeholder="Max Price"
                        value={filters.max_price || ''}
                        onChange={handleFilterChange}
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                        name="category"
                        value={filters.category || ''}
                        onChange={handleFilterChange}
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Arts">Arts</option>
                        <option value="Food">Food</option>
                        <option value="Home">Home</option>
                        <option value="Kitchen">Kitchen</option>
                    </select>
                </div>
            </div>

            {/* Bouton d'ajout de produit */}
            <div className="mb-6 text-right">
                <button
                    onClick={() => navigate('/add')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Add Product
                </button>
            </div>

            {/* Liste des produits */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="text-blue-600 font-bold mb-2">Price: ${parseFloat(product.price as unknown as string).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Category: {product.category}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;