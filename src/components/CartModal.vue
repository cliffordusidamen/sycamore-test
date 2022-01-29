<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

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
            <h4>List items in cart here with checkout button</h4>
        </div>
    </modal>
</template>