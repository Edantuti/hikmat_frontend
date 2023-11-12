export type ProductType = {
  id: string;
  name: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  quantity?: number;
  discount: number;
  offer: Array<string>;
  photos: Array<string>;
  description: string;
  benefits: Array<string>;
  details: Array<string>;
  size: string;
  ChildProduct: any;
  Reviews: any;
  Deals: any;
};
