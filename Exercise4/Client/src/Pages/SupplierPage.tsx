import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService';
import { Order } from '../models/types';

interface SupplierOrdersPageProps {
  supplierId: number;
}

const SupplierOrdersPage: React.FC<SupplierOrdersPageProps> = ({ supplierId }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await orderService.getOrdersBySupplier(supplierId);
      setOrders(data);
    };

    fetchOrders();
  }, [supplierId]);

  const handleInProgress = async (orderId: number) => {
    try {
      await orderService.updateOrderToInProgress(orderId);
      // רענון הרשימה
      const updatedOrders = await orderService.getOrdersBySupplier(supplierId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Failed to update order to In Progress:', error);
    }
  };

  return (
    <div>
      <h2>Orders for Supplier #{supplierId}</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <strong>Order #{order.id}</strong> - Date: {new Date(order.orderDate).toLocaleDateString()} - Status: {order.status}
              {order.status === 1 && (
                <button onClick={() => handleInProgress(order.id)}>
                  Set to In Progress
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SupplierOrdersPage;
