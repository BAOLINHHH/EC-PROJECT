import axios from "./axios";
const orderApi = {
  createOrders(data) {
    const url = "orders";
    return axios.post(url, data);
  },
  getOrderById(orderId) {
    const url = `orders/${orderId}`;
    return axios.get(url);
  },
  updateOrderToPaid(orderId) {
    const url = `orders/${orderId}/pay`;
    return axios.put(url);
  },
  createPaymentUrlVNPay(data) {
    const url = "orders/create_payment_url";
    return axios.post(url, data);
  },
};
export default orderApi;
