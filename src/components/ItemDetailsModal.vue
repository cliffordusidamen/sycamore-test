<script setup>

import { getCategoryName, price } from '../utils';
import { useStore } from 'vuex';

import Modal from '@/components/Modal.vue';
import { computed, onUpdated } from 'vue';

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

onUpdated(() => console.log('Updated', cartItem.value))

</script>

<template>
    <modal :show="show" size="lg" id="detailsModal" @hide="$emit('hide')">
        <div class="row justify-content-center">
            <div class="col-md-4 text-md-end">
                <img :src="ware.thumbnail" class="img-fluid" :alt="ware.name" />
            </div>
            <div class="col-md-6">
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
    </modal>
</template>