import apiClient from '../api/apiClient';
import { AxiosResponse } from 'axios';
import { SupplierProduct, SupplierProductCreate } from '../models/types';

const supplierProductService = {
  getAllSupplierProducts: async (): Promise<SupplierProduct[]> => {
    const response: AxiosResponse<SupplierProduct[]> = await apiClient.get('/SupplierProduct');
    return response.data;
  },

  getSupplierProduct: async (id: number): Promise<SupplierProduct> => {
    const response: AxiosResponse<SupplierProduct> = await apiClient.get(`/SupplierProduct/${id}`);
    return response.data;
  },

  createSupplierProduct: async (supplier: SupplierProductCreate): Promise<SupplierProduct> => {
    const response: AxiosResponse<SupplierProduct> = await apiClient.post('/SupplierProduct', supplier);
    return response.data;
  },

};

export default supplierProductService;
