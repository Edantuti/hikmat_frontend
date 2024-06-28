import { useFetch } from '../../../hooks/fetch';

const ordersDataConvertingToMap = (): { x: string; y: number }[] => {
  const yearMapNumberOfOrders = new Map<string, number>();

  const { data } = useFetch<any[]>(
    `${import.meta.env.VITE_BACKEND}/api/orders/all`
  );
  if (data)
    for (let order of data) {
      yearMapNumberOfOrders.set(
        new Date(order.createdAt).toDateString(),
        (yearMapNumberOfOrders.get(new Date(order.createdAt).toDateString()) ||
          0) + 1
      );
    }
  const dateMapArray = [];
  for (let item of yearMapNumberOfOrders) {
    dateMapArray.push({ x: item[0], y: item[1] });
  }
  dateMapArray.sort((a: any, b: any) => {
    if (new Date(a.x).getTime() > new Date(b.x).getTime()) return 1;
    else return -1;
  });
  return dateMapArray;
};

const productsDataConvertingtoMap = (): { x: string; y: number }[] => {
  const productsMapNumberOfOrders = new Map<string, number>();
  const { data } = useFetch<any[]>(
    `${import.meta.env.VITE_BACKEND}/api/orders/all`
  );
  if (data)
    for (let order of data)
      productsMapNumberOfOrders.set(
        order.Products[0].name,
        (productsMapNumberOfOrders.get(order.Products[0].name) || 0) + 1
      );
  const productsMapArray = [];
  for (let item of productsMapNumberOfOrders) {
    productsMapArray.push({ x: item[0], y: item[1] });
  }
  return productsMapArray;
};

export { productsDataConvertingtoMap, ordersDataConvertingToMap };
