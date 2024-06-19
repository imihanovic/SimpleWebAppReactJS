import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Modal from "../reuseable/Modal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  const handleRemoveClick = (product) => {
    setIsRemoveModalOpen(true);
    setProductToRemove(product);
  };

  const handleModalClose = () => {
    setIsRemoveModalOpen(false);
    setProductToRemove(null);
  };

  const handleModalConfirm = () => {
    removeFromCart(productToRemove);
    setIsRemoveModalOpen(false);
    setProductToRemove(null);
    window.location.reload();
  };

  return (
    <div className='Cart'>
      <h1 className='text-4xl font-bold mx-auto mb-4'>Cart</h1>
      <Modal
        isOpen={isRemoveModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title='Confirm remove from Cart'
        confirmText='Remove'
      >
        Remove item from the cart?
      </Modal>
      <div>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Price</th>
              <th scope='col'>Producer</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((product) => (
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
                    <Link
                      to={`/producer/${product.producer._id}`}
                      className='text-gray-800 hover:text-red-700'
                    >
                      {product.producer.name}
                    </Link>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4'>
                    <button onClick={() => handleRemoveClick(product)}>
                    <p className="text-red-700">Remove from cart</p>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
