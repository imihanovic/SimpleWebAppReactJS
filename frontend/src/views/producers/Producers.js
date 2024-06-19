import React, { useEffect, useState } from "react";
import useGetProducers from "../../jsHooks/producers/useGetProducers";
import { Link } from "react-router-dom";
import { userRoles } from "../../enums/userRoles";
import { useAuthContext } from "../../jsHooks/useAuthContext";
import Modal from "../../reuseable/Modal";
import useDeleteProducer from "../../jsHooks/producers/useDeleteProducer";

const Producers = () => {
  const { user } = useAuthContext();

  const { producers: fetchedProducers, loading, error } = useGetProducers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [producerToDelete, setProducerToDelete] = useState(null);
  const [producers, setProducers] = useState([]);
  const { deleteProducer } = useDeleteProducer();
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setProducers(fetchedProducers);
  }, [fetchedProducers]);

  const handleDeleteClick = (producer) => {
    setIsModalOpen(true);
    setProducerToDelete(producer);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setProducerToDelete(null);
  };

  const handleModalConfirm = async () => {
    try {
      await deleteProducer(producerToDelete._id);
      setProducers(
        producers.filter((producer) => producer._id !== producerToDelete._id)
      );
      setIsModalOpen(false);
      setProducerToDelete(null);
    } catch (error) {
      console.log(error.message);
      setDeleteError(error.message);
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching producers: {error.message}</div>;
  }

  return (
    <div className='Producers'>
      <h1 className='text-5xl font-bold text-darkblue mx-auto mb-4'>Producers</h1>
      <div>
        {user.role === userRoles.Admin && (
          <div className='flex justify-between mb-4'>
            
            <div></div>
            <Link to={`/producers/add`}>
              <i className='text-green-800 text-xl font-bold hover:text-blue-700 mr-10'>
                 New producer
              </i>
            </Link>
          </div>
        )}
        <table class='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Country</th>
              {user.role === userRoles.Admin && (
                <>
                  <th scope='col'></th>
                  <th scope='col'></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {producers &&
              producers.map((producer) => (
                <tr
                  key={producer._id}
                  className='border-b transition duration-300 ease-in-out hover:bg-slate-100 dark:border-slate-200 dark:hover:bg-slate-100'
                >
                  <td className='whitespace-nowrap px-6 py-4'>
                    <Link
                      to={`/producer/${producer._id}`}
                      className='text-gray-800 hover:text-blue-700'
                    >
                      {producer.name}
                    </Link>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4'>
                    {producer.country}
                  </td>
                  {user.role === userRoles.Admin && (
                    <>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <Link to={`/producer/edit/${producer._id}`}>
                        <p className="text-yellow-700">Edit</p>
                        </Link>
                      </td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <button onClick={() => handleDeleteClick(producer)}>
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
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title='Confirm Delete'
        confirmText='Delete'
      >
        {deleteError
          ? deleteError
          : "Delete producer?"}
      </Modal>
    </div>
  );
};

export default Producers;
