import { useState, useEffect } from 'react';

import axios from '../../axios';

export default function useAuth() {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setSigned(true);
    }

    setLoading(false);
  }, []);
  console.log(loading, 'loading...');
  console.log(signed, 'autenticado');

  async function handleLogin() {
    const { data: { token } } = await axios.post('/authenticate');
    localStorage.setItem('token', JSON.stringify(token));
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    setSigned(true);
  }

  function handleLogout() {
    setSigned(false);
    localStorage.removeItem('token');
    axios.defaults.headers.Authorization = undefined;
  }
  return {
    signed,
    loading,
    handleLogin,
    handleLogout
  };
}
