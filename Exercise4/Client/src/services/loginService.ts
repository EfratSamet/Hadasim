import apiClient from "../api/apiClient"; 
import { AxiosResponse } from 'axios';

interface AuthResponse {
  token: string;
  message?: string;
}

const loginService = async (mail: string, pass: string) => {
    try {
        const payload = { email: mail, password: pass };
        console.log('🔍 Sending login payload:', payload);
    
        const response: AxiosResponse<AuthResponse> = await apiClient.post('/Login', payload);
    
        if (response.data && response.data.message) {
            throw new Error(response.data.message);
        }

        // שליפת הטוקן
        const token = response.data.token;

        // קריאה לשרת כדי לקבל את ה-role מתוך הטוקן
        const roleResponse: AxiosResponse<string> = await apiClient.get(`/Login/${token}/getRole`);
        
        return { token, role: roleResponse.data }; // מחזירים גם את הטוקן וגם את ה-role
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export default loginService;
