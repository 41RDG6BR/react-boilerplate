import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api';

const Context = createContext();

function AuthProvider({ children }) {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setSigned(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin() {
    const { data: { token } } = await api.post('/authenticate');
    localStorage.setItem('token', JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setSigned(true);
  }

  function handleLogout() {
    setSigned(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
  }

  return (
    <Context.Provider
      value={{
        signed,
        handleLogin,
        loading,
        handleLogout
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
