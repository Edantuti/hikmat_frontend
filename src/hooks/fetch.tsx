import React from 'react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const useFetch = <T,>(url: string, params?: any) => {
  const [data, setData] = React.useState<T>();
  const [errors, setErrors] = React.useState<AxiosError>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    axios
      .get(url, {
        params: params,
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setData(response.data.result);
      })
      .catch((error) => {
        if (import.meta.env.DEV) console.error(error);
        setErrors(error);
      });
  }, []);
  return { data, isLoading, setData, errors };
};

export { useFetch };
