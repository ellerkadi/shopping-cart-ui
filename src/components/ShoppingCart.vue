<template>
  <div class="container my-5">
    <!-- Title Section -->
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-gradient">Shopping Cart</h1>
      <p class="text-muted fs-5">Seamlessly manage your products and see totals update in real time.</p>
    </div>

    <!-- Add Product Section -->
    <div class="card shadow-lg p-4 mb-5 border-0">
      <h3 class="mb-4 text-primary">Add Product</h3>
      <form @submit.prevent="addProduct" class="row g-3 align-items-end">
        <div class="col-md-4">
          <label for="productName" class="form-label">Product Name</label>
          <input
              type="text"
              id="productName"
              v-model="newProduct.name"
              placeholder="Enter product name"
              class="form-control rounded-pill"
              required
          />
        </div>
        <div class="col-md-3">
          <label for="productPrice" class="form-label">Price (€)</label>
          <input
              type="number"
              id="productPrice"
              v-model="newProduct.price"
              placeholder="Enter price"
              class="form-control rounded-pill"
              min="0"
              step="0.1"
              required
          />
        </div>
        <div class="col-md-3">
          <label for="productQuantity" class="form-label">Quantity</label>
          <input
              type="number"
              id="productQuantity"
              v-model="newProduct.quantity"
              placeholder="Enter quantity"
              class="form-control rounded-pill"
              min="1"
              required
          />
        </div>
        <div class="col-md-2">
          <button class="btn btn-gradient w-100 rounded-pill">Add Product</button>
        </div>
      </form>
    </div>

    <!-- Cart Items Section -->
    <div class="card shadow-lg p-4 mb-5 border-0">
      <h3 class="mb-4 text-primary">Cart Items</h3>
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
    </div>

    <!-- Totals Section -->
    <div class="card shadow-lg p-4 border-0">
      <h3 class="text-primary mb-4">Summary</h3>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5>Total:</h5>
        <h5 class="fw-bold">{{ cartTotal.toFixed(2) }} €</h5>
      </div>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5>Tax:</h5>
        <h5 class="fw-bold">{{ cartTax.toFixed(2) }} €</h5>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <h4>Total with Tax:</h4>
        <h4 class="fw-bold text-success">{{ cartTotalWTax.toFixed(2) }} €</h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    api: "http://localhost:8089/api/cart",
    cartTotal: 0,
    cartTax: 0,
    cartTotalWTax: 0,
    cartItems: [],
    newProduct: { name: "", price: "", quantity: "" },
  }),

  methods: {
    fetchCart() {
      axios
          .all([
            axios.get(`${this.api}/getCartItems`).then((res) => (this.cartItems = res.data)),
            axios.get(`${this.api}/calculateTaxTotal`).then((res) => (this.cartTotalWTax = res.data)),
            axios.get(`${this.api}/calculateTax`).then((res) => (this.cartTax = res.data)),
            axios.get(`${this.api}/calculateCartTotal`).then((res) => (this.cartTotal = res.data)),
          ]);
    },
    removeProduct(name) {
      axios.delete(`${this.api}/deleteProductByName/${name}`).then(this.fetchCart);
    },
    addProduct() {
      axios.post(`${this.api}/addProduct`, this.newProduct).then(this.fetchCart);
      this.newProduct = { name: "", quantity: "", price: "" };
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>

<style>
body {
  background: linear-gradient(135deg, #f3f4f6, #eef2f3);
  font-family: "Poppins", sans-serif;
}

.text-gradient {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-gradient {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  color: white;
  font-weight: bold;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-gradient:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.table-gradient {
  background: linear-gradient(90deg, #2575fc, #6a11cb);
}

.card {
  border-radius: 20px;
  border: none;
}

input,
button {
  transition: all 0.2s;
}

input:focus {
  outline: none;
  box-shadow: 0px 0px 5px rgba(39, 108, 245, 0.5);
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

h1,
h3 {
  font-weight: 700;
}
</style>