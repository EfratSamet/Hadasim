import apiClient from '../api/apiClient';
import { AxiosResponse } from 'axios';
import { Supplier, SupplierProduct, SupplierCreate } from '../models/types';


const supplierService = {
  getAllSuppliers: async (): Promise<Supplier[]> => {
    const response: AxiosResponse<Supplier[]> = await apiClient.get('/Supplier');
    return response.data;
  },

  getSupplier: async (id: number): Promise<Supplier> => {
    const response: AxiosResponse<Supplier> = await apiClient.get(`/Supplier/${id}`);
    return response.data;
  },

  createSupplier: async (supplier: SupplierCreate): Promise<Supplier> => {
    const response: AxiosResponse<Supplier> = await apiClient.post('/Supplier', supplier);
    return response.data;
  },

  // Get products by supplier id
  getProductsBySupplierId: async (supplierId: number): Promise<SupplierProduct[]> => {
    const response: AxiosResponse<SupplierProduct[]> = await apiClient.get(`/Supplier/products/${supplierId}`);
    return response.data;
  },

};

export default supplierService;
