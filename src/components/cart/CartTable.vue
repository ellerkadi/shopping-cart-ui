<template>
  <table class="table table-hover align-middle">
    <thead class="table-gradient text-white">
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Price (€)</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in cartItems" :key="item.name">
      <td>{{ item.name }}</td>
      <td>{{ item.quantity }}</td>
      <td>{{ item.price.toFixed(2) }}</td>
      <td>
        <button
            @click="removeProduct(item.name)"
            class="btn btn-danger btn-sm rounded-pill shadow-sm"
        >
          Remove
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    cartItems: Array,
  },
  methods: {
    removeProduct(name) {
      this.$emit('removeProduct', name);
    },
  },
};
</script>