import apiClient from '../api/apiClient';
import { AxiosResponse } from 'axios';
import { Product ,ProductCreate} from '../models/types';

const supplierService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response: AxiosResponse<Product[]> = await apiClient.get('/Product');
    return response.data;
  },

  getProduct: async (id: number): Promise<Product> => {
    const response: AxiosResponse<Product> = await apiClient.get(`/Product/${id}`);
    return response.data;
  },

  createProduct: async (product: ProductCreate): Promise<Product> => {
    const response: AxiosResponse<Product> = await apiClient.post('/Product', product);
    return response.data;
  },
getProductsBySupplier: async (id: number): Promise<Product[]> => {
  const response = await apiClient.get(`/Product/${id}/GetProductsBySupplier`);
  return response.data;
},


};

export default supplierService;
