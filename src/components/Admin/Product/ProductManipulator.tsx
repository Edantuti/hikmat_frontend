import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import ProductCarousel from "../../ProductView/ProductCarousel";
import ProductDescription from "../../ProductView/ProductDescription";
import ProductInfo from "../../ProductView/ProductInfo";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import Cookies from "js-cookie";
import { FaFile } from "react-icons/fa";

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
  const productid = useLoaderData() as any;
  const [productList, setProductList] = useState<any[]>([]);
  const [similarProductSize, setSimilarProductSize] = useState<any[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [photos, setPhotos] = useState<Array<File>>([]);
  const [similar, setSimilar] = useState<boolean>(false);
  const { control, watch, register, setValue, handleSubmit } =
    useForm<FormValues>({
      defaultValues: {},
      reValidateMode: "onBlur",
    });
  useEffect(() => {
    getProduct(productid).then((response) => {
      setProduct(response);
      setSimilar(response.ChildProduct.length !== 0)
      setValue("name", response.name);
      setValue("category", response.category);
      setValue("benefits", response.benefits);
      setValue("description", response.description);
      setValue("brand", response.brand);
      setValue("details", response.details);
      setValue("price", response.price);
      setValue("size", response.size);
      setValue("quantity", response.quantity);
      setValue("discount", response.discount);
      setPhotos(response.photos);
      setSimilarProductSize(response.ChildProduct);
    });
    getProductList().then((response) => {
      setProductList(response);
    });
  }, []);

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: "benefits",
  });
  const {
    fields: detailsFields,
    append: appendDetail,
    remove: removeDetail,
  } = useFieldArray({
    control,
    name: "details",
  });
  async function getProduct(id: string) {
    return (
      await axios.get(`${import.meta.env.VITE_BACKEND}/api/products/`, {
        params: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
    ).data.result.rows[0];
  }
  async function getProductList() {
    return (
      await axios.get(`${import.meta.env.VITE_BACKEND}/api/products/`, {
        params: {
          limit: 100000,
        },
      })
    ).data.result.rows;
  }
  const onSubmit = async (data: any) => {
    try {
      const formdata = new FormData();
      formdata.append("name", data.name);
      formdata.append("benefits", JSON.stringify(data.benefits));
      formdata.append("details", JSON.stringify(data.details));
      formdata.append("price", data.price);
      formdata.append("description", data.description);
      formdata.append("quantity", data.quantity);
      formdata.append("size", data.size);
      formdata.append("category", data.category);
      formdata.append("brand", data.brand);
      if (similar)
        formdata.append("similarProduct", data.similarProduct);
      formdata.append("discount", data.discount);
      for (const photo of photos) {
        if (photo instanceof File) {
          formdata.append(
            "photos",
            new Blob([await photo.arrayBuffer()], { type: photo.type }),
            photo.name,
          );
        } else formdata.append("photos", photo);
      }
      await axios.patch(`${import.meta.env.VITE_BACKEND}/api/products`, formdata, {
        params: {
          id: productid,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return toast.success("Changes has been made successfully.");
    } catch (error) {
      console.error(error);
      return toast.error("There is some error");
    }
  };

  const f = watch();

  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (photos.length && e.target.files)
      setPhotos([...photos, ...e.target.files]);
    else if (e.target.files) setPhotos([...e.target.files]);
    e.target.value = "";
  };

  return (
    <>
      <h1 className="text-center my-10 text-4xl">Product Manipulation</h1>
      {product && (
        <div className="2xl:flex">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:w-[500px] w-full gap-2 p-10 rounded 2xl:mx-10 mx-auto"
          >

            <h1 className="text-xl text-center">Editing section</h1>
            <p>Name:</p>
            <input
              type="text"
              className="inputField"
              placeholder=""
              {...register("name", { required: true })}
            />
            <p>Quantity:</p>
            <input
              type="number"
              className="inputField"
              placeholder="Product quantity"
              {...register("quantity", { valueAsNumber: true, required: true })}
            />

            <p>Category:</p>
            <input
              type="text"
              className="inputField"
              placeholder="Product Category"
              {...register("category", { required: true })}
            />
            <p>Brand:</p>
            <input
              type="text"
              className="inputField"
              placeholder="Product Brand"
              {...register("brand", { required: true })}
            />
            <p>Price:</p>
            <input
              type="number"
              className="inputField"
              placeholder="Product price"
              {...register("price", {
                required: true,
              })}
            />
            <p>Discount:</p>
            <input
              type="number"
              className="inputField"
              placeholder="Product discount"
              max={100}
              min={0}
              {...register("discount", {
                required: true,
                validate: {
                  validRange: (v) => v >= 0 && v <= 100,
                },
              })}
            />
            <p>Size:</p>
            <input
              type="text"
              className="inputField"
              placeholder="Product Size"
              {...register("size", {
                required: true,
              })}
            />
            <div className="flex gap-2">
              <input type="checkbox" onChange={() => setSimilar(!similar)} checked={similar} />
              <p>Products Similar to this?</p>
            </div>
            {similar &&
              <><p>Similar Products Linking:</p>
                <select
                  className="inputField bg-white"
                  {...register("similarProduct")}
                >
                  {productList.map(
                    (product: any) =>
                      product.id !== productid && (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ),
                  )}
                  )
                </select></>}
            <p>Product Photos:</p>
            <div className="rounded border relative h-32 flex items-center justify-center">
              <input
                type="file"
                className="absolute opacity-0 z-index-10 border rounded"
                accept="image/*"
                onChange={(e) => fileChange(e)}
                multiple
              />
              <FaFile />
              <p className=" my-26 text-lg">
                Drag or click here to upload the files
              </p>
            </div>

            <div className="space-y-5">
              {photos.map((photo, id: number) => (
                <div
                  key={id}
                  className="flex relative items-center border rounded"
                >
                  <img
                    src={
                      typeof photo !== "string"
                        ? URL.createObjectURL(photo)
                        : photo
                    }
                    alt="photos"
                  />
                  <button
                    type="button"
                    className="button h-10 absolute top-0"
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
              className="inputField"
              placeholder="Product Description"
              {...register("description", { required: true })}
            />

            <p>Product Benefits:</p>
            {benefitFields.length == 0 && (
              <p>No Benefits field is added yet!</p>
            )}
            {benefitFields.map((field, id) => {
              return (
                <div key={field.id} className="flex gap-5">
                  <input
                    placeholder="Benefits"
                    className="inputField sm:w-auto w-[80%]"
                    {...register(`benefits.${id}`)}
                  />
                  <button onClick={() => removeBenefit(id)} className="button">
                    <RxCross2 />
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => appendBenefit("something")}
              className="button"
            >
              Add Benefits Field
            </button>

            <p>Product details:</p>
            {detailsFields.length == 0 && <p>No Details field is added yet!</p>}
            {detailsFields.map((field, id) => {
              return (
                <div key={field.id} className="flex gap-5">
                  <input
                    placeholder="Benefits"
                    className="inputField sm:w-auto w-[80%]"
                    {...register(`details.${id}`)}
                  />
                  <button onClick={() => removeDetail(id)} className="button">
                    <RxCross2 />
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => appendDetail("something")}
              className="button"
            >
              Add Detail Field
            </button>

            <input className="button" type="submit" />
          </form>
          <div>
            <h1 className="text-center text-xl">Preview Section</h1>
            <section className="md:flex mt-10 mx-auto">
              <ProductCarousel
                image_urls={photos.map((photo) =>
                  typeof photo !== "string"
                    ? URL.createObjectURL(photo)
                    : photo,
                )}
              />
              <ProductInfo
                id={productid}
                name={f.name}
                price={f.price}
                rating={0}
                discount={f.discount}
                brand={f.brand}
                category={f.category}
                size={f.size}
                similar={similarProductSize}
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
      )}
    </>
  );
};

export default ProductManipulator;
