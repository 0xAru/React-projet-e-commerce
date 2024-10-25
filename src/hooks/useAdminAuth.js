import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAdminAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);
};

export default useAdminAuth;
