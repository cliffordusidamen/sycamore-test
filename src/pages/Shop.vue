<script setup>
import { onUpdated, onMounted, ref, computed } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';

import { wares } from '@/products';

import DefaultLayout from '@/layouts/Default.vue';
import ItemDetailsModal from '@/components/ItemDetailsModal.vue';
import ShopItem from '@/components/ShopItem.vue';

const displayProduct = ref({})
const showDetailsModal = computed(() => !!displayProduct.value.id)
const router = useRouter()

const showProductForSlug = () => {
    const { params } = router.currentRoute.value;
    console.log('CHanged', params)

    if (!!params?.slug) {
        const product = wares.find(({ slug }) => slug === params.slug);
        if (product) {
            document.title = `${product.name} - Shop`;
            displayProduct.value = product;
        }
    } else {
        displayProduct.value = {};
    }
};

const goBackToHome = () => {
    console.log('Back home triggered')
    router.push('/');
};


onMounted(() => showProductForSlug())
onUpdated(() => showProductForSlug())



</script>


<template>
    <default-layout>
        <div v-if="!wares.length" class="alert alert-info mb-4">
            <p>No products found.</p>
        </div>
        <div v-else class="mt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            <div v-for="ware in wares" :key="ware.id" class="col">
                <shop-item :ware="ware" />
            </div>

            <item-details-modal
                :show="showDetailsModal"
                :ware="displayProduct"
                @hide-details-modal="goBackToHome"
            />
        </div>

        <div class="h-100 mb-4"></div>
    </default-layout>
</template>
