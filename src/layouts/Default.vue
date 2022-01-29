<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const cartSize = computed(() => store.state.cart.size);
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">JStore</router-link>

            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                        <i class="bi-cart"></i>
                        {{ cartSize }}

                    </a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container">
        <slot></slot>
    </div>
</template>