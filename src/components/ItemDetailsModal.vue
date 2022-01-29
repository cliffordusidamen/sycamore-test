<script setup>

import { computed, onUpdated, ref } from 'vue';
import { getCategoryName, price } from '../utils';
import { useStore } from 'vuex';

import Modal from '@/components/Modal.vue';
import { ACTIONS } from '@/store';


const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },

    ware: {
        type: Object,
        required: true,
    },

})

const store = useStore()
const cartItem = computed(() => store.getters.getCartItem(props.ware.id))
const newQty = ref(cartItem?.quantity ?? 1)
const removeFromCart = () => store.dispatch(ACTIONS.REMOVE_FROM_CART, {item: props.ware});
const addToCart = () => {
    store.dispatch(ACTIONS.ADD_TO_CART, {
        item: props.ware,
        quantity: newQty.value,
    })
};

defineEmits(['hideDetailsModal'])


onUpdated(() => newQty.value = cartItem.quantity ?? 1)

</script>

<template>
    <modal :show="show" size="lg" id="detailsModal" :handle-hide="() => $emit('hideDetailsModal')">
        <button
            class="btn btn-danger btn-circle position-absolute top-0 end-0 translate-middle"
            data-dismiss="modal"
            @click="() => $emit('hideDetailsModal')"
        >
            <i class="bi bi-x-lg"></i>
        </button>
        <div class="row mt-3 justify-content-center">
            <div class="col-sm-4 text-md-end">
                <img :src="ware.thumbnail" class="img-fluid" :alt="ware.name" />
            </div>
            <div class="col-sm-6">
                <h3 class="border-bottom mb-2 pb-2">
                    {{ ware.name }}
                    <span
                        class="text-muted d-block fs-6 text-uppercase"
                    >{{ getCategoryName(ware.category_id) }}</span>
                </h3>
                <p>{{ ware.description }}</p>
                <p>
                    <strong>{{ price(ware.price) }}</strong>
                </p>
            </div>
        </div>

        <template #footer>
            <div class="row">
                <div v-if="!cartItem?.quantity" class="">
                    <div class="row">
                        <div class="col-auto fs-4">
                            <i class="bi bi-cart-plus"></i>
                        </div>
                        <div class="col-auto">
                            <input id="number-input" class="form-control" type="number" min="1" max="20" v-model="newQty" />
                        </div>
                        <div class="col-auto">
                            <button
                                class="btn btn-primary text-uppercase"
                                type="button"
                                @click="addToCart"
                            >
                                {{ cartItem?.quantity ? 'Update' : 'Add' }}
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else class="text-end d-flex justify-content-between align-items-center">
                    <div class="span me-3 fs-4 text-muted">
                        <i class="bi bi-cart-plus me-1 text-dark"></i>
                        {{ cartItem.quantity }}
                        {{ cartItem.quantity == 1 ? 'item' : 'items' }}
                    </div>
                    <button
                        class="btn btn-danger text-uppercase"
                        type="button"
                        @click="removeFromCart"
                    >
                        <i class="bi bi-x-lg"></i>
                        REMOVE
                    </button>
                </div>
            </div>

        </template>
    </modal>
</template>