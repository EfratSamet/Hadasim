import { useState } from "react"
import { SupplierCreate, Product, SupplierProduct } from "../models/types";
import supplierService from "../services/supplierService";  // ודא שה-import של השירות נכון

export const Register = () => {

    const [formData, setFormData] = useState<SupplierCreate>({
        companyName: "",
        representativeName: "",
        email: "",
        phoneNumber: "",  // הוסף את השדה phoneNumber
        password: "",     // הוסף את השדה password
        role: "supplier",
        products: []
    });
    

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);  // מצב למוצרים
    const [supplierId, setSupplierId] = useState<number>(-1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.companyName.trim()) {
            newErrors.companyName = "יש להזין שם חברה";
        }

        if (!formData.representativeName.trim()) {
            newErrors.representativeName = "יש להזין שם נציג";
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "אימייל לא תקין";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await supplierService.createSupplier(formData);
            const supplierId = response.id;
            setSuccessMessage("נרשמת בהצלחה!");
            setSupplierId(supplierId);
            console.log(supplierId);

            // עדכון המוצרים הקשורים לספק
            const supplierProducts = await supplierService.getProductsBySupplierId(supplierId);
            setProducts(supplierProducts.map((sp: SupplierProduct) => ({
                id: sp.productID,
                name: sp.productID.toString(),  // בנה את שם המוצר (אם יש צורך ב-ID או שדה אחר)
                price: 0,  // אם המחיר לא קיים ב-SupplierProduct, יש לעדכן בהתאם
                minimumQty: 0  // אם כמות מינימום לא קיימת, עדכן בהתאם
            })));

        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setSuccessMessage("");
                setErrors({ email: error.response.data.message });
            } else {
                alert("שגיאה כללית. אנא נסה שוב מאוחר יותר.");
            }
        }
    };

    const handleAddProduct = (product: Product) => {
        setProducts(prev => [...prev, product]);
    };

    return (
        <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "1rem", border: "1px solid black" }}>
            <h2>טופס הרשמה</h2>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label>שם חברה:</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
                    {errors.companyName && <p style={{ color: "red" }}>{errors.companyName}</p>}
                </div>

                <div>
                    <label>שם נציג:</label>
                    <input type="text" name="representativeName" value={formData.representativeName} onChange={handleChange} />
                    {errors.representativeName && <p style={{ color: "red" }}>{errors.representativeName}</p>}
                </div>

                <div>
                    <label>אימייל:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>

                <button type="submit" style={{ marginTop: "1rem" }}>הירשם</button>
            </form>

            <h3>מוצרים שנוספו:</h3>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product.name} - {product.price} ש"ח - מינימום {product.minimumQty} יחידות</li>
                ))}
            </ul>
        </div>
    );
};
export default Register;
