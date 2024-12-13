<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>Total:</h5>
      <h5 class="fw-bold">{{ cartTotal.toFixed(2) }} €</h5>
    </div>
    <div class="d-flex justify-contenteen align-items-center mb-3">
      <h5>Tax:</h5>
      <h5 class="fw-bold">{{ cartTax.toFixed(2) }} €</h5>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <h4>Total with Tax:</h4>
      <h4 class="fw-bold text-success">{{ cartTotalWTax.toFixed(2) }} €</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartTotal: {
      type: Number,
      default: 0, // Default to 0 if not provided
    },
    cartTax: {
      type: Number,
      default: 0,
    },
    cartTotalWTax: {
      type: Number,
      default: 0,
    },
  },
};
</script>