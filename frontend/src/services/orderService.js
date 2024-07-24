import axios from "axios";

export const createOrder = async (order) => {
  try {
    const { data } = axios.post("/orders/create", order);
    return data;
  } catch (error) {}
};

export const getNewOrderForCurrentUser = async () => {
  const { data } = await axios.get("/orders/newOrderForCurrentUser");
  return data;
};

export const pay = async (paymentId) => {
  try {
    const { data } = await axios.put("/orders/pay", { paymentId });
    return data;
  } catch (error) {}
};

export const trackOrderbyId = async (orderId) => {
  try {
    const { data } = await axios.get(`/orders/track/${orderId}`);
    return data;
  } catch (error) {}
};

export const getAll = async (state) => {
  try {
    const { data } = await axios.get(`/orders/${state ?? ""}`);
    return data;
  } catch (error) {}
};

export const getAllStatus = async () => {
  try {
    const { data } = await axios.get(`/orders/allStatus`);
    return data;
  } catch (error) {}
};
