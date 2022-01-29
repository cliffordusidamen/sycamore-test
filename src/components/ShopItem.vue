<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { price, getCategoryName } from '../utils';
import { ACTIONS } from '@/store';

const store = useStore()

const cartHasItem = (item) => store.getters.cartHasItem(item);
const addToCart = (ware) => store.dispatch(ACTIONS.ADD_TO_CART, {
    item: ware,
    quantity: 1,
});

const removeFromCart = (item) => store.dispatch(ACTIONS.REMOVE_FROM_CART, {item});

const props = defineProps({
    ware: {
        type: Object,
        required: true,
    },
})

const router = useRouter()

const showToDetails = (e) => {
    e.preventDefault()
    router.push(`/item/${props.ware.slug}`)
}
</script>

<template>
    <div class="card h-100">
        <img
            :src="ware.thumbnail"
            class="card-img-top cursor-pointer"
            :alt="ware.name"
            @click="showToDetails"
        />
        <div class="card-body">
            <p class="card-text cursor-pointer" @click="showToDetails">
                <strong>{{ ware.name }}</strong>
                <span
                    class="text-muted d-block small text-uppercase"
                >{{ getCategoryName(ware.category_id) }}</span>
            </p>
            <h5 class="card-title d-flex justify-content-between align-items-center">
                <a
                    href="#"
                    class="text-decoration-none"
                    @click="showToDetails"
                >{{ price(ware.price) }}</a>

                <button
                    v-if="!cartHasItem(ware)"
                    class="btn btn-sm btn-outline-primary ml-2 text-uppercase"
                    @click="() => addToCart(ware)"
                >
                    <i class="bi bi-cart-plus"></i>
                    Add
                </button>
                <button
                    v-else
                    class="btn btn-sm btn-outline-danger ml-2 text-uppercase"
                    @click="() => removeFromCart(ware)"
                >
                    <i class="bi bi-cart-plus"></i>
                    Remove
                </button>
            </h5>
        </div>
    </div>
</template>