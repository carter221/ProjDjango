export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    ratings: number;
    stock: number;
    createdAt: string;
}

export interface Filters {
    keyword?: string;
    category?: string;
    min_price?: number;
    max_price?: number;
}
