import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";

import App from "./App.tsx";
import HomePage from "./page/HomePage.tsx";
import ProductListPage from "./page/ProductListPage.tsx";
import ProductViewPage from "./page/ProductViewPage.tsx";
import AuthPage from "./page/AuthPage.tsx";
import CheckoutPage from "./page/CheckoutPage.tsx";
import CartPage from "./page/CartPage.tsx";
import store from "./store.ts";
import AdminPage from "./page/AdminPage.tsx";
import UserPage from "./page/UserPage.tsx";
import OrderDetails from "./components/User/OrderDetails.tsx";
import ProductListing from "./components/Admin/Product/ProductListing.tsx";
import ProductManipulator from "./components/Admin/Product/ProductManipulator.tsx";
import OrderListing from "./components/Admin/Order/OrderListing.tsx";
import AdminDashboard from "./components/Admin/AdminDashboard.tsx";
import BrandAdding from "./components/Admin/Brand/BrandAdding.tsx";
import BrandListing from "./components/Admin/Brand/BrandListing.tsx";
import CategoryListing from "./components/Admin/Categories/CategoryListing.tsx";
import CategoryAdding from "./components/Admin/Categories/CategoryAdding.tsx";
import ProductAdding from "./components/Admin/Product/ProductAdding.tsx";
import ProfileDetails from "./components/User/ProfileDetails.tsx";
import ProfileUpdate from "./components/User/ProfileUpdate.tsx";
import VerifyPage from "./page/VerifyPage.tsx";
import ForgotPassword from "./components/Auth/ForgotPassword.tsx";
import DealsListing from "./components/Admin/Deals/DealsListing.tsx";
import DealsAdding from "./components/Admin/Deals/DealsAdding.tsx";
import DealsManipulation from "./components/Admin/Deals/DealsManipulation.tsx";
import.meta.env

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route
          path="/product/"
          loader={async ({ request }) => {
            const url = new URL(request.url);
            return (
              await axios.get(`${import.meta.env.VITE_BACKEND}/api/products`, {
                params: {
                  category: url.searchParams.get("category"),
                  brand: url.searchParams.get("brand"),
                  offset: url.searchParams.get("offset"),
                },
              })
            ).data.result;
          }}
          element={<ProductListPage />}
        />
        <Route
          path="/product/:productId"
          loader={async ({ params }) => {
            const data = await axios.get(
              `${import.meta.env.VITE_BACKEND}/api/products/?id=${params.productId}`,
            );
            return data.data.result.rows[0];
          }}
          element={<ProductViewPage />}
        />
        <Route path="/auth/login" element={<AuthPage type="login" />} />
        <Route path="/auth/signup" element={<AuthPage type="signup" />} />
        <Route path="/auth/forgot" element={<ForgotPassword />} />
        <Route path="/auth/verify" element={<VerifyPage />} />
        <Route
          path="/auth/generatepassword"
          element={<AuthPage type="forgot" />}
        />
        <Route
          path="/checkout"
          loader={
            async () => {
              try {
                const { data } = await axios.get(
                  `${import.meta.env.VITE_BACKEND}/api/cart/`,
                  {
                    headers: {
                      Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                  },
                );
                return data;
              } catch (error: any) {
                if (error.reponse.status === 401) {
                  return error
                }
              }
            }}
          element={<CheckoutPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/users" element={<UserPage />}>
          <Route index element={<ProfileDetails />} />
          <Route path="/users/orders" element={<OrderDetails />} />
          <Route path="/users/edit" element={<ProfileUpdate />} />
        </Route>
      </Route>
      <Route path="/admin" element={<AdminPage />}>
        <Route index element={<AdminDashboard />} />
        <Route path="/admin/deals" element={<DealsListing />} />
        <Route
          path={`/admin/deals/edit/:dealid`}
          loader={({ params }) => {
            if (params.productid) return params.productid;
            return "";
          }}
          element={<DealsManipulation />}
        />
        <Route
          path="/admin/product"
          loader={async () => {
            const data = (await axios.get(`${import.meta.env.VITE_BACKEND}/api/products`, {
              params: { limit: 100000 }
            }))
              .data.result;
            data.rows.sort((a: any, b: any) => {
              if (
                new Date(a.updatedAt).getTime() <
                new Date(b.updatedAt).getTime()
              )
                return 1;
              else return -1;
            });
            return data;
          }}
          element={<ProductListing />}
        />
        <Route
          path="/admin/orders"
          loader={async () => {
            try {
              const data = (
                await axios.get(`${import.meta.env.VITE_BACKEND}/api/orders/all`, {
                  headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                  },
                })
              ).data.result;
              data.sort((a: any, b: any) => {
                if (
                  new Date(a.createdAt).getTime() <
                  new Date(b.createdAt).getTime()
                )
                  return 1;
                else return -1;
              });

              return data;
            } catch (error: any) {
              return error
            }
          }}
          element={<OrderListing />}
        />
        <Route
          path={`/admin/product/edit/:productid`}
          loader={({ params }) => {
            if (params.productid) return params.productid;
            return "";
          }}
          element={<ProductManipulator />}
        />
        <Route path={`/admin/deals/create`} element={<DealsAdding />} />

        <Route path={`/admin/product/add`} element={<ProductAdding />} />
        <Route path={`/admin/brand/create`} element={<BrandAdding />} />
        <Route path={`/admin/brand`} element={<BrandListing />} />
        <Route path={`/admin/category`} element={<CategoryListing />} />
        <Route path={`/admin/category/create`} element={<CategoryAdding />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
