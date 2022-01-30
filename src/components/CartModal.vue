<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import { price, itemTotal, totalCartAmount, getCategoryName } from '../utils';
import Modal from '@/components/Modal.vue';
import ModalCloseButton from './ModalCloseButton.vue';
import { ACTIONS } from '../store';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['showCartModal', 'hideCartModal'])
const store = useStore()
const cartItems = computed(() => store.getters.cartItems)
const updatingCart = ref(false)
const updateCartItems = () => {
    updatingCart.value = true
    cartItems.value.forEach(({ item, quantity }) => {
        const itemQtyElem = document.querySelector(`.item-quantity[data-item-id="${item.id}"]`)
        if (!itemQtyElem) return

        if (Number(itemQtyElem.value) != quantity) {
            store.dispatch(ACTIONS.ADD_TO_CART, { item, quantity: itemQtyElem.value })
        }
    })
    updatingCart.value = false
}

</script>

<template>
    <modal :show="props.show" size="lg" id="cartModal" :handleHide="() => $emit('hideCartModal')">
        <modal-close-button :handleClick="() => $emit('hideCartModal')" />
        <div v-if="!cartItems?.length" class="alert text-center lead">
            <i class="bi bi-exclamation-circle-fill me-2"></i>
            No item in your cart!
            <router-link to="/" class="btn btn-primary text-uppercase">start shopping</router-link>
        </div>

        <div v-else>
            <form @submit.prevent="updateCartItems">
                <div class="table-responsive mt-4">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th width="40%">Item</th>
                                <th class="text-end">Price</th>
                                <th class="text-end">Qty</th>
                                <th class="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="{ item, quantity } in cartItems"
                                :key="item.id"
                            >
                                <td>
                                    {{ item.name }}
                                    <span
                                        class="text-muted d-block small text-uppercase"
                                    >{{ getCategoryName(item.category_id) }}</span>
                                </td>
                                <td class="text-end">{{ price(item.price) }}</td>
                                <td class="text-end">
                                    <input
                                        :id="`number-input-${item.id}`"
                                        class="form-control item-quantity"
                                        type="number"
                                        min="1"
                                        max="20"
                                        :value="quantity"
                                        :data-item-id="item.id"
                                        required
                                    />
                                </td>
                                <td class="text-end">{{ itemTotal(item, quantity).toLocaleString() }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3">TOTAL</td>
                                <td class="text-end">{{ totalCartAmount(cartItems) }}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div>
                    <div class="px-3 py-2 text-end">
                        <button
                            type="submit"
                            class="btn btn-sm btn-primary text-uppercase me-3"
                            :disabled="updatingCart"
                        >
                            <i v-if="!updatingCart" class="bi bi-arrow-repeat me-1"></i>
                            Update cart
                        </button>

                        <router-link
                            v-show="!updatingCart"
                            to="/cart/checkout"
                            class="btn btn-sm btn-outline-primary text-uppercase"
                        >
                            checkout
                            <i class="bi bi-arrow-right ms-2"></i>
                        </router-link>
                    </div>
                </div>
            </form>
        </div>
    </modal>
</template>