import apiClient from '../api/apiClient';
import { AxiosResponse } from 'axios';
import { OrderItem } from '../models/types'; // ודא שהמבנה של OrderItemDto נמצא כאן

const orderItemService = {
  getAllOrderItems: async (): Promise<OrderItem[]> => {
    const response: AxiosResponse<OrderItem[]> = await apiClient.get('/OrderItem');
    return response.data;
  },

  getOrderItem: async (id: number): Promise<OrderItem> => {
    const response: AxiosResponse<OrderItem> = await apiClient.get(`/OrderItem/${id}`);
    return response.data;
  },

  createOrderItem: async (orderItem: OrderItem): Promise<OrderItem> => {
    const response: AxiosResponse<OrderItem> = await apiClient.post('/OrderItem', orderItem);
    return response.data;
  },
};

export default orderItemService;
