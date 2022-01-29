const localStoragePlugin = store => {

    const currentCart = JSON.parse(localStorage.getItem('cart')) || []
    store.commit('setCartItems', { items: currentCart })

    store.subscribe((mutation, state) => {
        const { cart } = state
        const cartItems = [...cart.values()]
        localStorage.setItem('cart', JSON.stringify(cartItems))
    })
}

export default localStoragePlugin