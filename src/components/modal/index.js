import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


const ModalModule = (modalIsOpenInitialValue) => {
    const [modalIsOpen, setIsOpen] = useState(modalIsOpenInitialValue);
    console.log("modalIsOpenInitialValue", modalIsOpenInitialValue);

  function closeModalButton() {
    setIsOpen(false);
  }

  const closeModal = () => {
    setIsOpen(false)
}


  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModalButton}>close</button>
        <form>
          <input />
          <button>tab navigation</button>
        </form>
      </Modal>
    </div>
  )

}

export default ModalModule;