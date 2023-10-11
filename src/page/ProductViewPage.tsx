import { FC } from "react";
import ProductCarousel from "../components/ProductView/ProductCarousel";
import ProductInfo from "../components/ProductView/ProductInfo";
import ProductDescription from "../components/ProductView/ProductDescription";
import { ProductType } from "../components/ProductList/Product";

import { useLoaderData } from "react-router-dom";
import ProductReview from "../components/ProductView/ProductReview";
const ProductViewPage: FC = (): JSX.Element => {
  const productData = useLoaderData() as ProductType;

  return (
    <>
      <section className="md:flex">
        <ProductCarousel image_urls={productData.photos} />
        <ProductInfo
          id={productData.id}
          name={productData.name}
          price={productData.price}
          rating={productData.rating}
          discount={productData.discount}
          brand={productData.brand}
          category={productData.category}
          size={productData.size}
          similar={productData.ChildProduct}
          Deals={productData.Deals}
        />
      </section>
      <ProductDescription
        description={productData.description}
        benefits={productData.benefits}
        details={productData.details}
      />
      <ProductReview productid={productData.id} reviews={productData.Reviews} />
    </>
  );
};
export default ProductViewPage;
