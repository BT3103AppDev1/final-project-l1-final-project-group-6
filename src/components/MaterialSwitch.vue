<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  labelClass: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(['update:checked']);
const updateValue = (event) => {
  emits('update:modelValue', event.target.checked);
};
</script>

<template>
  <div class="form-check form-switch">
    <input
      :id="id"
      class="form-check-input"
      type="checkbox"
      :name="id"
      :checked="checked"
      @change="updateValue"
    />
    <label class="form-check-label d-block" :class="labelClass" :for="id"
      ><slot
    /></label>
    <slot name="description" v-if="$slots.description" />
  </div>
</template>
