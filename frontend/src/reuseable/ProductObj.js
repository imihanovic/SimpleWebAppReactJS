import React, { useState, useEffect } from "react";
import useGetProducers from "../jsHooks/producers/useGetProducers";

const ProductObj = ({ product, setProductData }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [alcoholPercentage, setAlcoholPercentage] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [producer, setProducer] = useState(product?.producer || "");

  const { producers } = useGetProducers();

  useEffect(() => {
    if (product && producers) {
      setName(product.name || "");
      setPrice(product.price || "");
      setAlcoholPercentage(product.alcoholPercentage || "");
      setColor(product.color || "");
      setDescription(product.description || "");
      setAmount(product.amount || "");
      setType(product.type || "");

      const producerId =
        producers.find((p) => p._id === product.producer?._id)?._id || "";
      setProducer(producerId);
    }
  }, [product, producers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={`rounded-lg p-6 shadow-sm`}>
      <div className = "mb-3">
        <div className='flex items-center justify-between'>
          <label
            htmlFor='name'
            className='block text-sm font-medium leading-6 text-black'
          >
            <b>Name</b>
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='name'
            name='name'
            type='text'
            required
            className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            value={name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className='flex items-center justify-between'>
          <label
            htmlFor='price'
            className='block text-sm font-medium leading-6 text-black'
          >
            <b>Price</b>
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='price'
            name='price'
            type='number'
            step='0.01'
            required
            className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            value={price}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className='flex items-center justify-between'>
          <label
            htmlFor='alcoholPercentage'
            className='block text-sm font-medium leading-6 text-black'
          >
            <b>Alcohol Percentage</b>
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='alcoholPercentage'
            name='alcoholPercentage'
            type='text'
            required
            className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            value={alcoholPercentage}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className='flex items-center justify-between'>
          <label
            htmlFor='color'
            className='block text-sm font-medium leading-6 text-black'
          >
            <b>Color</b>
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='color'
            name='color'
            type='text'
            required
            className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            value={color}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className='flex items-center justify-between'>
          <label
            htmlFor='description'
            className='block text-sm font-medium leading-6 text-black'
          >
            <b>Description</b>
          </label>
        </div>
        <div className='mt-2'>
          <textarea
            id='description'
            name='description'
            required
            className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            value={description}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <div className='flex items-center justify-between'>
          <label
            htmlFor='amount'
            className='block text-sm font-medium leading-6 text-black'
          >
            <b>Amount</b>
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='amount'
            name='amount'
            type='text'
            required
            className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            value={amount}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <div className='flex items-center justify-between'>
          <label
            htmlFor='type'
            className='block text-sm font-medium leading-6 text-black'
          >
            <b>Type</b>
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='type'
            name='type'
            type='text'
            required
            className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            value={type}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <div>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='type'
            className='block text-sm font-medium leading-6 text-black'
          >
            <b>Producer</b>
          </label>
        </div>
          <div className='mt-2'>
            <select
              id='producer'
              name='producer'
              required
              className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
              value={producer._id}
              onChange={handleInputChange}
            >
              <option value="">Select Producer</option>
              {producers.map((producer) => (
                  <option key={producer._id} value={producer._id}>
                  {producer.name}
                </option>
              )
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductObj;
