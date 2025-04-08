import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>ברוך הבא למערכת!</h1>
      
      <div>
        <button
          onClick={() => navigate('/order-page')}
        >
          הזמנת סחורה מספק
        </button>

        <button
          onClick={() => navigate('/user-orders')}
        >
          מאגר כל ההזמנות
        </button>
      </div>
    </div>
  );
};

export default UserPage;
