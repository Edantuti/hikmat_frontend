export type ProductType = {
  id: string;
  name: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  quantity?: number;
  discount: number;
  offer: string[];
  photos?: (string | File)[];
  description: string;
  benefits: string[];
  details: string[];
  size: string;
  ChildProduct: any;
  Reviews?: any;
  Deals?: any;
};
