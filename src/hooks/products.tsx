import axios, { AxiosError } from 'axios'
import React from 'react'
import { ProductType } from '../components/ProductList/Product';

const useFetchProducts = ({ category, brand, offset, limit }: { category?: string, brand?: string, offset?: string, limit?: number }) => {
  const [products, setProducts] = React.useState<{ count: number, rows: ProductType[] }>({ count: 0, rows: [] });
  const [errors, setErrors] = React.useState<AxiosError>();
  React.useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND}/api/products`, {
      params: {
        category: category,
        brand: brand,
        offset: offset,
        limit: limit != 0 ? limit : 10000
      }
    }).then((response) => {
      setProducts(response.data.result)
    }).catch((error) => {
      setErrors(error)
    })
  }, [])
  return { products, setProducts, errors }
}

const useFetchProductByID = (id: string) => {
  const [product, setProduct] = React.useState<ProductType>();
  const [errors, setErrors] = React.useState<AxiosError>();
  React.useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND}/api/products/?id=${id}`)
      .then((response) => {
        setProduct(response.data.result.rows[0])
      }).catch((error) => {
        if (import.meta.env.DEV) {
          console.error(error)
        }
        setErrors(error)
      })
  }, [])
  return { product, errors }
}

export { useFetchProducts, useFetchProductByID }
