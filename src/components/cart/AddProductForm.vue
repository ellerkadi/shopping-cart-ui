<template>
  <div class="card shadow-lg p-4 mb-5 border-0 rounded-4">
    <form @submit.prevent="addProduct">
      <div class="row g-3">
        <!-- Product Name -->
        <div class="col-md-6">
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

        <!-- Price -->
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

        <!-- Quantity -->
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

        <!-- Add Product Button (Only once) -->
        <div class="col-12 text-center">
          <button type="submit" class="btn btn-gradient w-50 rounded-pill mt-3">Add Product</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProduct: { name: "", price: "", quantity: "" },
    };
  },
  methods: {
    addProduct() {
      if (this.newProduct.name && this.newProduct.price && this.newProduct.quantity) {
        this.$emit('addProduct', this.newProduct);
        this.newProduct = { name: "", price: "", quantity: "" }; // Reset form
      }
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-weight: bold;
}

input.form-control {
  transition: box-shadow 0.2s;
}

input.form-control:focus {
  outline: none;
  box-shadow: 0px 0px 5px rgba(39, 108, 245, 0.5);
}

.btn-gradient {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  color: white;
  font-weight: bold;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn-gradient:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}

.mt-3 {
  margin-top: 20px;
}

@media (max-width: 576px) {
  .col-md-6, .col-md-3 {
    margin-bottom: 15px;
  }
  .btn-gradient {
    width: 100%;
  }
}
</style>