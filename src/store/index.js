import { createStore } from 'vuex'
import localStoragePlugin from './plugins/local-storage'

const ACTIONS = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
}

const getters = {
    cartItems(state) {
        return [...state.cart.values()]
    },

    cartSize(state) {
        return state.cart.size
    },

    cartHasItem: (state) => (item) => {
        return state.cart.has(item.id)
    },

    getCartItem: (state) => (id) => {
        return state.cart.get(id)
    }
}

const mutations = {
    addCartItem(state, data) {
        const item = data.item
        const quantity = data?.quantity ?? 1
        state.cart.set(item.id, {item, quantity })
    },

    removeCartItem(state, { item }) {
        state.cart.delete(item.id)
    },

    setCartItems(state, { items }) {
        state.cart = new Map(items.map(data => [data.item.id, data]))
    },
}

const actions = {
    [ACTIONS.ADD_TO_CART]: ({ commit }, { item, quantity }) => {
        commit('addCartItem', { item, quantity })
    },

    [ACTIONS.REMOVE_FROM_CART]: ({ commit }, item) => {
        commit('removeCartItem', item)
    },
}

const store = createStore({
    state() {
        return {
            cart: new Map(),
        }
    },
    getters,
    mutations,
    actions,

    plugins: [localStoragePlugin],
})

export default store

export { ACTIONS }