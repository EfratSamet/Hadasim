import apiClient from '../api/apiClient';
import { AxiosResponse } from 'axios';
import { Order } from '../models/types';

const orderService = {

    getAllOrders: async (): Promise<Order[]> => {
    const response: AxiosResponse<Order[]> = await apiClient.get('/Order');
    return response.data;
  },

  getOrder: async (id: number): Promise<Order> => {
    const response: AxiosResponse<Order> = await apiClient.get(`/Order/${id}`);
    return response.data;
  },

  createOrder: async (order: Order): Promise<Order> => {
    const response = await apiClient.post('/Order', order);
    return response.data;
  },

  getPendingOrdersByUser: async (userId: number): Promise<Order[]> => {
    const response: AxiosResponse<Order[]> = await apiClient.get(`/Order/${userId}/pending`);
    return response.data;
  },

  completeOrder: async (orderId: number): Promise<Order> => {
    const response: AxiosResponse<Order> = await apiClient.get(`/Order/${orderId}/completed`);
    return response.data;
  },
  updateOrderToInProgress: async (orderId: number): Promise<Order> => {
    const response: AxiosResponse<Order> = await apiClient.put(`/Order/${orderId}/inProgress`);
    return response.data;
  },  
  getOrdersBySupplier: async (supplierId: number): Promise<Order[]> => {
    const response: AxiosResponse<Order[]> = await apiClient.get(`/Order/${supplierId}/bySupplier`);
    return response.data;
  },
};

export default orderService;
