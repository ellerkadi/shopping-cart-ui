<template>
  <div class="container my-5">
    <!-- Title Section -->
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-gradient">Shopping Cart</h1>
    </div>

    <!-- Add Product Section -->
    <div class="card shadow-lg p-4 mb-5 border-0">
      <h3 class="mb-4 text-primary">Add Product</h3>
      <AddProductForm @addProduct="addProduct"/>
    </div>

    <!-- Cart Items Section -->
    <div class="card shadow-lg p-4 mb-5 border-0">
      <h3 class="mb-4 text-primary">Cart Items</h3>
      <CartTable :cartItems="cartItems" @removeProduct="removeProduct"/>
    </div>

    <!-- Totals Section -->
    <div class="card shadow-lg p-4 border-0">
      <h3 class="text-primary mb-4">Summary</h3>
      <CartSummary :cartTotal="cartTotal" :cartTax="cartTax" :cartTotalWTax="cartTotalWTax"/>
    </div>
  </div>
</template>

<script>
import AddProductForm from "@/components/cart/AddProductForm.vue";
import CartTable from "@/components/cart/CartTable.vue";
import CartSummary from "@/components/cart/CartSummary.vue";
import {getCartItems, getCartTotal, getCartTax, getCartTotalWTax, addProduct, removeProduct} from "@/api/cart.js";

export default {
  components: {
    AddProductForm,
    CartTable,
    CartSummary,
  },
  data() {
    return {
      cartTotal: 0,
      cartTax: 0,
      cartTotalWTax: 0,
      cartItems: [],
    };
  },
  methods: {
    fetchCart() {
      Promise.all([
        getCartItems().then((res) => (this.cartItems = res.data)),
        getCartTotal().then((res) => (this.cartTotal = res.data)),
        getCartTax().then((res) => (this.cartTax = res.data)),
        getCartTotalWTax().then((res) => (this.cartTotalWTax = res.data)),
      ]);
    },
    addProduct(product) {
      addProduct(product).then(this.fetchCart);
    },
    removeProduct(name) {
      removeProduct(name).then(this.fetchCart);
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>