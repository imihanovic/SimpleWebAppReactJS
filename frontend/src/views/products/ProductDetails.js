import React from "react";
import { useParams } from "react-router-dom";
import useGetProductById from "../../jsHooks/products/useGetProductById";
import DetailsObj from "../../reuseable/Details";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { product, loading, error } = useGetProductById(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching product details: {error}</div>;
  }

  return (
    <div className='DetailsPage'>
      <h1 className='text-4xl font-bold text-darkblue mx-auto mb-4'>Product Details</h1>
      {product && <DetailsObj data={product} />}
    </div>
  );
};

export default ProductDetailsPage;
