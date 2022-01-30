<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import * as Yup from 'yup';
import { useRouter } from 'vue-router';
import { Toast } from 'bootstrap/dist/js/bootstrap.esm.js'

import pay from '../payment'
import { price, itemTotal, totalCartAmount } from '../utils';
import { personNameValidation } from '../validators/personNameValidator';
import DefaultLayout from '@/layouts/Default.vue';
import BsToast from '../components/BsToast.vue';

const store = useStore()
const cartItems = computed(() => store.getters.cartItems)
const router = useRouter()
const errors = ref({})
const validated = ref(false)
const processing = ref(false)
const successToast = ref({})
const failureToast = ref({})

if (!cartItems.value?.length) {
    router.push('/')
}

const defaultRequiredMsg = "This field is required!"
const schemaShape = {
    first_name: Yup.string()
        .required(defaultRequiredMsg)
        .test(personNameValidation()),

    last_name: Yup.string()
        .required(defaultRequiredMsg)
        .test(personNameValidation()),

    phone: Yup.string()
        .required(defaultRequiredMsg)
        .matches(/^\+?[0-9]{10,15}$/, 'Phone number is not valid'),

    email: Yup.string()
        .required(defaultRequiredMsg)
        .email('Email is not valid'),

    address_line_1: Yup.string()
        .required(defaultRequiredMsg),

    city: Yup.string()
        .required(defaultRequiredMsg),

    state: Yup.string()
        .required(defaultRequiredMsg),

    country: Yup.string()
        .required(defaultRequiredMsg),
}

const schema = Yup.object().shape(schemaShape)

const data = ref({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    country: '',
})

const validateField = (field, value) => {
    schema.validateAt(field, data.value)
        .then(() => {
            errors.value[field] = "";
        })
        .catch(err => {
            errors.value[field] = err.message;
        });
}

const validateForm = () => {

    schema.validate(data.value, { abortEarly: false })
        .then(() => {
            errors.value = {};
            processing.value = true
            pay(data.value, totalCartAmount(), handleSuccessResponse, handleFailureResponse)
        })
        .catch(err => {
            if (!err?.inner?.length) return
 
            err.inner.forEach(error => {
                errors.value[error.path] = error.message;
            });

            console.log('errors', errors.value);
        })
}

const handleSuccessResponse = response => {
    successToast.value.show()
    store.dispatch('clearCart')
    router.push('/')
}

const handleFailureResponse = response => {
    successToast.value.show()
    store.dispatch('clearCart')
    router.push('/')
}

onMounted(() => {
    processing.value = false
    if (cartItems.value.length) {
        successToast.value = new Toast(document.querySelector('#successToast'))
        failureToast.value = new Toast(document.querySelector('#failureToast'))
    }
})

onUnmounted(() => {
    if (successToast.value?.dispose) {
        successToast.value.dispose()
        failureToast.value.dispose()
        processing.value = false
    }
})

</script>

