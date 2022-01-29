import { categories } from "@/products";

const price = (price) => {
    return (Number(price) / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};

const getCategoryName = (id) => {
    return categories.get(id)
}

export { price, getCategoryName };