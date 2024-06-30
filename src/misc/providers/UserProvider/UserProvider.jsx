import React, { createContext } from 'react';
import { useSelector } from 'react-redux';

export const UserContext = createContext({});

const UserProvider = ({
  children,
}) => {
  const user = useSelector(({ user }) => user);
  return (
    <UserContext.Provider
      value={{
        email: user.email,
        name: user.name,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
