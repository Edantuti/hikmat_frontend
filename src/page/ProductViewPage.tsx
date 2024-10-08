import { FC } from 'react';
import ProductCarousel from '../components/ProductView/ProductCarousel';
import ProductInfo from '../components/ProductView/ProductInfo';
import ProductDescription from '../components/ProductView/ProductDescription';
import ProductReview from '../components/ProductView/ProductReview';
import { useFetchProductByID } from '../hooks/products';
import { useParams } from 'react-router-dom';
const ProductViewPage: FC = (): JSX.Element => {
  const { productId } = useParams();
  const { product: productData, isLoading } = useFetchProductByID(
    productId as string
  );
  if (isLoading) {
    return <h1>Loading Product Details</h1>;
  }
  return (
    <>
      <section className='md:flex'>
        <ProductCarousel image_urls={productData!.photos as string[]} />
        <ProductInfo
          id={productData!.id}
          name={productData!.name}
          price={productData!.price}
          rating={productData!.rating}
          discount={productData!.discount}
          brand={productData!.brand}
          category={productData!.category}
          size={productData!.size}
          similar={productData!.ChildProduct}
          Deals={productData!.Deals}
          quantity={productData!.quantity as number}
        />
      </section>

      <ProductDescription
        description={productData!.description}
        benefits={productData!.benefits}
        details={productData!.details}
      />
      <ProductReview
        productid={productData!.id}
        reviews={productData!.Reviews}
      />
    </>
  );
};
export default ProductViewPage;
