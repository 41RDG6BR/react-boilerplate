import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    signed,
    loading,
    handleLogin,
    handleLogout,
  } = useAuth();

  return (
    <Context.Provider
      value={{
        handleLogin,
        handleLogout,
        loading,
        signed
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
