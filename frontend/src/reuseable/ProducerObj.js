import React, { useState, useEffect } from "react";

const ProducerObj = ({ producer, setProducerData }) => {
  const [name, setName] = useState("");
  const [founded, setFounded] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (producer) {
      setName(producer.name || "");
      setFounded(producer.founded || "");
      setAddress(producer.address || "");
      setCountry(producer.country || "");
      setDescription(producer.description || "");
    }
  }, [producer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducerData((prevData) => ({
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
            htmlFor='founded'
            className='block text-sm font-medium leading-6 text-black'
          >
            <b>Founded</b>
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='founded'
            name='founded'
            type='number'
            required
            className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            value={founded}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className='flex items-center justify-between'>
          <label
            htmlFor='address'
            className='block text-sm font-medium leading-6 text-black'
          >
            <b>Address</b>
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='address'
            name='address'
            type='text'
            required
            className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            value={address}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className='flex items-center justify-between'>
          <label
            htmlFor='country'
            className='block text-sm font-medium leading-6 text-black'
          >
            <b>Country</b>
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='country'
            name='country'
            type='text'
            required
            className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
            value={country}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="">
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
    </div>
  );
};

export default ProducerObj;
