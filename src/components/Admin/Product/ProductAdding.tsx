import { ChangeEvent, FC, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import ProductCarousel from '../../ProductView/ProductCarousel';
import ProductDescription from '../../ProductView/ProductDescription';
import ProductInfo from '../../ProductView/ProductInfo';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

type FormValues = {
  name: string;
  quantity: number;
  category: string;
  brand: string;
  price: number;
  discount: number;
  description: string;
  benefits: any;
  details: any;
  size: string;
};

const ProductAdding: FC = (): JSX.Element => {
  const [photos, setPhotos] = useState<File[]>([]);
  const { control, watch, register, handleSubmit } = useForm<FormValues>({
    defaultValues: { benefits: [], details: [], price: 0, discount: 0 },
    reValidateMode: 'onBlur',
  });

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
    const id = toast.loading('Adding...');
    try {
      const formdata = new FormData();
      formdata.append('name', data.name);
      formdata.append('benefits', JSON.stringify(data.benefits));
      formdata.append('details', JSON.stringify(data.details));
      formdata.append('price', data.price);
      formdata.append('description', data.description);
      formdata.append('quantity', data.quantity);
      formdata.append('category', data.category);
      formdata.append('brand', data.brand);
      formdata.append('size', data.size);
      formdata.append('discount', data.discount);
      for (let photo of photos) {
        formdata.append(
          'photos',
          new Blob([await photo.arrayBuffer()], { type: photo.type })
        );
      }
      axios
        .post(`${import.meta.env.VITE_BACKEND}/api/products`, formdata, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        })
        .then(() => {
          return toast.update(id, {
            render: 'Changes has been made successfully.',
            type: 'success',
            isLoading: false,
          });
        })
        .catch((error) => {
          console.error(error);
          return toast.update(id, {
            render: 'There is some error',
            type: 'error',
            isLoading: false,
          });
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
      setPhotos([...photos, ...e.target.files]);
    else if (e.target.files) setPhotos([...e.target.files]);
    e.target.value = '';
  };
  return (
    <>
      <h1 className='my-10 text-center text-4xl'>Product Adding section</h1>
      <div className='2xl:flex'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto flex w-full flex-col gap-2 rounded p-10 sm:w-[500px] 2xl:mx-10'
        >
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
              valueAsNumber: true,
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
              valueAsNumber: true,
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
          <p>Product Photos:</p>
          <div className='relative flex h-32 items-center justify-center bg-green-100'>
            <input
              type='file'
              className='z-index-10 absolute opacity-0'
              accept='image/*'
              onChange={(e) => fileChange(e)}
              multiple
            />
            <p className=' my-26 text-lg'>
              Drag or click here to upload the files
            </p>
          </div>
          <div className='space-y-5'>
            {photos.map((photo, id: number) => (
              <div key={id} className='relative flex items-center'>
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
                    setPhotos([
                      ...photos.slice(0, id),
                      ...photos.slice(id + 1),
                    ]);
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
          {benefitFields.length == 0 && <p>No Benefits field is added yet!</p>}
          {benefitFields.map((field, id) => {
            return (
              <div key={field.id} className='gap-5 sm:flex'>
                <input
                  placeholder='Benefits'
                  className='inputField'
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
              <div key={field.id} className='gap-5 sm:flex'>
                <input
                  placeholder='Benefits'
                  className='inputField'
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
              id={''}
              name={f.name}
              price={f.price}
              quantity={10}
              rating={0}
              discount={f.discount}
              brand={f.brand}
              category={f.category}
              size={f.size}
              similar={[]}
              Deals={[]}
            />
          </section>
          <ProductDescription
            description={f.description}
            benefits={f.benefits}
            details={f.details}
          />
          {/* <ProductSimilar category={category}/> */}
        </div>
      </div>
    </>
  );
};

export default ProductAdding;
