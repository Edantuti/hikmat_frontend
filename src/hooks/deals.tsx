import axios from 'axios';
import Cookies from 'js-cookie';
// NOTE: not a hook, written here for convenience purpose
const deleteDealsByID = (id: string) => {
  return axios.delete(`${import.meta.env.VITE_BACKEND}/api/admin/deals`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
    params: {
      id: id,
    },
  });
};

export { deleteDealsByID };
