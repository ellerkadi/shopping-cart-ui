import axios from 'axios';

const api = "http://localhost:8089/api/cart";

export const getCartItems = () => axios.get(`${api}/getCartItems`);
export const getCartTotal = () => axios.get(`${api}/calculateCartTotal`);
export const getCartTax = () => axios.get(`${api}/calculateTax`);
export const getCartTotalWTax = () => axios.get(`${api}/calculateTaxTotal`);
export const addProduct = (product) => axios.post(`${api}/addProduct`, product);
export const removeProduct = (name) => axios.delete(`${api}/deleteProductByName/${name}`);