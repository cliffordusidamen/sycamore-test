<script setup>
import DefaultLayout from '@/layouts/Default.vue';


</script>

<template>
    <default-layout>

        <div class="border bg-light rounded p-4 mt-4 mb-4 d-flex align-items-center">
            <i class="bi bi-robot display-1"></i>
            <div class="flex-grow-1 ps-3">
                <h3>
                    Pss...Are you lost?
                    <div class="fs-5 text-muted">
                        Let me guide you home.
                    </div>
                </h3>
                <router-link to="/" class="btn btn-primary">
                    BACK TO HOME PAGE
                </router-link>
            </div>
        </div>
    </default-layout>
</template>