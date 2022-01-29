
<script setup>

defineProps({
    modelValue: {
        default: null,
    },
    options: {
        type: Object,
        required: true,
    },
    placeholder: {
        type: String,
        default: 'Select one',
    },
    classes: {
        type: Object,
        default: () => ({}),
    },
})

defineEmits(['update:modelValue'])
</script>

<template>
    <select
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        :classes="classes"
    >
        <option value="">{{ placeholder }}</option>
        <option v-for="key in Object.keys(options)" :value="key" :key="key">{{ options[key] }}</option>
    </select>
</template>
