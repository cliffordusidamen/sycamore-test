<script setup>
const props = defineProps({
    handleClick: {
        type: Function,
        default: (() =>({})),
    },
})
</script>

<template>
    <button
        class="btn btn-danger btn-circle position-absolute top-0 end-0 translate-middle"
        data-dismiss="modal"
        @click="() => handleClick()"
    >
        <i class="bi bi-x-lg"></i>
    </button>
</template>