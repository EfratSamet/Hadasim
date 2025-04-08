import React, { useState } from 'react';
import supplierService from '../services/supplierService';  // נתיב לשירות שלך
import { SupplierCreate, SupplierProduct } from '../models/types'; // סוגי הנתונים שלך

const AddSupplierPage = () => {
    // const [supplier, setSupplier] = useState<SupplierCreate>({
    //     companyName: '',
    //     phoneNumber: '',
    //     representativeName: '',
    //     email: '',
    //     password: '',
    //     role: 'supplier',
    // });

    // const [products, setProducts] = useState<SupplierProduct[]>([
    //     {
    //         id: 0,
    //         name: '',
    //         price: 0,
    //         minimumQty: 0,
    //     },
    // ]);

//     const handleSupplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setSupplier({
//             ...supplier,
//             [name]: value,
//         });
//     };

//     const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         const newProducts = [...products];
//         newProducts[index] = { ...newProducts[index], [name]: value };
//         setProducts(newProducts);
//     };

//     const handleAddProduct = () => {
//         setProducts([
//             ...products,
//             {
//                 id: 0,
//                 name: '',
//                 price: 0,
//                 minimumQty: 0,
//             },
//         ]);
//     };

//     const handleSubmit = async () => {
//         try {
//             // יוצרים את הספק באמצעות supplierService
//             const createdSupplier = await supplierService.createSupplier(supplier);
//             console.log('Supplier created successfully:', createdSupplier);

//             // אם הספק נוצר בהצלחה, נוסיף את המוצרים אליו
//             const supplierId = createdSupplier.id;

//             // נשלח את המוצרים לשרת
//             for (let product of products) {
//                 await supplierService.getProductsBySupplierId(supplierId); // אם יש צורך להוסיף מוצרים לספק
//                 // כאן אפשר להוסיף לשרת את כל המוצרים בהתאם ל-API
//             }

//             console.log('Products added successfully');
//         } catch (error) {
//             console.error('Error adding supplier and products:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>הוספת ספק</h1>
//             <form>
//                 <div>
//                     <label>שם החברה:</label>
//                     <input
//                         type="text"
//                         name="companyName"
//                         value={supplier.companyName}
//                         onChange={handleSupplierChange}
//                     />
//                 </div>
//                 <div>
//                     <label>מספר טלפון:</label>
//                     <input
//                         type="text"
//                         name="phoneNumber"
//                         value={supplier.phoneNumber}
//                         onChange={handleSupplierChange}
//                     />
//                 </div>
//                 <div>
//                     <label>שם נציג:</label>
//                     <input
//                         type="text"
//                         name="representativeName"
//                         value={supplier.representativeName}
//                         onChange={handleSupplierChange}
//                     />
//                 </div>
//                 <div>
//                     <label>אימייל:</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={supplier.email}
//                         onChange={handleSupplierChange}
//                     />
//                 </div>
//                 <div>
//                     <label>סיסמה:</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={supplier.password}
//                         onChange={handleSupplierChange}
//                     />
//                 </div>

//                 <h2>הוסף מוצרים</h2>
//                 {products.map((product, index) => (
//                     <div key={index}>
//                         <div>
//                             <label>שם המוצר:</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={product.name}
//                                 onChange={(e) => handleProductChange(index, e)}
//                             />
//                         </div>
//                         <div>
//                             <label>מחיר:</label>
//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={product.price}
//                                 onChange={(e) => handleProductChange(index, e)}
//                             />
//                         </div>
//                         <div>
//                             <label>כמות מינימלית:</label>
//                             <input
//                                 type="number"
//                                 name="minimumQty"
//                                 value={product.minimumQty}
//                                 onChange={(e) => handleProductChange(index, e)}
//                             />
//                         </div>
//                     </div>
//                 ))}
//                 <button type="button" onClick={handleAddProduct}>
//                     הוסף מוצר נוסף
//                 </button>

//                 <button type="button" onClick={handleSubmit}>
//                     שלח
//                 </button>
//             </form>
//         </div>
//     );
 };

export default AddSupplierPage;
