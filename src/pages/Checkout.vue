<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

import { price, itemTotal, totalCartAmount } from '../utils';
import DefaultLayout from '@/layouts/Default.vue';


const store = useStore()
const cartItems = computed(() => store.getters.cartItems)

</script>

<template>
    <default-layout>
        <div class="mt-3 mb-4 border-bottom pb-3 d-flex justify-content-start align-items-center">
            <router-link to="/cart" class="btn btn-outline-primary">
                <i class="bi bi-chevron-left fs-5"></i>
            </router-link>
            <h5 class="flex-grow-1 text-center text-uppercase">Checkout</h5>
        </div>
        <form class="row mb-4 pb-4">
            <div class="col-md-7">
                <div class="row row-cols-1 row-cols-sm-2">
                    <div class="col mb-3">
                        <label for="first_name" class="form-label">First name</label>
                        <input type="text" class="form-control" id="first_name" maxlength="25" placeholder="First Name" />
                    </div>
                    <div class="col mb-3">
                        <label for="last_name" class="form-label">Last name</label>
                        <input type="text" class="form-control" id="last_name" maxlength="25" placeholder="Last Name" />
                    </div>
                    <div class="col mb-3">
                        <label for="phone" class="form-label">Phone</label>
                        <input type="text" class="form-control" id="phone" maxlength="16" placeholder="Phone" />
                    </div>
                    <div class="col mb-3">
                        <label for="email" class="form-label text-capitalize">email</label>
                        <input type="text" class="form-control" id="email" maxlength="16" placeholder="name@example.com" />
                    </div>
                    <div class="col mb-3">
                        <label for="address_line_1" class="form-label text-capitalize">Address line 1</label>
                        <input type="text" class="form-control" id="address_line_1" maxlength="75" placeholder="house number, flat number street info" />
                    </div>
                    <div class="col mb-3">
                        <label for="address_line_2" class="form-label text-capitalize">Address line 2</label>
                        <input type="text" class="form-control" id="address_line_2" maxlength="75" placeholder="access description" />
                    </div>
                    <div class="col mb-3">
                        <label for="city" class="form-label text-capitalize">city</label>
                        <input type="text" class="form-control" id="city" maxlength="15" placeholder="city" />
                    </div>
                    <div class="col mb-3">
                        <label for="state" class="form-label text-capitalize">State</label>
                        <input type="text" class="form-control" id="state" maxlength="15" placeholder="state" />
                    </div>
                    <div class="col mb-3">
                        <label for="country" class="form-label text-capitalize">Country</label>
                        <input type="text" class="form-control" id="country" maxlength="15" placeholder="country" />
                    </div>
                </div>
            </div>

            <div class="col-md-5 mb-4">
                <div class="border rounded bg-light p-3">
                    <div class="h5 text-uppercase mt-3 mb-4 pb-3 border-bottom">
                        your cart
                    </div>

                    <div
                        v-for="{item, quantity} in cartItems"
                        :key="item.id"
                        class="border-bottom pb-2 mb-3"
                    >
                        <div class="fs-5">
                            {{item.name}}
                        </div>

                        <div class="d-flex justify-content-between align-item-center">
                            <div class="text-muted small">
                                {{quantity}}x{{price(item.price)}}
                            </div>
                            <div class="text-dark text-end">
                                {{itemTotal(item, quantity).toLocaleString()}}
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-item-center">
                        <div>TOTAL</div>
                        <div class="text-dark text-end">
                            {{totalCartAmount(cartItems)}}
                        </div>
                    </div>

                    <div class="my-3 text-center">
                        <button type="submit" class="btn btn-primary w-100">
                            PLACE ORDER
                        </button>
                    </div>

                </div>
            </div>
        </form>
    </default-layout>
</template>