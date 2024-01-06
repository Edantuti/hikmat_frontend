import React from "react"
import axios, { AxiosError } from "axios"
import Cookies from "js-cookie"

const useFetch = <T,>(url: string, params?: any) => {
  const [data, setData] = React.useState<T>();
  const [errors, setErrors] = React.useState<AxiosError>();
  React.useEffect(() => {
    axios.get(url, {
      params: params,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }).then((response) => {
      setData(response.data.result)
    }).catch((error) => {
      if (import.meta.env.DEV)
        console.error(error)
      setErrors(error)
    })
  }, [])
  return { data, setData, errors }
}


export {
  useFetch
}
