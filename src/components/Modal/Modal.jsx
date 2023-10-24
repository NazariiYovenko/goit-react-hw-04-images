import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWraper, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeydownCloseModal = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydownCloseModal);
    return () => {
      window.removeEventListener('keydown', handleKeydownCloseModal);
    };
  }, [onClose]);

  const handleOverlayCloseModal = e => {
    if (e.currentTarget !== e.target) {
      console.log('yay');
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayCloseModal}>
      <ModalWraper>{children}</ModalWraper>
    </Overlay>,
    modalRoot
  );
}

export default Modal;
