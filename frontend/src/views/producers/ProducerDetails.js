import React from "react";
import { useParams } from "react-router-dom";
import useGetProducerById from "../../jsHooks/producers/useGetProducerById";
import DetailsObj from "../../reuseable/Details";

const ProducerDetailsPage = () => {
  const { id } = useParams();
  const { producer, loading, error } = useGetProducerById(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching producer details: {error}</div>;
  }

  return (
    <div className='DetailsPage'>
      <h1 className='text-4xl font-bold text-darkblue mx-auto mb-4'>Producer Details</h1>
      {producer && <DetailsObj data={producer} />}
    </div>
  );
};

export default ProducerDetailsPage;
