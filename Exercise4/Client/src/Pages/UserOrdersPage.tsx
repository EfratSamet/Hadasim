import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';
import { Order, Status, Product } from '../models/types'; // שים לב כאן שאתה מייבא את Status

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [showPending, setShowPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await orderService.getAllOrders();
      setOrders(allOrders);
    };
    fetchOrders();
  }, []);

  const handleShowPending = async () => {
    const pending = await orderService.getPendingOrdersByUser(1); // נניח שמספר המשתמש הוא 1
    setPendingOrders(pending);
    setShowPending(true);
  };

  const handleCompleteOrder = async (orderId: number) => {
    const completedOrder = await orderService.completeOrder(orderId); // קורא לפונקציה להשלים את ההזמנה
    // עדכון הרשימה לאחר קבלת הזמנה
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: Status.COMPLETED, completedDate: new Date().toISOString() } : order // עדכון הסטטוס ל-"הושלמה"
    );
    setOrders(updatedOrders);
  };

  // פונקציה להמיר את הסטטוס למילים
  const statusToText = (status: Status) => {
    console.log(status); // בדוק מה הדפסה של הסטטוס

    switch (status) {
      case Status.PENDING:
        return 'המתנה';
      case Status.IN_PROGRESS:
        return 'בתהליך';
      case Status.COMPLETED:
        return 'הושלמה';
      default:
        return 'לא זוהה';
    }
  };

  return (
    <div>
      <h1>הזמנות</h1>

      <div>
        <button onClick={handleShowPending}>הצג הזמנות בהמתנה</button>
      </div>

      <div>
        <h2>{showPending ? 'הזמנות PENDING' : 'כל ההזמנות'}</h2>
        <ul>
          {(showPending ? pendingOrders : orders).map((order) => (
            <li key={order.id}>
              <div>
                <strong>הזמנה {order.id}</strong>
                <p><strong>סטטוס:</strong> {statusToText(order.status)}</p> {/* הצגת הסטטוס כטקסט */}
                <p><strong>תאריך הזמנה:</strong> {order.orderDate}</p>
                <p><strong>ספק:</strong> {order.supplierID}</p> {/* אם יש לך שם של הספק, תוכל להוסיף אותו */}
              </div>

              <div>
                <h4>מוצרים בהזמנה:</h4>
                <ul>
                  {Array.isArray(order.products) && order.products.length > 0 ? (
                    order.products.map((product: Product) => (
                      <li key={product.id}>
                        <span>{product.name} - {product.price} ₪</span>
                      </li>
                    ))
                  ) : (
                    <li>אין מוצרים בהזמנה</li>
                  )}
                </ul>
              </div>

              {order.status === Status.PENDING && ( // בדיקה אם הסטטוס הוא Pending
                <button onClick={() => handleCompleteOrder(order.id)}>
                  אשר קבלת הזמנה
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrdersPage;
