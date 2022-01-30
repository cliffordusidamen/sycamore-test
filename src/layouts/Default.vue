<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import CartModal from '@/components/CartModal.vue';
import { ACTIONS } from '@/store';

const store = useStore()
const cartSize = computed(() => store.state.cart.size);
const cartVisible = computed(() => store.state.cartVisible)

const showCartModal = () => {
    const { name } = useRoute();
    if (name == 'cart.view') {
        store.dispatch(ACTIONS.SHOW_CART)
    } else {
        store.dispatch(ACTIONS.HIDE_CART)
    }
}
const showCartLink = computed(() => {
    const { name } = useRoute();
    return name != 'cart.checkout'
})

const router = useRouter()

onMounted(() => showCartModal())
onUpdated(() => showCartModal())

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light position-sticky sticky-top">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">JStore</router-link>

            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link
                        v-if="showCartLink"
                        class="nav-link fs-5"
                        aria-current="page"
                        to="/cart"
                    >
                        <i class="bi-cart"></i>
                        <span class="badge bg-dark small">
                            {{ cartSize }}
                        </span>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container">
        <slot></slot>
    </div>

    <cart-modal :show="cartVisible" @hide-cart-modal="() => router.push('/')" />
</template>