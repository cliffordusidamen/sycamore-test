<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div
        :id="id"
        class="toast align-items-center"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
    >
        <div class="d-flex">
            <div class="toast-body">
                <slot></slot>
            </div>
            <button
                type="button"
                class="btn-close me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
            ></button>
        </div>
    </div>
</template>