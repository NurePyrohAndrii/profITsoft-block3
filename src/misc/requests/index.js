import axios from 'axios';
import storage, { keys } from '../storage';

axios.interceptors.request.use((params) => {
  const token = storage.getItem(keys.TOKEN);
  if (token) {
    params.headers.setAuthorization(`Bearer ${token}`);
  }
  return params;
});

const addAxiosInterceptors = ({
  onSignOut,
}) => {
  axios.interceptors.response.use(
    (response) => response.data,
    // TODO when auth service is ready to handle token invalidation adjust this code, adjust error handling there to not block other api errors like it does now
    // (error) => {
    //   if (error.response.data
    //     .some(beError => beError?.code === 'INVALID_TOKEN')
    //   ) {
    //     onSignOut();
    //   }
    //   throw error.response.data;
    // }
  );
};

export {
  addAxiosInterceptors,
};

export default axios;
