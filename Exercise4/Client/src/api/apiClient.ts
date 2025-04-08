import axios from 'axios';

// קביעת כתובת הבסיס של השרת
const API_BASE_URL = 'https://localhost:7193/api';

// יצירת מופע axios עם הגדרות בסיסיות
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// מיירטים (interceptors) לטיפול בבקשות ותגובות
apiClient.interceptors.request.use(
  (config) => {
    // ניתן להוסיף לוגיקה לפני שליחת הבקשה, למשל הוספת טוקן אימות
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // טיפול בשגיאות תגובה
    if (error.response) {
      // השרת הגיב עם קוד סטטוס שאינו בטווח 2xx
      console.error('API Error:', error.response.data);
      
      // טיפול ב-401 Unauthorized
      if (error.response.status === 401) {
        // ניתן להוסיף לוגיקה לניתוב למסך התחברות
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // הבקשה נשלחה אך לא התקבלה תגובה
      console.error('No response received:', error.request);
    } else {
      // משהו השתבש בהגדרת הבקשה
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
