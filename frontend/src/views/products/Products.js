import React, { useContext, useEffect, useState } from "react";
import useGetProducts from "../../jsHooks/products/useGetProducts";
import { Link } from "react-router-dom";
import { userRoles } from "../../enums/userRoles";
import { useAuthContext } from "../../jsHooks/useAuthContext";
import useDeleteProduct from "../../jsHooks/products/useDeleteProduct";
import Modal from "../../reuseable/Modal";
import { CartContext } from "../../context/CartContext";

const Products = () => {
  const { user } = useAuthContext();

  const { products: fetchedProducts, loading, error } = useGetProducts();
  const { deleteProduct } = useDeleteProduct();
  const [products, setProducts] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const { addToCart } = useContext(CartContext);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [productToAdd, setProductToAdd] = useState(null);

  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  const handleAddToCartClick = (product) => {
    setIsAddToCartModalOpen(true);
    setProductToAdd(product);
  };

  const handleDeleteClick = (product) => {
    setIsDeleteModalOpen(true);
    setProductToDelete(product);
  };

  const handleModalClose = () => {
    setIsAddToCartModalOpen(false);
    setIsDeleteModalOpen(false);
    setProductToAdd(null);
    setProductToDelete(null);
  };

  const handleAddToCartConfirm = () => {
    addToCart(productToAdd);
    setIsAddToCartModalOpen(false);
    setProductToAdd(null);
  };

  const handleDeleteConfirm = async () => {
    await deleteProduct(productToDelete._id);
    setProducts(
      products.filter((product) => product._id !== productToDelete._id)
    );

    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  return (
    <div className='Products'>
      <h1 className='text-5xl font-bold text-black mx-auto mb-4'>Products</h1>
      {user.role === userRoles.Admin && (
        <div className='flex justify-between mb-4'>
          <div></div>
          <Link to={`/products/add`}>
            <i className='text-green-800 text-xl font-bold hover:text-blue-700 mr-10'>
              New product
            </i>
          </Link>
        </div>
      )}
      <div>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Price</th>
              <th scope='col'>Alcohol percentage</th>
              <th scope='col'>Producer</th>
              <th scope='col'></th>
              {user.role === userRoles.Admin && (
                <>
                  <th scope='col'></th>
                  <th scope='col'></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr
                  key={product._id}
                  className='border-b transition duration-300 ease-in-out hover:bg-slate-100 dark:border-slate-200 dark:hover:bg-slate-100'
                >
                  <td className='whitespace-nowrap px-6 py-4'>
                    <Link
                      to={`/product/${product._id}`}
                      className='text-black-800 hover:text-red-700'
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4'>
                    {product.price} €
                  </td>
                  <td className='whitespace-nowrap px-6 py-4'>
                    {product.alcoholPercentage}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4'>
                    <Link
                      to={`/producer/${product.producer._id}`}
                      className='text-gray-800 hover:text-red-700'
                    >
                      {product.producer.name}
                    </Link>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4'>
                    <button onClick={() => handleAddToCartClick(product)}>
                    <p className="text-green-700">Add to cart</p>
                    </button>
                  </td>
                  {user.role === userRoles.Admin && (
                    <>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <Link to={`/products/edit/${product._id}`}>
                        <p className="text-yellow-700">Edit</p>
                        </Link>
                      </td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <button onClick={() => handleDeleteClick(product)}>
                        <p className="text-red-700">Delete</p>
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isAddToCartModalOpen}
        onClose={handleModalClose}
        onConfirm={handleAddToCartConfirm}
        title='Confirm Add to Cart'
        confirmText='Add'
      >
        Add item to the cart?
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        title='Confirm Delete'
        confirmText='Delete'
      >
        Delete selected item?
      </Modal>
    </div>
  );
};

export default Products;
