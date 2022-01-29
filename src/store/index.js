import { createStore } from 'vuex'
import localStoragePlugin from './plugins/local-storage'

const ACTIONS = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    SHOW_CART: 'SHOW_CART',
    HIDE_CART: 'HIDE_CART',
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

    showCart(state) {
        state.cartVisible = true
    },

    hideCart(state) {
        state.cartVisible = false
    },
}

const actions = {
    [ACTIONS.ADD_TO_CART]: ({ commit }, { item, quantity }) => {
        commit('addCartItem', { item, quantity })
    },

    [ACTIONS.REMOVE_FROM_CART]: ({ commit }, item) => {
        commit('removeCartItem', item)
    },

    [ACTIONS.SHOW_CART]: ({ commit }) => {
        commit('showCart')
    },

    [ACTIONS.HIDE_CART]: ({ commit }) => {
        commit('hideCart')
    },
}

const store = createStore({
    state() {
        return {
            cart: new Map(),
            cartVisible: false,
        }
    },
    getters,
    mutations,
    actions,

    plugins: [localStoragePlugin],
})

export default store

export { ACTIONS }