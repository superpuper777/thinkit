import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return { showModal, handleShowModal, handleCloseModal, setShowModal };
};

export default useModal;