<template>
    <default-layout>
        <div v-if="cartItems?.length">
            <div class="mt-3 mb-4 border-bottom pb-3 d-flex justify-content-start align-items-center">
                <router-link to="/cart" class="btn btn-outline-primary">
                    <i class="bi bi-chevron-left fs-5"></i>
                </router-link>
                <h5 class="flex-grow-1 text-center text-uppercase">Checkout</h5>
            </div>
            <form
                @submit.prevent="validateForm"
                :class="['row mb-4 pb-4', validated && 'was-validated']"
                novalidate
            >
                <div class="col-md-7">
                    <div class="row row-cols-1 row-cols-sm-2">
                        <div :class="['col mb-3']">
                            <label for="first_name" class="form-label">First name</label>
                            <input
                                @blur="validateField('first_name')"
                                @keyup="validateField('first_name')"
                                type="text"
                                :class="['form-control', !!errors.first_name && 'is-invalid']"
                                id="first_name"
                                maxlength="25"
                                placeholder="First Name"
                                v-model="data.first_name"
                            />
                            <div class="invalid-feedback" v-if="!!errors?.first_name">{{ errors?.first_name }}</div>
                        </div>
                        <div :class="['col mb-3']">
                            <label for="last_name" class="form-label">Last name</label>
                            <input
                                @blur="validateField('last_name')"
                                @keyup="validateField('last_name')"
                                type="text"
                                :class="['form-control', !!errors.last_name && 'is-invalid']"
                                id="last_name"
                                maxlength="25"
                                placeholder="Last Name"
                                v-model="data.last_name"
                            />
                            <div class="invalid-feedback" v-if="!!errors?.last_name">{{ errors?.last_name }}</div>
                        </div>
                        <div :class="['col mb-3', !!errors.phone && 'is-invalid']">
                            <label for="phone" class="form-label">Phone</label>
                            <input
                                @blur="validateField('phone')"
                                @keyup="validateField('phone')"
                                type="text"
                                :class="['form-control', !!errors.phone && 'is-invalid']"
                                id="phone"
                                maxlength="16"
                                placeholder="Phone"
                                v-model="data.phone"
                            />
                            <div class="invalid-feedback" v-if="!!errors?.phone">{{ errors?.phone }}</div>
                        </div>
                        <div :class="['col mb-3', !!errors.email && 'is-invalid']">
                            <label for="email" class="form-label text-capitalize">email</label>
                            <input
                                @blur="validateField('email')"
                                @keyup="validateField('email')"
                                type="email"
                                :class="['form-control', !!errors.email && 'is-invalid']"
                                id="email"
                                placeholder="name@example.com"
                                v-model="data.email"
                            />
                            <div class="invalid-feedback" v-if="!!errors?.email">{{ errors?.email }}</div>
                        </div>
                        <div :class="['col mb-3', !!errors.address_line_1 && 'is-invalid']">
                            <label
                                for="address_line_1"
                                class="form-label text-capitalize"
                            >Address line 1</label>
                            <input
                                @blur="validateField('address_line_1')"
                                @keyup="validateField('address_line_1')"
                                type="text"
                                :class="['form-control', !!errors.address_line_1 && 'is-invalid']"
                                id="address_line_1"
                                maxlength="75"
                                placeholder="house number, flat number street info"
                                v-model="data.address_line_1"
                            />
                            <div class="invalid-feedback" v-if="!!errors?.address_line_1">{{ errors?.address_line_1 }}</div>
                        </div>
                        <div :class="['col mb-3']">
                            <label
                                for="address_line_2"
                                class="form-label text-capitalize"
                            >Address line 2</label>
                            <input
                                type="text"
                                :class="['form-control']"
                                id="address_line_2"
                                maxlength="75"
                                placeholder="access description"
                                v-model="data.address_line_2"
                            />
                        </div>
                        <div :class="['col mb-3', !!errors.city && 'is-invalid']">
                            <label for="city" class="form-label text-capitalize">city</label>
                            <input
                                @blur="validateField('city')"
                                @keyup="validateField('city')"
                                type="text"
                                :class="['form-control', !!errors.city && 'is-invalid']"
                                id="city"
                                maxlength="15"
                                placeholder="city"
                                v-model="data.city"
                            />
                            <div class="invalid-feedback" v-if="!!errors?.city">{{ errors?.city }}</div>
                        </div>
                        <div :class="['col mb-3', !!errors.state && 'is-invalid']">
                            <label for="state" class="form-label text-capitalize">State</label>
                            <input
                                @blur="validateField('state')"
                                @keyup="validateField('state')"
                                type="text"
                                :class="['form-control', !!errors.state && 'is-invalid']"
                                id="state"
                                maxlength="15"
                                placeholder="state"
                                v-model="data.state"
                            />
                            <div class="invalid-feedback" v-if="!!errors?.state">{{ errors?.state }}</div>
                        </div>
                        <div :class="['col mb-3', !!errors.country && 'is-invalid']">
                            <label for="country" class="form-label text-capitalize">Country</label>
                            <input
                                @blur="validateField('country')"
                                @keyup="validateField('country')"
                                type="text"
                                :class="['form-control', !!errors.country && 'is-invalid']"
                                id="country"
                                maxlength="15"
                                placeholder="country"
                                v-model="data.country"
                            />
                            <div class="invalid-feedback" v-if="!!errors?.country">{{ errors?.country }}</div>
                        </div>
                    </div>
                </div>

                <div class="col-md-5 mb-4">
                    <div class="border rounded bg-light p-3">
                        <div class="h5 text-uppercase mt-3 mb-4 pb-3 border-bottom">your cart</div>

                        <div
                            v-for="{ item, quantity } in cartItems"
                            :key="item.id"
                            class="border-bottom pb-2 mb-3"
                        >
                            <div class="fs-5">{{ item.name }}</div>

                            <div class="d-flex justify-content-between align-item-center">
                                <div class="text-muted small">{{ quantity }}x{{ price(item.price) }}</div>
                                <div
                                    class="text-dark text-end"
                                >{{ itemTotal(item, quantity).toLocaleString() }}</div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-item-center">
                            <div>TOTAL</div>
                            <div class="text-dark text-end">{{ totalCartAmount(cartItems) }}</div>
                        </div>

                        <div class="my-3 text-center">
                            <button
                                :disabled="processing"
                                type="submit"
                                class="btn btn-primary w-100"
                            >
                                <div
                                    v-if="processing"
                                    class="spinner-border spinner-border-sm text-white me-2"
                                    role="status"
                                >
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <bs-toast id="failureToast">
                <div class="d-flex justify-content-center align-items-center">
                    <i class="bi bi-check-circle text-success"></i>
                    <span class="px-2">Payment successful</span>
                </div>
            </bs-toast>

            <bs-toast id="successToast">
                <div class="d-flex justify-content-center align-items-center">
                    <i class="bi bi-check-circle text-success"></i>
                    <span class="px-2">Payment successful</span>
                </div>
            </bs-toast>
        </div>
    </default-layout>
</template>