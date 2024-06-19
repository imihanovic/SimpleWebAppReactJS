import React from "react";

const DetailsObj = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className={`rounded-lg p-6 shadow-sm ${data._id}`}>
      <div className={"flex justify-center"}>
        {data.url && (
          <div className='overflow-hidden rounded-lg'>
            <img
              className='w-full h-auto max-w-xs cursor-pointer transition duration-200 ease-in-out transform hover:scale-110 rounded-lg'
              src={data.url}
              alt={"thumbnailAlt"}
            />
          </div>
        )}
        <div className='text-center'>
          <h1 className='text-lg font-bold mt-2'><b>Name: </b> {data.name}</h1>
          {data.price && (
            <p className='font-normal text-lg mt-2'> <b>Price </b>: {data.price}€</p>
          )}
          {data.alcoholPercentage && (
            <p className='font-normal text-lg mt-2'>
              <b>Alcohol Percentage:</b> {data.alcoholPercentage}
            </p>
          )}
          {data.color && (
            <p className='font-normal text-lg mt-2'><b>Color:</b> {data.color}</p>
          )}
          {data.amount && (
            <p className='font-normal text-lg mt-2'> <b>Amount: </b> {data.amount}</p>
          )}
          {data.type && (
            <p className='font-normal text-lg mt-2'><b>Type:</b> {data.type}</p>
          )}
          {data.founded && (
            <p className='font-normal text-lg mt-2'> <b>Founded: </b> {data.founded}</p>
          )}
          {data.address && (
            <p className='font-normal text-lg mt-2'><b>Address: </b> {data.address}</p>
          )}
          {data.country && (
            <p className='font-normal text-lg mt-2'><b>Country: </b> {data.country}</p>
          )}
          {data.description && (
            <p className='font-normal text-lg mt-2'>{data.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsObj;
