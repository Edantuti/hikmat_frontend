import { createSlice } from '@reduxjs/toolkit';
// import { ProductType } from "../components/ProductList/Product";

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: Array<any>(),
  },
  reducers: {
    setProducts: (state, action: { payload: any }) => {
      state.products = Array.from(action.payload, (x) => x);
    },
    clearProduct: (state) => {
      state.products = Array<any>();
    },
    setCartQuantity: (state, action: { payload: any }) => {
      state.products.map((product: any, id: any) => {
        if (action.payload.id === id) {
          return { ...product, cart_quantity: action.payload.quantity };
        } else {
          return { ...product };
        }
      });
    },
  },
});

export const { setProducts, clearProduct } = CartSlice.actions;

export default CartSlice.reducer;
