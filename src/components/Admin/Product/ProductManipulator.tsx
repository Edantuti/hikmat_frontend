import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import ProductCarousel from '../../ProductView/ProductCarousel';
import ProductDescription from '../../ProductView/ProductDescription';
import ProductInfo from '../../ProductView/ProductInfo';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaFile } from 'react-icons/fa';
import { useFetchProductByID, useFetchProducts } from '../../../hooks/products';

type FormValues = {
  name: string;
  quantity: number;
  category: string;
  brand: string;
  price: number;
  size: string;
  discount: number;
  description: string;
  benefits: any;
  similarProduct: any;
  details: any;
};

const ProductManipulator: FC = (): JSX.Element => {
  const { productid } = useParams();
  const { products: productList } = useFetchProducts({ limit: 0 });
  const [similarProductSize, setSimilarProductSize] = useState<any[]>([]);
  const { product } = useFetchProductByID(productid as string);
  const [photos, setPhotos] = useState<(File | string)[]>([]);

  const [similar, setSimilar] = useState<boolean>(false);
  const { control, watch, register, setValue, handleSubmit } =
    useForm<FormValues>({
      defaultValues: {},
      reValidateMode: 'onBlur',
    });
  useEffect(() => {
    if (product) {
      setSimilar(product.ChildProduct.length !== 0);
      setValue('name', product.name);
      setValue('category', product.category);
      setValue('benefits', product.benefits);
      setValue('description', product.description);
      setValue('brand', product.brand);
      setValue('details', product.details);
      setValue('price', product.price);
      setValue('size', product.size);
      if (product.quantity) setValue('quantity', product.quantity);
      setValue('discount', product.discount);
      if (product.photos) setPhotos(product.photos);
      setSimilarProductSize(product.ChildProduct);
    }
  }, [product]);

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: 'benefits',
  });
  const {
    fields: detailsFields,
    append: appendDetail,
    remove: removeDetail,
  } = useFieldArray({
    control,
    name: 'details',
  });
  const onSubmit = async (data: any) => {
    const id = toast.loading('Updating');
    try {
      const formdata = new FormData();
      formdata.append('name', data.name);
      formdata.append('benefits', JSON.stringify(data.benefits));
      formdata.append('details', JSON.stringify(data.details));
      formdata.append('price', data.price);
      formdata.append('description', data.description);
      formdata.append('quantity', data.quantity);
      formdata.append('size', data.size);
      formdata.append('category', data.category);
      formdata.append('brand', data.brand);
      if (similar) formdata.append('similarProduct', data.similarProduct);
      formdata.append('discount', data.discount);
      for (const photo of photos) {
        if (photo instanceof File) {
          formdata.append(
            'photos',
            new Blob([await photo.arrayBuffer()], { type: photo.type }),
            photo.name
          );
        } else formdata.append('photos', photo);
      }
      await axios.patch(
        `${import.meta.env.VITE_BACKEND}/api/products`,
        formdata,
        {
          params: {
            id: productid,
          },
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      toast.update(id, {
        render: 'Changes has been made successfully.',
        type: 'success',
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      return toast.update(id, {
        render: 'There is some error',
        type: 'error',
        isLoading: false,
      });
    }
  };

  const f = watch();

  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (photos.length && e.target.files)
      setPhotos(photos.concat([...e.target.files]));
    else if (e.target.files) setPhotos([...e.target.files]);
    e.target.value = '';
  };

  return (
    <>
      <h1 className='my-10 text-center text-4xl'>Product Manipulation</h1>
      {product && (
        <div className='2xl:flex'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mx-auto flex w-full flex-col gap-2 rounded p-10 sm:w-[500px] 2xl:mx-10'
          >
            <h1 className='text-center text-xl'>Editing section</h1>
            <p>Name:</p>
            <input
              type='text'
              className='inputField'
              placeholder=''
              {...register('name', { required: true })}
            />
            <p>Quantity:</p>
            <input
              type='number'
              className='inputField'
              placeholder='Product quantity'
              {...register('quantity', { valueAsNumber: true, required: true })}
            />

            <p>Category:</p>
            <input
              type='text'
              className='inputField'
              placeholder='Product Category'
              {...register('category', { required: true })}
            />
            <p>Brand:</p>
            <input
              type='text'
              className='inputField'
              placeholder='Product Brand'
              {...register('brand', { required: true })}
            />
            <p>Price:</p>
            <input
              type='number'
              className='inputField'
              placeholder='Product price'
              {...register('price', {
                required: true,
              })}
            />
            <p>Discount:</p>
            <input
              type='number'
              className='inputField'
              placeholder='Product discount'
              max={100}
              min={0}
              {...register('discount', {
                required: true,
                validate: {
                  validRange: (v) => v >= 0 && v <= 100,
                },
              })}
            />
            <p>Size:</p>
            <input
              type='text'
              className='inputField'
              placeholder='Product Size'
              {...register('size', {
                required: true,
              })}
            />
            <div className='flex gap-2'>
              <input
                type='checkbox'
                onChange={() => setSimilar(!similar)}
                checked={similar}
              />
              <p>Products Similar to this?</p>
            </div>
            {similar && (
              <>
                <p>Similar Products Linking:</p>
                <select
                  className='inputField bg-white'
                  {...register('similarProduct')}
                >
                  {productList &&
                    productList.rows.map(
                      (product: any) =>
                        product.id !== productid && (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        )
                    )}
                  )
                </select>
              </>
            )}
            <p>Product Photos:</p>
            <div className='relative flex h-32 items-center justify-center rounded border'>
              <input
                type='file'
                className='z-index-10 absolute rounded border opacity-0'
                accept='image/*'
                onChange={(e) => fileChange(e)}
                multiple
              />
              <FaFile />
              <p className=' my-26 text-lg'>
                Drag or click here to upload the files
              </p>
            </div>

            <div className='space-y-5'>
              {photos.map((photo, id: number) => (
                <div
                  key={photo.toString()}
                  className='relative flex items-center rounded border'
                >
                  <img
                    src={
                      typeof photo !== 'string'
                        ? URL.createObjectURL(photo)
                        : photo
                    }
                    alt='photos'
                  />
                  <button
                    type='button'
                    className='button absolute top-0 h-10'
                    onClick={() => {
                      setPhotos(
                        photos.filter((_: any, index: number) => index !== id)
                      );
                    }}
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>
            <p>Product Description:</p>
            <textarea
              className='inputField'
              placeholder='Product Description'
              {...register('description', { required: true })}
            />

            <p>Product Benefits:</p>
            {benefitFields.length == 0 && (
              <p>No Benefits field is added yet!</p>
            )}
            {benefitFields.map((field, id) => {
              return (
                <div key={field.id} className='flex gap-5'>
                  <input
                    placeholder='Benefits'
                    className='inputField w-[80%] sm:w-auto'
                    {...register(`benefits.${id}`)}
                  />
                  <button onClick={() => removeBenefit(id)} className='button'>
                    <RxCross2 />
                  </button>
                </div>
              );
            })}
            <button
              type='button'
              onClick={() => appendBenefit('something')}
              className='button'
            >
              Add Benefits Field
            </button>

            <p>Product details:</p>
            {detailsFields.length == 0 && <p>No Details field is added yet!</p>}
            {detailsFields.map((field, id) => {
              return (
                <div key={field.id} className='flex gap-5'>
                  <input
                    placeholder='Benefits'
                    className='inputField w-[80%] sm:w-auto'
                    {...register(`details.${id}`)}
                  />
                  <button onClick={() => removeDetail(id)} className='button'>
                    <RxCross2 />
                  </button>
                </div>
              );
            })}
            <button
              type='button'
              onClick={() => appendDetail('something')}
              className='button'
            >
              Add Detail Field
            </button>

            <input className='button' type='submit' />
          </form>
          <div>
            <h1 className='text-center text-xl'>Preview Section</h1>
            <section className='mx-auto mt-10 md:flex'>
              <ProductCarousel
                image_urls={photos.map((photo) =>
                  typeof photo !== 'string' ? URL.createObjectURL(photo) : photo
                )}
              />
              <ProductInfo
                id={productid as string}
                name={f.name}
                price={f.price}
                rating={0}
                discount={f.discount}
                brand={f.brand}
                category={f.category}
                size={f.size}
                similar={similarProductSize}
                quantity={1000}
                Deals={[]}
              />
            </section>
            <ProductDescription
              description={f.description}
              benefits={f.benefits}
              details={f.details}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductManipulator;
