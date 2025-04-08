import React, { useState } from "react";
import { Product } from "../models/types"; // ייבוא של מודל המוצר מהקובץ types.ts
import productService from "../services/productService"; // ייבוא של שירות המוצרים

interface AddProductPageProps {
  onProductAdded: (newProduct: Product) => void; // קבלה של מוצר אחד בלבד
}

const AddProductPage: React.FC<AddProductPageProps> = ({ onProductAdded }) => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [minimumQty, setMinimumQty] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddProduct = async () => {
    if (!productName.trim() || productPrice <= 0 || minimumQty <= 0) {
      return;
    }
  
    const newProduct: Product = {
        name: productName,
        price: productPrice,
        minimumQty: minimumQty
        };
  
    try {
      setLoading(true);
      // קריאת API להוספת המוצר
      const createdProduct = await productService.createProduct(newProduct);
      console.log('Product created successfully:', createdProduct);
  
      // אחרי שמוצר נוסף, אנו מעדכנים את הסטייט של הקומפוננטה ההורה
      onProductAdded(createdProduct);
  
      // איפוס השדות לאחר ההוספה
      setProductName("");
      setProductPrice(0);
      setMinimumQty(1);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="form-container">
      <h1>הוספת מוצר חדש</h1>

      <form className="neon-form" onSubmit={(e) => e.preventDefault()}>
        <label>שם המוצר:</label>
        <input
          type="text"
          placeholder="שם המוצר"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>מחיר המוצר:</label>
        <input
          type="number"
          placeholder="מחיר המוצר"
          value={productPrice}
          onChange={(e) => setProductPrice(parseFloat(e.target.value))}
        />

        <label>מינימום כמות:</label>
        <input
          type="number"
          placeholder="מינימום כמות"
          value={minimumQty}
          onChange={(e) => setMinimumQty(parseInt(e.target.value))}
        />

        <button onClick={handleAddProduct} disabled={loading}>
          {loading ? "שומר..." : "הוסף מוצר"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
