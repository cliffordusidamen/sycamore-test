<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { price, itemTotal, totalCartAmount } from '../utils';
import Modal from '@/components/Modal.vue';
import ModalCloseButton from './ModalCloseButton.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['showCartModal', 'hideCartModal'])
const store = useStore()
const cartItems = computed(() => store.getters.cartItems)

</script>

<template>
    <modal
        :show="props.show"
        size="lg"
        id="cartModal"
        :handleHide="() => $emit('hideCartModal')"
    >
        <modal-close-button :handleClick="() => $emit('hideCartModal')" />
        <div v-if="!cartItems?.length" class="alert text-center lead">
            <i class="bi bi-exclamation-circle-fill me-2"></i>
            No item in your cart!
            <router-link to="/" class="btn btn-primary text-uppercase">
                start shopping
            </router-link>
        </div>

        <div v-else>
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
                            v-for="{item, quantity} in cartItems"
                            :key="item.id"
                            class="text-muted"
                        >
                            <td>{{item.name}}</td>
                            <td class="text-end">{{price(item.price)}}</td>
                            <td class="text-end">{{Number(quantity)}}</td>
                            <td class="text-end">{{itemTotal(item, quantity).toLocaleString()}}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3">
                                TOTAL
                            </td>
                            <td class="text-end">
                                {{totalCartAmount(cartItems)}}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <template #footer v-if="cartItems?.length">
            <div class="px-3 py-2 text-end">

                <router-link to="/cart/checkout" class="btn btn-sm btn-primary text-uppercase">
                    checkout
                </router-link>
            </div>
        </template>
    </modal>
</template>