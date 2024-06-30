import React, {
  createContext,
} from 'react';
import {useSelector} from "react-redux";

export const AuthoritiesContext = createContext([]);

const AuthoritiesProvider = ({
  children,
}) => {
  const {
    authority,
  } = useSelector(({ user }) => user);
  return (
    <AuthoritiesContext.Provider value={authority}>
      {children}
    </AuthoritiesContext.Provider>
  );
};

export default AuthoritiesProvider;
