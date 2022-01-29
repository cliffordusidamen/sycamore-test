<script setup>

import { computed, onMounted, onUpdated, ref } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.esm.js';


const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },

    backdrop: {
        type: String,
        default: null,
    },

    id: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        default: '',
    },

    size: {
        type: String,
        default: 'md',
    },

    handleHide: {
        type: Function,
        default: (() => ({})),
    }


})
const sizeClasses = {
    md: '',
    sm: 'modal-sm',
    lg: 'modal-lg',
    xl: 'modal-xl',
}
const sizeClass = computed(() => sizeClasses[props.size] ?? '')

const modal = ref(null)

onMounted(() => {
    const modalElement = document.getElementById(props.id)
    modal.value = new Modal(modalElement, {
        show: props.show,
        backdrop: props.backdrop === null ? true : props.backdrop,
    })

    modalElement.addEventListener('hidden.bs.modal', () => {
        props.handleHide()
    })
})
onUpdated(() => {
    if(props.show) {
        return modal.value.show()
    }

    modal.value.hide()
})
</script>


<template>
    <teleport to="body">
        <div
            class="modal fade"
            :id="id"
            :data-bs-backdrop="backdrop === null ? '' : 'static'"
            data-bs-keyboard="false"
            tabindex="-1"
            :aria-labelledby="`${id}Label`"
            aria-hidden="true"
        >
            <div :class="`modal-dialog ${sizeClass}`">
                <div class="modal-content">
                    <div v-if="!!title" class="modal-header">
                        <h5 class="modal-title" :id="`${id}Label`">Modal title</h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer d-block text-left">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>