import React, { useState, useEffect } from "react";
import ProductObj from "../../reuseable/ProductObj";
import useGetProductById from "../../jsHooks/products/useGetProductById";
import useEditProduct from "../../jsHooks/products/useEditProduct";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const { product: getProduct, error: getError } = useGetProductById(id);

  const { editProduct: update, error: updateError } = useEditProduct();

  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (getProduct) {
      setProductData((prevData) => ({
        ...prevData,
        name: getProduct.name,
        price: getProduct.price,
        alcoholPercentage: getProduct.alcoholPercentage,
        color: getProduct.color,
        description: getProduct.description,
        amount: getProduct.amount,
        type: getProduct.type,
        producer: getProduct.producer,
      }));
    }
  }, [getProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productData) {
      console.log(productData);
      await update(id, productData);
      navigate("/home");
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className=' text-center text-3xl font-bold leading-9 tracking-tight text-black'>
          Edit product
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <>
            <ProductObj
              product={productData}
              setProductData={setProductData}
            />
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 leading-6 text-black hover:bg-green-500 font-bold '
            >
              Edit
            </button>
          </>
        </form>
        {(getError || updateError) && (
          <div className='error text-red-400'>{getError || updateError}</div>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
