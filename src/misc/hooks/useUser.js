import { useContext } from 'react';
import { UserContext } from 'misc/providers/UserProvider';

/**
@return {
  email,
  name
}
**/

const useUser = () => useContext(UserContext);

export default useUser;
