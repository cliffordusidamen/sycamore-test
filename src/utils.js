import { categories } from "@/products";

const price = (price) => {
    return (Number(price) / 100).toLocaleString();
};

const getCategoryName = (id) => {
    return categories.get(id)
}

const itemTotal = (item, quantity) => {
    const total = Number(item.price) * Number(quantity)
    return total / 100
}

const totalCartAmount = (cartItems) => {
    let totalAmount = 0

    cartItems.forEach(({ item, quantity }) => {
        totalAmount += itemTotal(item, quantity)
    })

    return totalAmount
}

export {
    price,
    getCategoryName,
    itemTotal,
    totalCartAmount,
};