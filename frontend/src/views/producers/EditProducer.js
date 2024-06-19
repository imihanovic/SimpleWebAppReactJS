import React, { useState, useEffect } from "react";
import ProducerObj from "../../reuseable/ProducerObj";
import useGetProducerById from "../../jsHooks/producers/useGetProducerById";
import useEditProducer from "../../jsHooks/producers/useEditProducer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditProducer = () => {
  const { id } = useParams();
  const { producer: getProducer, error: getError } = useGetProducerById(id);

  const { editProducer: update, error: updateError } = useEditProducer();

  const [producerData, setProducerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (getProducer) {
      setProducerData((prevData) => ({
        ...prevData,
        name: getProducer.name,
        founded: getProducer.founded,
        address: getProducer.address,
        country: getProducer.country,
        description: getProducer.description,
      }));
    }
  }, [getProducer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (producerData) {
      await update(id, producerData);
      navigate("/producers");
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className=' text-center text-3xl font-bold leading-9 tracking-tight text-black'>
          Edit producer
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

export default EditProducer;
