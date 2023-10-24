import Modal from 'components/Modal/Modal';
import {
  ImageGalleryItemImage,
  ImageGalleryItemWrapper,
} from './ImageGalleryItem.styled';
import { useState } from 'react';

const ImageGalleryItem = ({ id, largeImageURL, webformatURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(prev => !prev);

  return (
    <ImageGalleryItemWrapper onClick={toggleModal}>
      <ImageGalleryItemImage id={id} src={webformatURL} alt={tags} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </ImageGalleryItemWrapper>
  );
};

export default ImageGalleryItem;
