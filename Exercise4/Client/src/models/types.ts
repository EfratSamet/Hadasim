export interface Supplier {
    id: number;
    companyName: string;
    phoneNumber: string;
    representativeName: string;
    email: string;
    password: string;
    products: SupplierProduct[];
    role: string;
}
export interface SupplierProduct {
    id: number;
    supplierID: number;
    productID: number;
}
export interface Product {
    id?: number;
    name: string;
    price: number;
    minimumQty: number;
}
export interface User
{
    Id:number
    Name:string
    Password:string
    Email:string
};
// ../models/types.ts

export enum Status {
     
    PENDING = 0,
    COMPLETED = 1,
  IN_PROGRESS = 2,
}

export type Order = {
  id: number;
  supplierID: number;
  orderDate: string;
  status: Status;
  products: Product[];
};
export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    totalPrice: number;
  }
  
export type SupplierCreate = Omit<Supplier, 'id'>;
//export type OrderCreate = Omit<Order, 'id'>;
//export type OrderCreate = Omit<Order, 'id' | 'completedDate'>;

export type ProductCreate = Omit<Product, 'id'>;
export type SupplierProductCreate = Omit<SupplierProduct, 'id'>;
