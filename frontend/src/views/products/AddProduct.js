import React, { useState } from "react";
import ProductObj from "../../reuseable/ProductObj";
import useAddProduct from "../../jsHooks/products/useAddProduct";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { addProduct:create , error: createError } = useAddProduct();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    alcoholPercentage: "",
    color: "",
    description: "",
    amount: "",
    type: "",
    producer: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productData) {
      await create(productData);
      navigate("/home");
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className=' text-center text-3xl font-bold leading-9 tracking-tight text-black'>
          New product
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
              className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 leading-6 text-black hover:bg-green-500 font-bold'
            >
              Add
            </button>
          </>
        </form>
        {createError && <div className='error text-red-400'>{createError}</div>}
      </div>
    </div>
  );
};

export default AddProduct;
