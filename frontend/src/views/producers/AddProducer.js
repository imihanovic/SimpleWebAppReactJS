import React, { useState } from "react";
import ProducerObj from "../../reuseable/ProducerObj";
import useAddProducer from "../../jsHooks/producers/useAddProducer";
import { useNavigate } from "react-router-dom";

const AddProducer = () => {
  const { addProducer: create, error: createError } = useAddProducer();

  const [producerData, setProducerData] = useState({
    name: "",
    founded: "",
    address: "",
    country: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (producerData) {
      await create(producerData);
      navigate("/producers");
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className=' text-center text-2xl font-bold leading-9 tracking-tight text-black'>
          New producer
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <>
            <ProducerObj
              producer={producerData}
              setProducerData={setProducerData}
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

export default AddProducer;
