import React, { useEffect, useState } from 'react';
import supplierService from '../services/supplierService';
import { Supplier, Product, OrderItem } from '../models/types';
import orderService from '../services/orderService';
import orderItemService from '../services/orderItemService'; // ייבוא השירות של OrderItem
import productService from '../services/productService';
import { Order } from '../models/types'; // ודא שה-Type 'Order' מיובא בצורה נכונה

const OrderPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [checkedProducts, setCheckedProducts] = useState<number[]>([]);
  const [productQuantities, setProductQuantities] = useState<{ [key: number]: number }>({});
  const [userId] = useState(1); // נניח שהמשתמש מחובר ויש לו ID

  useEffect(() => {
    const fetchSuppliers = async () => {
      const data = await supplierService.getAllSuppliers();
      setSuppliers(data);
    };
    fetchSuppliers();
  }, []);

  const handleSupplierClick = async (supplierId: number) => {
    setSelectedSupplierId(supplierId);
    const data = await productService.getProductsBySupplier(supplierId);
    setProducts(data);
    setCheckedProducts([]);
    setProductQuantities({});
  };

  const handleCheckboxChange = (productId: number) => {
    setCheckedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleQuantityChange = (productId: number, increment: boolean) => {
    setProductQuantities((prev) => {
      const newQty = increment
        ? (prev[productId] || 1) + 1
        : Math.max(1, (prev[productId] || 1) - 1);
      return { ...prev, [productId]: newQty };
    });
  };

  const handleOrderSubmit = async () => {
    if (!selectedSupplierId || checkedProducts.length === 0) {
      alert("Please select products to order.");
      return;
    }
  
    const orderItems: OrderItem[] = checkedProducts.map((productId) => {
      const product = products.find(p => p.id === productId);
      const quantity = productQuantities[productId] || 1;
      return {
        id: 0, // id ייווצר אוטומטית בצד השרת
        orderId: 0, // השרת יוסיף את ה-OrderId
        productId: productId,
        quantity: quantity,
        totalPrice: (product?.price || 0) * quantity,
      };
    });
  
    const newOrder: Order = {
      id: 0, // ערך ברירת מחדל, ייתכן ויתעדכן בשרת
      supplierID: selectedSupplierId,
      orderDate: new Date().toISOString(),
      status: 0, // סטטוס PENDING
      products: products.filter(p => checkedProducts.includes(p.id || 0)),
    };
    
  
    try {
      console.log(newOrder);

      const orderResponse = await orderService.createOrder(newOrder);
      if (!orderResponse ) {
        alert("Failed to create order");
        return;
      }
            const updatedOrderItems = orderItems.map(item => ({
        ...item,
        orderId: orderResponse.id, // ה-id יחזור מהשרת
      }));
      
  
      // יצירת פרטי הזמנה (OrderItems) על ידי קריאה לפונקציה עבור כל פריט בנפרד
      for (const orderItem of updatedOrderItems) {
        await orderItemService.createOrderItem(orderItem);
      }
  
      alert("Order submitted successfully!");
    } catch (error) {
      console.error('Error while creating order:', error);
    }
    
  };

  return (
    <div>
      <h2>Suppliers</h2>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id} onClick={() => handleSupplierClick(supplier.id)}>
            {supplier.companyName}
          </li>
        ))}
      </ul>

      <h3>{selectedSupplierId ? `Products for Supplier #${selectedSupplierId}` : 'Select a supplier to view products'}</h3>

      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <input
                type="checkbox"
                checked={checkedProducts.includes(product.id || 0)}
                onChange={() => handleCheckboxChange(product.id || 0)}
              />
              {product.name} - Price: {product.price}, MinQty: {product.minimumQty}

              <div>
                <button
                  onClick={() => handleQuantityChange(product.id || 0, false)}
                  disabled={(productQuantities[product.id || 0] || product.minimumQty) <= product.minimumQty}
                >
                  -
                </button>
                <span>{productQuantities[product.id || 0] || product.minimumQty}</span>
                <button onClick={() => handleQuantityChange(product.id || 0, true)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        selectedSupplierId && <p>No products found for this supplier.</p>
      )}

      <button onClick={handleOrderSubmit}>Submit Order</button>
    </div>
  );
};

export default OrderPage;
